# 07 - Integration Guide — AI Vendors

## Submitting AI Outcomes to Themis for Verification

This guide is for AI vendors (Sierra, Intercom, custom agents) who want to submit outcomes to Themis for verification and payment.

---

## Overview

### Who This Guide Is For

- **AI Agent Platforms:** Sierra, Intercom Fin, Ada, Forethought
- **Custom AI Agents:** In-house support bots, automation tools
- **Model Providers:** OpenAI, Anthropic (via partner integrations)

### Integration Benefits

| Benefit | Description |
|---------|-------------|
| **Verified Payment** | Get paid only for outcomes that pass verification |
| **Trust Signal** | Demonstrate reliability to enterprise buyers |
| **Optimization** | Themis routing sends you appropriate tasks |
| **Market Access** | Access enterprise buyers via Themis marketplace |

### How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Enterprise │────>│  Your Agent │────>│    Dike     │────>│   Themis    │
│   Ticket    │     │  Processes  │     │ Verifies    │     │  Settles    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │                   │
      │ 1. Receive task   │                   │                   │
      │──────────────────>│                   │                   │
      │                   │                   │                   │
      │                   │ 2. Resolve        │                   │
      │                   │──────────────────>│                   │
      │                   │                   │                   │
      │                   │                   │ 3. Verify (72h)   │
      │                   │                   │                   │
      │                   │                   │ 4. Submit result  │
      │                   │                   │──────────────────>│
      │                   │                   │                   │
      │                   │<───────────────────────────────────────│
      │                   │ 5. Payment (if verified)              │
      │                   │                   │                   │
```

---

## Prerequisites

### Themis Requirements

- **Vendor account:** Approved by Themis
- **API key:** `ont_live_vendor_...` prefix
- **Active contract:** Enterprise UPX contract including your service
- **Integration tested:** Passing test outcomes

### Technical Requirements

- **HTTPS endpoint:** For receiving routed tasks
- **API integration:** Submit outcomes to Themis
- **Telemetry:** Provide execution details
- **Webhook handler:** Receive verification results

---

## Step 1: Vendor Onboarding

### Apply to Vendor Program

1. **Submit Application**
   ```
   https://ontitled.ai/vendors/apply
   ```

2. **Provide Information**
   ```
   Company: Your AI Platform
   Capabilities: Customer support, Level 1-3
   Average resolution time: 2.5 minutes
   Historical verification rate: 94%
   ```

3. **Technical Review**
   - API compatibility check
   - Security assessment
   - Performance validation

4. **Receive Credentials**
   ```json
   {
     "vendor_id": "vendor_sierra_001",
     "api_key": "ont_live_vendor_abc123...",
     "webhook_secret": "whsec_vendor_xyz789"
   }
   ```

### Vendor Profile

**Configure in Themis Dashboard:**
```json
{
  "vendor_profile": {
    "vendor_id": "vendor_sierra_001",
    "name": "Sierra",
    "capabilities": ["UPX-CX-RES-US-L1", "UPX-CX-RES-US-L2"],
    "models": ["claude-5-sonnet", "gpt-5.6"],
    "average_latency_ms": 2500,
    "historical_verification_rate": 0.94,
    "pricing_tier": "premium"
  }
}
```

---

## Step 2: Receive Routed Tasks

### Task Routing Format

When Themis routes a task to your agent, you receive:

```json
{
  "routing": {
    "task_id": "tsk_a1b2c3d4e5f6",
    "contract_id": "ctr_7f8a9b2c3d4e",
    "ticker": "UPX-CX-RES-US-L2",
    "vendor_allocation": {
      "vendor_id": "vendor_sierra_001",
      "confidence": 0.87
    }
  },
  "task": {
    "ticket_id": "ZD-18432",
    "subject": "How do I reset my password?",
    "description": "I forgot my password and can't log in...",
    "customer_tier": "premium",
    "previous_interactions": 2,
    "language": "en-US"
  },
  "sla": {
    "response_time_seconds": 30,
    "resolution_time_seconds": 300
  }
}
```

### Your Endpoint

**Configure in Themis:**
```
Vendor Settings → Task Endpoint
URL: https://api.your-agent.com/themis/tasks
Method: POST
Authentication: Bearer token
```

**Your handler:**
```python
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
THEMIS_API_KEY = "ont_live_vendor_..."

@app.route('/themis/tasks', methods=['POST'])
def receive_task():
    task = request.json

    # Process the task with your agent
    result = your_agent.process(
        ticket_id=task['task']['ticket_id'],
        subject=task['task']['subject'],
        description=task['task']['description']
    )

    # Submit outcome to Themis
    if result.resolved:
        submit_outcome(task, result)

    return jsonify({"status": "accepted"}), 200

def submit_outcome(task, result):
    requests.post(
        'https://api.ontitled.ai/v1/outcomes',
        headers={'Authorization': f'Bearer {THEMIS_API_KEY}'},
        json={
            'contract_id': task['routing']['contract_id'],
            'vendor_id': 'vendor_sierra_001',
            'ticket_id': task['task']['ticket_id'],
            'resolution_type': 'self_service',
            'telemetry': {
                'model_calls': result.model_calls,
                'execution_time_ms': result.execution_time_ms
            }
        }
    )
```

---

## Step 3: Submit Outcomes

### Outcome Submission

**Endpoint:** `POST /v1/outcomes`

**Request:**
```json
{
  "contract_id": "ctr_7f8a9b2c3d4e",
  "vendor_id": "vendor_sierra_001",
  "ticker": "UPX-CX-RES-US-L2",

  "outcome": {
    "ticket_id": "ZD-18432",
    "claimed_at": "2026-07-24T14:32:00Z",
    "resolution_type": "self_service",
    "confidence": 0.94,
    "notes": "Customer password reset, confirmation sent"
  },

  "telemetry": {
    "agent_version": "sierra-v3.2.1",
    "model_calls": [
      {
        "model": "claude-5-sonnet",
        "tokens_in": 2048,
        "tokens_out": 512,
        "latency_ms": 1200,
        "cost_usd": 0.0032
      },
      {
        "model": "gpt-5.6",
        "tokens_in": 1024,
        "tokens_out": 256,
        "latency_ms": 800,
        "cost_usd": 0.0018
      }
    ],
    "tool_calls": [
      {
        "tool": "zendesk_search",
        "execution_time_ms": 150
      },
      {
        "tool": "password_reset",
        "execution_time_ms": 300
      }
    ],
    "total_execution_time_ms": 3500,
    "total_compute_cost_usd": 0.0050
  },

  "verification_hints": {
    "system_of_record": "zendesk",
    "expected_state": "solved",
    "customer_sentiment": "positive"
  }
}
```

### Telemetry Requirements

| Field | Required | Description |
|-------|----------|-------------|
| `agent_version` | Yes | Your software version |
| `model_calls` | Yes | Each LLM call made |
| `tool_calls` | No | External tool executions |
| `total_execution_time_ms` | Yes | End-to-end time |
| `total_compute_cost_usd` | No | Your actual cost |

**Model Call Format:**
```json
{
  "model": "claude-5-sonnet",
  "tokens_in": 2048,
  "tokens_out": 512,
  "latency_ms": 1200,
  "cost_usd": 0.0032
}
```

### Response

**Success:**
```json
{
  "outcome_id": "out_a1b2c3d4e5f6",
  "status": "pending_verification",
  "submitted_at": "2026-07-24T14:32:00Z",
  "verification": {
    "sla_deadline": "2026-07-27T14:32:00Z",
    "estimated_payment_date": "2026-07-28T00:00:00Z"
  }
}
```

---

## Step 4: Handle Verification Results

### Webhook Events

Configure webhook to receive results:

```bash
curl -X POST https://api.ontitled.ai/v1/webhooks \
  -H "Authorization: Bearer ont_live_vendor_..." \
  -d '{
    "url": "https://api.your-agent.com/themis/webhooks",
    "events": ["outcome.verified", "outcome.failed"],
    "secret": "whsec_your_secret"
  }'
```

### Verified Event

```json
{
  "event": "outcome.verified",
  "timestamp": "2026-07-27T14:32:00Z",
  "outcome": {
    "outcome_id": "out_a1b2c3d4e5f6",
    "ticket_id": "ZD-18432",
    "status": "verified",
    "contract_id": "ctr_7f8a9b2c3d4e"
  },
  "settlement": {
    "amount": 0.89,
    "currency": "USD",
    "transaction_id": "txn_xyz789",
    "settled_at": "2026-07-27T14:33:00Z"
  },
  "verification": {
    "result": "VERIFIED",
    "proof_id": "prf_9c8d7e6f5a4b"
  }
}
```

**Your handler:**
```python
@app.route('/themis/webhooks', methods=['POST'])
def handle_webhook():
    event = request.json

    if event['event'] == 'outcome.verified':
        # Record payment
        record_payment(
            outcome_id=event['outcome']['outcome_id'],
            amount=event['settlement']['amount']
        )

        # Update metrics
        update_verification_rate(success=True)

    elif event['event'] == 'outcome.failed':
        # Analyze failure
        analyze_failure(
            outcome_id=event['outcome']['outcome_id'],
            reason=event['verification']['failure_reason']
        )

        # Update metrics
        update_verification_rate(success=False)

    return jsonify({"status": "received"}), 200
```

### Failed Event

```json
{
  "event": "outcome.failed",
  "timestamp": "2026-07-26T08:15:00Z",
  "outcome": {
    "outcome_id": "out_a1b2c3d4e5f6",
    "ticket_id": "ZD-18432",
    "status": "failed"
  },
  "verification": {
    "result": "FAILED",
    "failure_reason": "Customer reopened ticket within SLA window",
    "failure_timestamp": "2026-07-26T08:15:00Z",
    "checks": {
      "initial_resolution": true,
      "no_reopen": false,
      "no_human_intervention": true
    }
  },
  "settlement": {
    "status": "voided",
    "amount": 0.00
  }
}
```

### Common Failure Reasons

| Reason | Meaning | Action |
|--------|---------|--------|
| `reopened_within_sla` | Customer reopened ticket | Improve resolution quality |
| `human_intervention` | Human agent fixed the issue | Improve first-contact resolution |
| `not_resolved` | Ticket not actually resolved | Fix agent logic |
| `system_error` | Dike couldn't verify | Contact Themis support |

---

## Step 5: Handle Retries and Failures

### Retry Logic

**When submission fails:**

```python
import time
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# Configure retry strategy
retry_strategy = Retry(
    total=3,
    backoff_factor=1,
    status_forcelist=[429, 500, 502, 503, 504]
)

session = requests.Session()
adapter = HTTPAdapter(max_retries=retry_strategy)
session.mount("https://", adapter)

# Submit with retry
def submit_with_retry(outcome_data):
    try:
        response = session.post(
            'https://api.ontitled.ai/v1/outcomes',
            headers={'Authorization': f'Bearer {THEMIS_API_KEY}'},
            json=outcome_data,
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        # Log and alert
        logger.error(f"Failed to submit outcome: {e}")
        alert_ops_team(e)
        raise
```

### Duplicate Prevention

**Check before submitting:**

```python
def submit_outcome(outcome_data):
    # Check if already submitted
    existing = requests.get(
        f"https://api.ontitled.ai/v1/outcomes",
        headers={'Authorization': f'Bearer {THEMIS_API_KEY}'},
        params={'ticket_id': outcome_data['outcome']['ticket_id']}
    ).json()

    if existing['outcomes']:
        return existing['outcomes'][0]  # Return existing

    # Submit new outcome
    return requests.post(
        'https://api.ontitled.ai/v1/outcomes',
        headers={'Authorization': f'Bearer {THEMIS_API_KEY}'},
        json=outcome_data
    ).json()
```

### Outcome Cancellation

**If you made a mistake:**

```bash
curl -X DELETE https://api.ontitled.ai/v1/outcomes/out_a1b2c3d4e5f6 \
  -H "Authorization: Bearer ont_live_vendor_..."
```

**Only allowed:** Within 1 hour of submission, before verification starts.

---

## Best Practices

### 1. Submit Promptly

Submit outcomes immediately after resolution:
- Delays extend payment timeline
- Reduces confusion if ticket state changes

### 2. Include Rich Telemetry

More telemetry = better routing decisions:
- Model usage patterns
- Tool call frequencies
- Error rates by task type

### 3. Handle Failures Gracefully

When verification fails:
- Analyze root cause
- Update agent logic
- Don't resubmit same outcome

### 4. Monitor Verification Rate

Track your metrics:
```python
# Weekly verification rate report
verification_rate = verified_outcomes / total_outcomes
print(f"Weekly verification rate: {verification_rate:.1%}")

if verification_rate < 0.90:
    alert("Verification rate below threshold")
```

### 5. Optimize for Cost-Per-Outcome

Not cost-per-token:
```python
# Bad: Optimize for token cost
cost_per_token = total_tokens / total_cost

# Good: Optimize for outcome cost
cost_per_outcome = total_cost / verified_outcomes
```

---

## Testing

### Sandbox Environment

Use test API key for development:
```
API Key: ont_test_vendor_abc123
Base URL: https://api-staging.ontitled.ai/v1
```

### Test Outcomes

Submit test outcomes:
```json
{
  "contract_id": "ctr_test_123",
  "vendor_id": "vendor_test",
  "outcome": {
    "ticket_id": "TEST-001",
    "claimed_at": "2026-07-24T14:32:00Z"
  },
  "test_mode": true
}
```

**Test mode features:**
- Immediate verification (no 72h wait)
- No actual payment
- Marked as test in dashboard

### Integration Checklist

- [ ] Vendor account approved
- [ ] API key received
- [ ] Webhook endpoint configured
- [ ] Test outcome submitted successfully
- [ ] Verification result received
- [ ] Payment flow tested (test mode)
- [ ] Error handling verified
- [ ] Retry logic tested
- [ ] Production deployment approved

---

## Troubleshooting

### Issue: 403 Forbidden

**Cause:** Vendor not authorized for contract

**Solution:**
```bash
# Check contract authorization
curl https://api.ontitled.ai/v1/contracts/ctr_7f8a9b2c3d4e \
  -H "Authorization: Bearer ont_live_vendor_..."
```

Contact Themis to add you to contract.

### Issue: 409 Conflict

**Cause:** Duplicate outcome submission

**Solution:** Check for existing outcome before submitting.

### Issue: 422 Unprocessable

**Cause:** Invalid outcome data

**Check:**
- Ticket ID format
- Timestamp format (ISO 8601)
- Required fields present

### Issue: Not receiving webhooks

**Check:**
1. Webhook URL accessible from internet
2. SSL certificate valid
3. Webhook secret configured correctly
4. Events subscribed in configuration

---

## API Rate Limits

| Plan | Requests/Minute | Requests/Hour |
|------|-----------------|---------------|
| **Standard** | 120 | 5,000 |
| **High Volume** | 600 | 25,000 |

**Headers:**
```
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 599
X-RateLimit-Reset: 1626876000
```

---

## Support

- **Technical Integration:** integrations@ontitled.ai
- **Vendor Success:** vendors@ontitled.ai
- **Emergency Hotline:** +1-XXX-XXX-XXXX

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
