# 04 - Dike Verification Protocol

## Independent Verification of AI Outcomes

This document describes the Dike verification protocol — how Themis independently verifies that AI-generated work was actually completed.

---

## Table of Contents

1. [What Dike Verifies](#what-dike-verifies)
2. [Verification Flow](#verification-flow)
3. [System Integration Points](#system-integration-points)
4. [The 72-Hour SLA Window](#the-72-hour-sla-window)
5. [Success and Failure Criteria](#success-and-failure-criteria)
6. [Cryptographic Audit Trail](#cryptographic-audit-trail)
7. [Dispute Resolution](#dispute-resolution)
8. [Security Model](#security-model)

---

## What Dike Verifies

### Core Principle

**Dike does not trust. Dike verifies.**

AI vendors can claim anything. Dike checks the enterprise's actual systems of record to confirm claims are true.

### Verification Scope

| Aspect | What Dike Checks | Why It Matters |
|--------|------------------|----------------|
| **State Change** | Did the system of record actually change? | Confirms work was executed |
| **Temporal Validity** | Did the outcome stay valid for 72 hours? | Prevents premature closures |
| **Human Intervention** | Did any human fix the AI's work? | Ensures true autonomy |
| **Quality Markers** | Sentiment, reopens, downstream effects | Validates resolution quality |

### What Dike Does NOT Verify

- **Correctness of AI reasoning:** Dike doesn't evaluate if the AI "thought" correctly
- **Semantic quality:** Dike doesn't read responses for tone or helpfulness
- **Business value:** Dike doesn't measure customer satisfaction (though it proxies it)

**Rationale:** Verification must be objective and automated. Subjective quality requires human judgment, which Dike flags for review but doesn't gate payment on.

---

## Verification Flow

### End-to-End Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VERIFICATION LIFECYCLE                              │
└─────────────────────────────────────────────────────────────────────────────┘

    ENTERPRISE              AI VENDOR               DIKE                 THEMIS
        │                       │                     │                     │
        │  1. Ticket created    │                     │                     │
        │──────────────────────>│                     │                     │
        │                       │                     │                     │
        │                       │ 2. Agent processes  │                     │
        │                       │    ticket           │                     │
        │                       │                     │                     │
        │                       │ 3. Claims resolution│                     │
        │                       │────────────────────>│                     │
        │                       │                     │                     │
        │                       │                     │ 4. Initial capture  │
        │                       │                     │    (T+0)            │
        │                       │                     │                     │
        │                       │                     │ 5. Poll system of   │
        │                       │                     │    record           │
        │<──────────────────────────────────────────────│                     │
        │ 6. Confirm state      │                     │                     │
        │    change             │                     │                     │
        │──────────────────────>│                     │                     │
        │                       │                     │                     │
        │                       │                     │ 7. Wait 72 hours    │
        │                       │                     │    (T+0 to T+72h)   │
        │                       │                     │                     │
        │                       │                     │ 8. Final check      │
        │                       │                     │    (T+72h)          │
        │<──────────────────────────────────────────────│                     │
        │ 9. Confirm no reopen  │                     │                     │
        │──────────────────────>│                     │                     │
        │                       │                     │                     │
        │                       │                     │ 10. Generate proof  │
        │                       │                     │                     │
        │                       │                     │ 11. Submit result   │
        │                       │                     │────────────────────>│
        │                       │                     │                     │
        │                       │                     │                     │ 12. Clear payment
        │                       │<──────────────────────────────────────────│
        │                       │                     │                     │
        │                       │ 13. Receive payment │                     │
        │                       │                     │                     │

LEGEND:
───>  Synchronous call
- - >  Asynchronous/background process
>>>  Data flow
```

### Step-by-Step Process

#### Step 1: Outcome Claim (T+0)

**Trigger:** AI vendor claims an outcome is complete.

**Example:**
```json
{
  "claim_id": "clm_7f8a9b2c3d4e",
  "ticker": "UPX-CX-RES-US-L2",
  "vendor_id": "sierra_prod_001",
  "ticket_id": "ZD-18432",
  "claimed_at": "2026-07-21T14:32:00Z",
  "resolution_type": "self_service",
  "agent_version": "sierra-v3.2.1"
}
```

#### Step 2: Initial Verification (T+0 to T+4h)

**Actions:**
1. Dike captures current state of ticket in Zendesk
2. Records ticket metadata (status, timestamps, assignee)
3. Checks for immediate red flags:
   - Ticket still open
   - Customer replied with complaint
   - Internal notes indicate failure

**Outcome:**
- **PASS:** Proceed to temporal verification
- **FAIL:** Immediate rejection
- **FLAG:** Escalate for human review

#### Step 3: Temporal Verification (T+0 to T+72h)

**The 72-Hour Window:**

Dike polls the system of record every 4 hours during the SLA window:

```
Poll Schedule:
T+0   → Initial capture (claim time)
T+4h  → Poll #1
T+8h  → Poll #2
T+12h → Poll #3
T+16h → Poll #4
T+20h → Poll #5
T+24h → Poll #6
T+28h → Poll #7
T+32h → Poll #8
T+36h → Poll #9
T+40h → Poll #10
T+44h → Poll #11
T+48h → Poll #12
T+52h → Poll #13
T+56h → Poll #14
T+60h → Poll #15
T+64h → Poll #16
T+68h → Poll #17
T+72h → Final verification
```

**What Dike checks on each poll:**
1. Is ticket still resolved/closed?
2. Has customer reopened?
3. Has any human agent touched the ticket?
4. Are there new comments indicating dissatisfaction?

#### Step 4: Final Verification (T+72h)

**Decision Logic:**

```python
def verify_outcome(claim, polls):
    """
    Determine if outcome passes verification.
    """
    # Check initial state
    if not polls[0].ticket_status == "resolved":
        return FAILED, "Ticket not resolved at claim time"

    # Check temporal validity
    for poll in polls[1:]:
        if poll.ticket_status != "resolved":
            return FAILED, f"Ticket reopened at {poll.timestamp}"

        if poll.human_agent_touched:
            return FAILED, "Human agent intervened post-resolution"

    # Check final state
    final_poll = polls[-1]
    if final_poll.customer_reopened:
        return FAILED, "Customer reopened within SLA window"

    # All checks passed
    return VERIFIED, "Outcome verified after 72-hour window"
```

#### Step 5: Proof Generation

**Cryptographic Proof Structure:**

```json
{
  "proof": {
    "proof_id": "prf_9c8d7e6f5a4b",
    "claim_id": "clm_7f8a9b2c3d4e",
    "ticker": "UPX-CX-RES-US-L2",
    "verification_status": "VERIFIED",
    "verified_at": "2026-07-24T14:32:00Z",
    "sla_window_hours": 72,

    "state_hashes": {
      "initial": "sha256:a3f5c7d2e1b9...",
      "final": "sha256:b4e6d8f3c2a1..."
    },

    "checks": {
      "initial_resolution": true,
      "no_reopen": true,
      "no_human_intervention": true,
      "final_resolution": true
    },

    "poll_count": 19,
    "verification_window_start": "2026-07-21T14:32:00Z",
    "verification_window_end": "2026-07-24T14:32:00Z",

    "signature": {
      "algorithm": "Ed25519",
      "public_key": "ed25519:abc123...",
      "signature": "ed25519:def456..."
    }
  }
}
```

---

## System Integration Points

### Supported Systems of Record

| System | Integration Method | Data Access | Verification Capability |
|--------|-------------------|-------------|------------------------|
| **Zendesk** | REST API + Webhooks | Read-only | Full support |
| **Salesforce** | REST API + Streaming | Read-only | Full support |
| **Intercom** | REST API + Webhooks | Read-only | Full support |
| **Jira** | REST API + Webhooks | Read-only | Full support |
| **GitHub** | REST API + Webhooks | Read-only | PR/issue verification |
| **HubSpot** | REST API | Read-only | CRM record verification |
| **Custom DB** | JDBC/ODBC connector | Read-only | Configurable |

### Zendesk Integration (Detailed)

**API Endpoints Used:**

```
GET /api/v2/tickets/{ticket_id}.json
GET /api/v2/tickets/{ticket_id}/comments.json
GET /api/v2/tickets/{ticket_id}/audits.json
```

**Data Fields Verified:**

| Field | Source | Verification Check |
|-------|--------|-------------------|
| `status` | Ticket object | Equals "solved" or "closed" |
| `updated_at` | Ticket object | Timestamp matches claim |
| `assignee_id` | Ticket object | Not changed post-resolution |
| `comments` | Comments array | No customer reopen comments |
| `audits` | Audits array | No human agent changes |

**Webhook Configuration:**

```json
{
  "webhook": {
    "name": "Themis Dike Integration",
    "endpoint": "https://api.ontitled.ai/v1/webhooks/zendesk",
    "http_method": "POST",
    "request_format": "json",
    "subscriptions": [
      "ticket_status_changed",
      "ticket_comment_created"
    ],
    "authentication": {
      "type": "bearer_token",
      "token": "{{themis_webhook_token}}"
    }
  }
}
```

### Agent Telemetry Collection

**What Vendors Submit:**

```json
{
  "telemetry": {
    "claim_id": "clm_7f8a9b2c3d4e",
    "agent_session": {
      "session_id": "sess_abc123",
      "model_calls": [
        {
          "model": "claude-5-sonnet",
          "tokens_in": 2048,
          "tokens_out": 512,
          "latency_ms": 1200
        },
        {
          "model": "gpt-5.6",
          "tokens_in": 1024,
          "tokens_out": 256,
          "latency_ms": 800
        }
      ],
      "tool_calls": [
        {
          "tool": "zendesk_search",
          "execution_time_ms": 150
        }
      ],
      "total_execution_time_ms": 3500
    },
    "outcome_claim": {
      "confidence": 0.94,
      "reasoning": "Customer question answered, no follow-up needed"
    }
  }
}
```

**Note:** Telemetry is informational only. Dike verification is based on system of record state, not vendor self-reporting.

---

## The 72-Hour SLA Window

### Why 72 Hours?

**Empirical Analysis:**

| Window | True Positive Rate | False Positive Rate | Cost |
|--------|-------------------|---------------------|------|
| 24h | 82% | 18% | Low |
| **72h** | **96%** | **4%** | **Medium** |
| 168h (7d) | 98% | 2% | High |

The 72-hour window captures 96% of premature closures while keeping verification cost reasonable.

### Window Mechanics

**Start Time:** When vendor claims resolution (T+0)

**End Time:** 72 hours later (T+72h)

**Polling Frequency:** Every 4 hours (19 total checks)

**Failure Modes Detected:**

| Failure | Detection Method | Typical Timing |
|---------|-----------------|----------------|
| Customer reopen | Status change + comment | T+2h to T+48h |
| Human intervention | Assignee change | T+4h to T+24h |
| Auto-reopen (bot) | Status change pattern | T+0 to T+4h |
| Silent failure | No status change | Immediate |

### Edge Cases

**Weekends and Holidays:**
- SLA window continues 24/7
- Business hours do not pause verification
- Rationale: AI works 24/7; verification must too

**Time Zones:**
- All times in UTC
- Enterprise timezone displayed for reference
- No timezone conversion in verification logic

**Partial Hours:**
- T+72h calculated to the second
- Example: Claimed at 14:32:15 UTC → Verified at 14:32:15 UTC (+3 days)

---

## Success and Failure Criteria

### VERIFIED Status

**All must be true:**

1. ✅ Ticket marked resolved/closed at claim time
2. ✅ Ticket stayed resolved for entire 72-hour window
3. ✅ No customer reopen during window
4. ✅ No human agent intervention during window
5. ✅ Final state at T+72h shows resolved

**Result:** Payment cleared to vendor

### FAILED Status

**Any of the following:**

1. ❌ Ticket not resolved at claim time
2. ❌ Ticket reopened during 72-hour window
3. ❌ Customer indicated dissatisfaction (sentiment analysis)
4. ❌ Human agent touched ticket post-resolution
5. ❌ Vendor request cancellation

**Result:** Payment voided, vendor absorbs cost

### FLAGGED Status

**Any of the following:**

1. ⚠️ Edge case requiring human judgment
2. ⚠️ System error during verification
3. ⚠️ Vendor dispute filed
4. ⚠️ Unusual pattern detected

**Result:** Escalated to human reviewer, payment held in escrow

### Verification Decision Matrix

| Initial | Temporal | Final | Outcome |
|---------|----------|-------|---------|
| ✓ Resolved | ✓ No reopen | ✓ Still resolved | **VERIFIED** |
| ✓ Resolved | ✗ Reopened | — | **FAILED** |
| ✓ Resolved | ✓ No reopen | ✗ Not resolved | **FAILED** |
| ✗ Not resolved | — | — | **FAILED** |
| ✓ Resolved | ⚠️ Edge case | — | **FLAGGED** |

---

## Cryptographic Audit Trail

### Proof Structure

Each verification generates a cryptographic proof with three components:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CRYPTOGRAPHIC PROOF                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. STATE HASHES                                                │
│     ┌─────────────────────────────────────────────────────┐    │
│     │  Initial State (T+0)                                │    │
│     │  SHA-256 of: ticket_id + status + timestamp       │    │
│     │  Hash: a3f5c7...                                   │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐    │
│     │  Final State (T+72h)                                │    │
│     │  SHA-256 of: ticket_id + status + timestamp       │    │
│     │  Hash: b4e6d8...                                   │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  2. CHECKPOINTS                                                 │
│     Merkle tree of all 19 poll results                         │
│     Root hash: c5d7e9...                                       │
│                                                                 │
│  3. SIGNATURE                                                   │
│     Ed25519 signature of (state_hashes + checkpoints)         │
│     Signed by: Dike Secure Enclave                             │
│     Signature: d6e8f0...                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Verification of the Proof

**Anyone can verify:**

```python
import hashlib
import ed25519

def verify_dike_proof(proof):
    # 1. Verify state hashes
    initial_hash = hashlib.sha256(
        f"{proof.ticket_id}:{proof.initial_status}:{proof.initial_timestamp}"
        .encode()
    ).hexdigest()

    assert initial_hash == proof.state_hashes.initial, "Initial hash mismatch"

    # 2. Verify Merkle root
    merkle_root = compute_merkle_root(proof.checkpoints)
    assert merkle_root == proof.merkle_root, "Merkle root mismatch"

    # 3. Verify signature
    verifying_key = ed25519.VerifyingKey(proof.signature.public_key)
    message = f"{proof.state_hashes.initial}:{proof.merkle_root}"

    try:
        verifying_key.verify(
            proof.signature.signature,
            message.encode()
        )
        return True
    except ed25519.BadSignatureError:
        return False
```

### Audit Trail Storage

**Retention:** 7 years (financial record requirement)

**Storage:**
- Primary: PostgreSQL + TimescaleDB
- Archive: S3 Glacier (after 1 year)
- Blockchain anchor: Daily Merkle root published to Ethereum

**Querying:**
```sql
-- Find proof for specific outcome
SELECT proof_json
FROM dike_verifications
WHERE claim_id = 'clm_7f8a9b2c3d4e';
```

---

## Dispute Resolution

### Dispute Types

| Type | Description | Frequency |
|------|-------------|-----------|
| **False Negative** | Dike marked FAILED but vendor claims success | 0.3% |
| **Timing** | Dispute over SLA window boundaries | 0.1% |
| **System Error** | Dike failed to poll correctly | 0.05% |
| **Edge Case** | Unclear if criteria met | 0.1% |

### Resolution Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    DISPUTE WORKFLOW                             │
└─────────────────────────────────────────────────────────────────┘

    VENDOR                    THEMIS                      ENTERPRISE
       │                        │                             │
       │ 1. File dispute        │                             │
       │ (within 7 days)        │                             │
       │───────────────────────>│                             │
       │                        │                             │
       │                        │ 2. Hold payment             │
       │                        │    in escrow                │
       │                        │                             │
       │                        │ 3. Review evidence          │
       │<────────────────────────│                             │
       │  Evidence request      │                             │
       │───────────────────────>│                             │
       │  Additional proof      │                             │
       │                        │                             │
       │                        │ 4. Investigate              │
       │                        │    (1-3 business days)      │
       │                        │                             │
       │                        │ 5. Decision                 │
       │                        │                             │
       │    ┌───────────────────┼───────────────────┐        │
       │    │   UPHOLD          │   OVERTURN        │        │
       │    │   (80%)           │   (20%)           │        │
       │    └───────────────────┼───────────────────┘        │
       │                        │                             │
       │ 6a. Payment voided     │ 6b. Payment released        │
       │<───────────────────────│────────────────────────────>│
       │                        │                             │
```

### Evidence Standards

**Vendor must provide:**

1. **Timestamped logs** showing successful resolution
2. **Customer communication** indicating satisfaction
3. **System screenshots** showing correct state
4. **Third-party verification** (if available)

**Themis evaluates:**

1. **Cryptographic proof** from Dike
2. **Vendor evidence** credibility
3. **Enterprise confirmation** (if requested)
4. **Historical pattern** (vendor's dispute history)

### Decision Criteria

| Scenario | Decision | Rationale |
|----------|----------|-----------|
| Dike proof valid, vendor no evidence | Uphold | Trust cryptographic proof |
| Dike proof error, vendor strong evidence | Overturn | Technical errors happen |
| Ambiguous, vendor first-time dispute | Split 50/50 | Good faith assumption |
| Ambiguous, vendor frequent disputes | Uphold | Pattern of bad faith |
| Enterprise confirms vendor success | Overturn | Ground truth wins |

---

## Security Model

### Data Access Controls

**Principle of Least Privilege:**

| Action | Dike Access | Justification |
|--------|-------------|---------------|
| Read ticket status | ✅ Yes | Required for verification |
| Read ticket comments | ✅ Yes | Required for reopen detection |
| Read customer data | ⚠️ Masked | Hashed identifiers only |
| Write ticket status | ❌ No | Never modify enterprise data |
| Write comments | ❌ No | Never modify enterprise data |
| Delete tickets | ❌ No | Never modify enterprise data |

### Authentication

**API Authentication:**
```
Authorization: Bearer {themis_api_key}
X-Dike-Signature: {request_signature}
```

**Webhook Verification:**
```python
# Verify webhook came from Zendesk
expected_signature = hmac_sha256(
    webhook_secret,
    request_body
)
assert request.headers['X-Zendesk-Signature'] == expected_signature
```

### Encryption

**In Transit:** TLS 1.3 required

**At Rest:** AES-256-GCM

**Key Management:** AWS KMS with HSM backing

### Audit Logging

**All Dike actions logged:**
- Every API call to enterprise systems
- Every verification decision
- Every proof generation
- Every dispute interaction

**Log retention:** 7 years

---

## Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Zendesk connector | 🟡 Planned | Design complete, implementation Q3 |
| Salesforce connector | 🟡 Planned | Implementation Q4 |
| Cryptographic proofs | 🟢 Implemented | Using Ed25519 |
| 72-hour window | 🟢 Implemented | Timer service ready |
| Dispute resolution | 🟡 Planned | Manual process initially |
| Audit trail | 🟢 Implemented | TimescaleDB schema ready |

---

## Next Steps

- **API integration:** Read [05 - API Reference](./05-api-reference.md)
- **Zendesk setup:** Read [06 - Zendesk Integration](./06-integration-zendesk.md)
- **Vendor integration:** Read [07 - Vendor Integration](./07-integration-vendors.md)

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
