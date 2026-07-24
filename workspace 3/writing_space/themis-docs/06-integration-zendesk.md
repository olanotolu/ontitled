# 06 - Integration Guide — Zendesk

## Connecting Themis to Your Zendesk Instance

This guide walks through integrating Themis with Zendesk for support ticket verification.

---

## Prerequisites

### Zendesk Requirements

- **Plan:** Team, Growth, or Enterprise
- **Admin access:** Required for webhook configuration
- **API access:** Enabled in Admin Center

### Themis Requirements

- **Active Themis account**
- **API key:** With `contracts:read` and `outcomes:write` permissions
- **UPX contract:** For UPX-CX-RES-* tickets

### System Requirements

- **Zendesk URL:** `https://{your-domain}.zendesk.com`
- **Webhook endpoint:** `https://api.ontitled.ai/v1/webhooks/zendesk`
- **Authentication:** OAuth or API token

---

## Integration Overview

### Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Zendesk    │────>│    Dike      │────>│   Themis     │
│   Tickets    │     │ Verification │     │  Settlement  │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │ 1. Ticket created  │                    │
       │────────────────────>│                    │
       │                    │                    │
       │ 2. Agent resolves  │                    │
       │────────────────────>│                    │
       │                    │                    │
       │ 3. Dike polls      │                    │
       │<─────────────────────│                    │
       │                    │                    │
       │ 4. 72h verification│                    │
       │<─────────────────────│                    │
       │                    │                    │
       │                    │ 5. Submit result   │
       │                    │────────────────────>│
       │                    │                    │
       │                    │                    │ 6. Clear payment
```

### What Gets Verified

| Zendesk Field | Verification Check | Frequency |
|---------------|-------------------|-----------|
| `status` | Equals "solved" | Every poll |
| `updated_at` | Timestamp tracking | Every poll |
| `comments` | Customer reopen detection | Every poll |
| `assignee_id` | Human intervention check | Every poll |
| `tags` | Resolution type validation | Once |

---

## Step 1: OAuth Setup

### Create OAuth Client in Zendesk

1. **Navigate to Admin Center**
   ```
   https://{your-domain}.zendesk.com/admin/apps-integrations/apis/zendesk-api/settings
   ```

2. **Create OAuth Client**
   ```
   Client Name: Themis Integration
   Description: AI outcome verification from Ontitled
   Company: Ontitled, Inc.
   Redirect URL: https://auth.ontitled.ai/callback/zendesk
   ```

3. **Save Credentials**
   ```
   Unique Identifier: themis_verification_abc123
   Client Secret: [REDACTED - copy immediately]
   ```

### Authorize Themis

1. **Initiate OAuth Flow**
   ```
   https://{your-domain}.zendesk.com/oauth/authorizations/new
   ?client_id=themis_verification_abc123
   &response_type=code
   &redirect_uri=https://auth.ontitled.ai/callback/zendesk
   &scope=read+tickets+read+ticket_audits
   ```

2. **Grant Permissions**
   - ✅ Read tickets
   - ✅ Read ticket audits
   - ✅ Read ticket comments

3. **Receive Authorization Code**
   ```
   https://auth.ontitled.ai/callback/zendesk
   ?code=auth_code_xyz789
   &state=csrf_token_abc
   ```

4. **Themis Exchanges for Token**
   ```bash
   curl -X POST https://auth.ontitled.ai/oauth/zendesk/token \
     -d "client_id=themis_verification_abc123" \
     -d "client_secret={client_secret}" \
     -d "code=auth_code_xyz789" \
     -d "redirect_uri=https://auth.ontitled.ai/callback/zendesk"
   ```

**Response:**
```json
{
  "access_token": "zendesk_token_abc123",
  "token_type": "Bearer",
  "expires_in": null
}
```

---

## Step 2: Webhook Configuration

### Create Webhook in Zendesk

1. **Navigate to Webhooks**
   ```
   https://{your-domain}.zendesk.com/admin/apps-integrations/webhooks/webhooks
   ```

2. **Create Webhook**
   ```
   Name: Themis Dike Integration
   Endpoint URL: https://api.ontitled.ai/v1/webhooks/zendesk
   Request method: POST
   Request format: JSON
   Authentication: Bearer token
   ```

3. **Add Bearer Token**
   ```
   Token: themis_webhook_secret_xyz789
   ```

### Configure Triggers

**Trigger 1: Ticket Created**
```json
{
  "trigger": {
    "title": "Themis - Ticket Created",
    "conditions": {
      "all": [
        {"field": "status", "operator": "is", "value": "new"}
      ]
    },
    "actions": [
      {
        "field": "notification_webhook",
        "value": ["themis_dike_integration", "ticket.created"]
      }
    ]
  }
}
```

**Trigger 2: Ticket Solved**
```json
{
  "trigger": {
    "title": "Themis - Ticket Solved",
    "conditions": {
      "all": [
        {"field": "status", "operator": "changed_to", "value": "solved"},
        {"field": "tags", "operator": "includes", "value": "ai_resolved"}
      ]
    },
    "actions": [
      {
        "field": "notification_webhook",
        "value": ["themis_dike_integration", "ticket.solved"]
      }
    ]
  }
}
```

**Trigger 3: Ticket Reopened**
```json
{
  "trigger": {
    "title": "Themis - Ticket Reopened",
    "conditions": {
      "all": [
        {"field": "status", "operator": "changed_from", "value": "solved"},
        {"field": "status", "operator": "is_not", "value": "closed"}
      ]
    },
    "actions": [
      {
        "field": "notification_webhook",
        "value": ["themis_dike_integration", "ticket.reopened"]
      }
    ]
  }
}
```

### Webhook Payload Format

**Ticket Solved Event:**
```json
{
  "event": "ticket.solved",
  "timestamp": "2026-07-24T14:32:00Z",
  "ticket": {
    "id": 18432,
    "url": "https://{domain}.zendesk.com/api/v2/tickets/18432.json",
    "subject": "How do I reset my password?",
    "status": "solved",
    "priority": "normal",
    "type": "incident",
    "assignee_id": 20978321,
    "requester_id": 20978322,
    "tags": ["ai_resolved", "password_reset"],
    "created_at": "2026-07-24T14:00:00Z",
    "updated_at": "2026-07-24T14:32:00Z",
    "solved_at": "2026-07-24T14:32:00Z"
  },
  "current_user": {
    "id": 20978321,
    "name": "AI Agent (Sierra)",
    "email": "agent@sierra.ai"
  }
}
```

---

## Step 3: Dike Connector Installation

### Connector Options

| Option | Setup Time | Features | Best For |
|--------|-----------|----------|----------|
| **Cloud** | 5 minutes | Webhooks only | Simple setups |
| **Zendesk App** | 15 minutes | Full integration | Most users |
| **Custom** | 2 hours | Full control | Enterprise |

### Option A: Cloud Connector (Simplest)

1. **Configure in Themis Dashboard**
   ```
   Integrations → Zendesk → Connect
   ```

2. **Enter Credentials**
   ```
   Zendesk Domain: {your-domain}
   OAuth Token: {from Step 1}
   Webhook Secret: {from Step 2}
   ```

3. **Test Connection**
   ```
   [Test Connection] → ✅ Connected
   ```

### Option B: Zendesk App (Recommended)

1. **Install from Marketplace**
   ```
   Admin Center → Apps → Marketplace
   Search: "Themis Dike"
   Install: "Themis Verification"
   ```

2. **Configure App**
   ```
   Themis API Key: ont_live_...
   Default UPX Contract: ctr_7f8a9b2c3d4e
   Verification Tags: ["ai_resolved"]
   ```

3. **Set Permissions**
   ```
   ✓ Read tickets
   ✓ Read audits
   ✓ Add tags (optional)
   ```

4. **Enable for Agents**
   ```
   Role permissions: Agent, Admin
   Group restrictions: None
   ```

### Option C: Custom Integration

**For enterprise setups with specific requirements.**

**Prerequisites:**
- Zendesk API access
- Webhook endpoint (your server)
- Themis API credentials

**Implementation:**
```python
# Example custom connector
from flask import Flask, request
import requests

app = Flask(__name__)

THEMIS_API_KEY = "ont_live_..."
ZENDESK_TOKEN = "..."

@app.route('/webhook/zendesk', methods=['POST'])
def handle_zendesk_webhook():
    event = request.json

    if event['event'] == 'ticket.solved':
        ticket_id = event['ticket']['id']

        # Submit to Themis for verification
        response = requests.post(
            'https://api.ontitled.ai/v1/outcomes',
            headers={'Authorization': f'Bearer {THEMIS_API_KEY}'},
            json={
                'contract_id': 'ctr_7f8a9b2c3d4e',
                'ticket_id': f'ZD-{ticket_id}',
                'resolution_type': 'self_service'
            }
        )

        return {'status': 'submitted'}, 200

    return {'status': 'ignored'}, 200
```

---

## Step 4: Testing the Integration

### Test 1: Connection Test

**Verify Dike can read Zendesk:**

```bash
curl https://api.ontitled.ai/v1/integrations/zendesk/test \
  -H "Authorization: Bearer ont_live_..." \
  -d '{"domain": "{your-domain}"}'
```

**Expected Response:**
```json
{
  "status": "connected",
  "zendesk_version": "2026.07",
  "ticket_access": true,
  "webhook_configured": true
}
```

### Test 2: Create Test Ticket

1. **Create ticket in Zendesk**
   ```
   Subject: Test Ticket for Themis Integration
   Description: This is a test.
   ```

2. **Verify Themis received notification**
   ```
   Themis Dashboard → Integrations → Zendesk → Logs
   ```

3. **Check for event**
   ```
   ✅ ticket.created received at 2026-07-24T14:00:00Z
   ```

### Test 3: Resolve Test Ticket

1. **Mark ticket as solved**
   ```
   Add tag: "ai_resolved"
   Status: Solved
   ```

2. **Verify Themis received resolution**
   ```
   ✅ ticket.solved received at 2026-07-24T14:32:00Z
   ✅ Outcome submitted: out_a1b2c3d4e5f6
   ```

3. **Check outcome status**
   ```bash
   curl https://api.ontitled.ai/v1/outcomes/out_a1b2c3d4e5f6 \
     -H "Authorization: Bearer ont_live_..."
   ```

**Expected:**
```json
{
  "outcome_id": "out_a1b2c3d4e5f6",
  "status": "pending_verification",
  "sla_deadline": "2026-07-27T14:32:00Z"
}
```

### Test 4: Verify First Outcome

**Wait 72 hours (or use test mode):**

```bash
# Force immediate verification (test mode only)
curl -X POST https://api.ontitled.ai/v1/outcomes/out_a1b2c3d4e5f6/verify \
  -H "Authorization: Bearer ont_live_..." \
  -d '{"test_mode": true}'
```

**Expected:**
```json
{
  "outcome_id": "out_a1b2c3d4e5f6",
  "status": "verified",
  "verification": {
    "result": "VERIFIED",
    "checks": {
      "initial_resolution": true,
      "no_reopen": true,
      "no_human_intervention": true,
      "final_resolution": true
    }
  }
}
```

---

## Step 5: Production Configuration

### Tag Configuration

**Required Tags:**

| Tag | Meaning | Action |
|-----|---------|--------|
| `ai_resolved` | Ticket resolved by AI | Submit to Themis |
| `themis_verified` | Outcome verified | Auto-added by Dike |
| `themis_failed` | Outcome failed | Auto-added by Dike |

**Tag Automation:**
```json
{
  "automation": {
    "title": "Tag AI Resolved Tickets",
    "conditions": {
      "all": [
        {"field": "status", "operator": "is", "value": "solved"},
        {"field": "assignee_email", "operator": "contains", "value": "@sierra.ai"}
      ]
    },
    "actions": [
      {"field": "tags", "value": "ai_resolved"}
    ]
  }
}
```

### Field Mapping

**Custom Field (Optional):**
```
Field Name: Themis Outcome ID
Field Key: themis_outcome_id
Type: Text
```

**Populated by:** Dike after verification

### SLA Configuration

**Zendesk SLA (Optional):**
```
Policy: AI Resolution SLA
Conditions: Tags contain "ai_resolved"
Target: 72 hours (match Themis verification window)
```

---

## Troubleshooting

### Common Issues

#### Issue 1: Webhook Not Receiving Events

**Symptoms:**
- No events in Themis logs
- Tickets not being submitted

**Diagnosis:**
```bash
# Check webhook status
curl https://{domain}.zendesk.com/api/v2/webhooks \
  -H "Authorization: Bearer {zendesk_token}"
```

**Solutions:**
1. Verify webhook URL is correct
2. Check webhook is active (not paused)
3. Ensure triggers are firing
4. Test webhook with manual payload

#### Issue 2: Authentication Errors

**Symptoms:**
- 401 Unauthorized responses
- "Invalid credentials" errors

**Solutions:**
1. Regenerate OAuth token
2. Verify token scopes include `read:tickets`
3. Check token hasn't expired
4. Ensure API access is enabled

#### Issue 3: Outcomes Not Verifying

**Symptoms:**
- Outcomes stuck in "pending"
- No verification after 72 hours

**Diagnosis:**
```bash
# Check outcome status
curl https://api.ontitled.ai/v1/outcomes/{id} \
  -H "Authorization: Bearer ont_live_..."
```

**Solutions:**
1. Verify Dike can access Zendesk API
2. Check ticket wasn't deleted
3. Ensure ticket ID format matches
4. Review Dike connector logs

#### Issue 4: Duplicate Outcomes

**Symptoms:**
- Same ticket submitted multiple times
- Contract balance depleted incorrectly

**Prevention:**
```python
# Check for existing outcome before submitting
def submit_outcome(ticket_id):
    existing = themis.outcomes.list(
        ticket_id=ticket_id,
        status=['pending', 'verified']
    )

    if existing:
        return existing[0]  # Return existing outcome

    return themis.outcomes.submit(ticket_id=ticket_id)
```

---

## Advanced Configuration

### Multi-Brand Setup

**For Zendesk accounts with multiple brands:**

```json
{
  "brand_mapping": {
    "brand_1": {
      "contract_id": "ctr_us_brand",
      "ticker": "UPX-CX-RES-US-L2"
    },
    "brand_2": {
      "contract_id": "ctr_eu_brand",
      "ticker": "UPX-CX-RES-EU-L2"
    }
  }
}
```

### Custom Verification Rules

**Example: Extend SLA for enterprise tickets:**

```python
# Custom rule in Dike connector
def get_sla_window(ticket):
    if "enterprise" in ticket.tags:
        return 168  # 7 days for enterprise
    return 72  # 3 days for standard
```

### Webhook Security

**IP Whitelisting:**
```
Allow from: 52.0.0.0/8 (Themis AWS range)
```

**Signature Verification:**
```python
import hmac
import hashlib

def verify_webhook(request):
    signature = request.headers['X-Themis-Signature']
    payload = request.body

    expected = hmac.new(
        WEBHOOK_SECRET.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected)
```

---

## Monitoring and Analytics

### Zendesk Insights

**Custom Report:**
```
Report: AI Resolution Performance
Metrics:
- Tickets with tag "ai_resolved"
- Tickets with tag "themis_verified"
- Average resolution time
- Reopen rate
```

### Themis Dashboard

**Key Metrics:**
- Verification rate by vendor
- Cost per outcome
- SLA compliance
- Failed outcome reasons

---

## Next Steps

- **API reference:** Read [05 - API Reference](./05-api-reference.md)
- **Dike protocol:** Read [04 - Dike Verification Protocol](./04-dike-protocol.md)
- **Vendor integration:** Read [07 - Vendor Integration](./07-integration-vendors.md)

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
