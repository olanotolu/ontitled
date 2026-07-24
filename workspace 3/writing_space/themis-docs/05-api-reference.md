# 05 - API Reference

## Themis REST API

Complete API specification for integrating with the Themis platform.

**Base URL:** `https://api.ontitled.ai/v1`

**Authentication:** Bearer token in Authorization header

---

## Authentication

### API Keys

**Header format:**
```
Authorization: Bearer {your_api_key}
```

**Key types:**

| Type | Prefix | Permissions | Use Case |
|------|--------|-------------|----------|
| **Live** | `ont_live_` | Full access | Production |
| **Test** | `ont_test_` | Sandboxed | Development |
| **Read-only** | `ont_read_` | GET only | Dashboards |

**Example:**
```bash
curl https://api.ontitled.ai/v1/compute-prices \
  -H "Authorization: Bearer ont_live_88319fbc923a10"
```

### OAuth 2.0

For enterprise integrations:

**Authorization URL:**
```
https://auth.ontitled.ai/oauth/authorize
?client_id={client_id}
&redirect_uri={redirect_uri}
&scope=quotes:read contracts:write
&state={state}
```

**Token Exchange:**
```bash
curl -X POST https://auth.ontitled.ai/oauth/token \
  -d "grant_type=authorization_code" \
  -d "client_id={client_id}" \
  -d "client_secret={client_secret}" \
  -d "code={authorization_code}"
```

**Response:**
```json
{
  "access_token": "ont_oat_abc123",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "ort_def456"
}
```

---

## Endpoints

### 1. Get Compute Prices

**Endpoint:** `GET /compute-prices`

**Description:** Retrieve current spot prices from Ornn compute index.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `gpu_type` | string | No | Filter by GPU (h100, a100, a10) |
| `region` | string | No | Filter by region (us-east, eu-west) |

**Example Request:**
```bash
curl https://api.ontitled.ai/v1/compute-prices \
  -H "Authorization: Bearer ont_live_..."
```

**Example Response:**
```json
{
  "timestamp": "2026-07-21T14:32:00Z",
  "source": "Ornn Compute Price Index",
  "prices": [
    {
      "gpu_type": "h100",
      "region": "us-east-1",
      "spot_price": 2.48,
      "currency": "USD",
      "unit": "hour",
      "updated_at": "2026-07-21T14:30:00Z"
    },
    {
      "gpu_type": "a100",
      "region": "us-east-1",
      "spot_price": 1.18,
      "currency": "USD",
      "unit": "hour",
      "updated_at": "2026-07-21T14:30:00Z"
    }
  ]
}
```

**Error Responses:**

| Code | Meaning | Resolution |
|------|---------|------------|
| 401 | Unauthorized | Check API key |
| 429 | Rate limited | Wait and retry |
| 503 | Ornn unavailable | Cached prices returned |

---

### 2. Generate Quote

**Endpoint:** `POST /quotes`

**Description:** Generate a UPX contract price quote.

**Request Body:**

```json
{
  "ticker": "UPX-CX-RES-US-L2",
  "quantity": 20000,
  "delivery_period": {
    "start_date": "2026-10-01",
    "end_date": "2026-12-31"
  },
  "quality_sla": 0.95,
  "options": {
    "insurance": true,
    "price_lock": true
  }
}
```

**Field Descriptions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ticker` | string | Yes | UPX contract ticker |
| `quantity` | integer | Yes | Number of outcomes |
| `delivery_period` | object | Yes | Contract validity period |
| `quality_sla` | float | No | Minimum verification rate (default 0.95) |
| `options.insurance` | boolean | No | Include price volatility insurance |
| `options.price_lock` | boolean | No | Lock price for 24 hours |

**Example Response:**

```json
{
  "quote_id": "quo_9c8d7e6f5a4b",
  "status": "valid",
  "valid_until": "2026-07-22T14:32:00Z",

  "contract": {
    "ticker": "UPX-CX-RES-US-L2",
    "quantity": 20000,
    "delivery_period": {
      "start_date": "2026-10-01",
      "end_date": "2026-12-31"
    }
  },

  "pricing": {
    "price_per_outcome": 0.89,
    "currency": "USD",
    "total_contract_value": 17800.00,

    "breakdown": {
      "base_compute": {
        "amount": 0.42,
        "percentage": 47.2,
        "source": "Ornn H100/A100 average"
      },
      "retry_multiplier": {
        "amount": 0.08,
        "percentage": 9.0,
        "rate": 1.093
      },
      "verification_cost": {
        "amount": 0.12,
        "percentage": 13.5
      },
      "risk_premium": {
        "amount": 0.05,
        "percentage": 5.6,
        "volatility_buffer": "3 months"
      },
      "themis_fee": {
        "amount": 0.22,
        "percentage": 24.7
      }
    }
  },

  "terms": {
    "sla_window_hours": 72,
    "quality_guarantee": 0.95,
    "payment_terms": "net_30",
    "routing": "themis_optimized"
  },

  "routing_preview": {
    "optimal_vendors": [
      {"vendor": "sierra", "allocation": 0.45, "expected_cost": 0.87},
      {"vendor": "intercom", "allocation": 0.35, "expected_cost": 0.91},
      {"vendor": "custom_agent", "allocation": 0.20, "expected_cost": 0.89}
    ]
  }
}
```

**Error Responses:**

| Code | Meaning | Example |
|------|---------|---------|
| 400 | Invalid request | Unknown ticker |
| 400 | Invalid quantity | Quantity > 1M |
| 422 | Unfulfillable | No vendors available |
| 422 | Invalid period | Start date in past |

---

### 3. Create Contract

**Endpoint:** `POST /contracts`

**Description:** Accept a quote and create an active UPX contract.

**Request Body:**

```json
{
  "quote_id": "quo_9c8d7e6f5a4b",
  "acceptance": {
    "accepted_at": "2026-07-21T15:00:00Z",
    "accepted_by": "user_abc123",
    "purchase_order": "PO-2026-7890"
  },
  "billing": {
    "payment_method": "ach_debit",
    "billing_email": "ap@company.com"
  }
}
```

**Example Response:**

```json
{
  "contract_id": "ctr_7f8a9b2c3d4e",
  "status": "active",
  "created_at": "2026-07-21T15:00:00Z",

  "quote": {
    "quote_id": "quo_9c8d7e6f5a4b",
    "price_per_outcome": 0.89,
    "quantity": 20000
  },

  "contract": {
    "ticker": "UPX-CX-RES-US-L2",
    "quantity_purchased": 20000,
    "quantity_remaining": 20000,
    "delivery_period": {
      "start_date": "2026-10-01",
      "end_date": "2026-12-31"
    }
  },

  "financials": {
    "total_value": 17800.00,
    "amount_paid": 0.00,
    "amount_due": 17800.00,
    "payment_terms": "net_30",
    "invoice_date": "2026-10-01"
  },

  "terms": {
    "sla_window_hours": 72,
    "quality_guarantee": 0.95
  }
}
```

**Contract Status Values:**

| Status | Meaning |
|--------|---------|
| `pending` | Quote accepted, awaiting payment |
| `active` | Contract in effect, outcomes being verified |
| `low_balance` | < 20% outcomes remaining |
| `depleted` | All outcomes consumed |
| `expired` | Delivery period ended with unused outcomes |
| `cancelled` | Contract cancelled (rare) |

---

### 4. Get Contract Status

**Endpoint:** `GET /contracts/{id}`

**Description:** Retrieve current status of a UPX contract.

**Example Request:**
```bash
curl https://api.ontitled.ai/v1/contracts/ctr_7f8a9b2c3d4e \
  -H "Authorization: Bearer ont_live_..."
```

**Example Response:**

```json
{
  "contract_id": "ctr_7f8a9b2c3d4e",
  "status": "active",
  "created_at": "2026-07-21T15:00:00Z",
  "updated_at": "2026-07-24T10:15:00Z",

  "contract": {
    "ticker": "UPX-CX-RES-US-L2",
    "quantity_purchased": 20000,
    "quantity_remaining": 15432,
    "delivery_period": {
      "start_date": "2026-10-01",
      "end_date": "2026-12-31"
    }
  },

  "consumption": {
    "outcomes_submitted": 4867,
    "outcomes_verified": 4568,
    "outcomes_failed": 299,
    "verification_rate": 0.938,
    "cost_per_outcome_actual": 0.89
  },

  "financials": {
    "total_value": 17800.00,
    "amount_paid": 4065.52,
    "amount_due": 13734.48,
    "next_invoice_date": "2026-08-01"
  },

  "performance": {
    "average_verification_time_hours": 72.3,
    "vendor_breakdown": [
      {
        "vendor": "sierra",
        "outcomes": 2190,
        "verified": 2102,
        "rate": 0.960
      },
      {
        "vendor": "intercom",
        "outcomes": 1867,
        "verified": 1736,
        "rate": 0.930
      },
      {
        "vendor": "custom_agent",
        "outcomes": 810,
        "verified": 730,
        "rate": 0.901
      }
    ]
  }
}
```

---

### 5. Submit Outcome

**Endpoint:** `POST /outcomes`

**Description:** Submit an AI outcome for verification.

**Authentication:** Vendor API key required

**Request Body:**

```json
{
  "contract_id": "ctr_7f8a9b2c3d4e",
  "vendor_id": "sierra_prod_001",
  "ticker": "UPX-CX-RES-US-L2",

  "outcome": {
    "ticket_id": "ZD-18432",
    "claimed_at": "2026-07-24T14:32:00Z",
    "resolution_type": "self_service",
    "confidence": 0.94
  },

  "telemetry": {
    "agent_version": "sierra-v3.2.1",
    "model_calls": [
      {
        "model": "claude-5-sonnet",
        "tokens_in": 2048,
        "tokens_out": 512,
        "latency_ms": 1200
      }
    ],
    "total_execution_time_ms": 3500
  },

  "verification_hints": {
    "system_of_record": "zendesk",
    "expected_state": "solved"
  }
}
```

**Field Descriptions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | string | Yes | Active UPX contract |
| `vendor_id` | string | Yes | Vendor identifier |
| `ticker` | string | Yes | Must match contract ticker |
| `outcome.ticket_id` | string | Yes | External system identifier |
| `outcome.claimed_at` | datetime | Yes | When resolution claimed |
| `telemetry` | object | No | Execution details |

**Example Response:**

```json
{
  "outcome_id": "out_a1b2c3d4e5f6",
  "status": "pending_verification",
  "submitted_at": "2026-07-24T14:32:00Z",

  "verification": {
    "sla_deadline": "2026-07-27T14:32:00Z",
    "estimated_completion": "2026-07-27T14:32:00Z",
    "dike_claim_id": "clm_7f8a9b2c3d4e"
  },

  "contract": {
    "contract_id": "ctr_7f8a9b2c3d4e",
    "quantity_remaining": 15431
  },

  "next_steps": {
    "check_status": "GET /v1/outcomes/out_a1b2c3d4e5f6",
    "webhook": "https://vendor.sierra.ai/webhooks/themis"
  }
}
```

**Status Values:**

| Status | Meaning |
|--------|---------|
| `pending_verification` | Submitted, within SLA window |
| `verifying` | Dike actively checking |
| `verified` | Passed verification, payment cleared |
| `failed` | Failed verification, payment voided |
| `flagged` | Under manual review |
| `disputed` | Vendor filed dispute |

---

### 6. Get Outcome Status

**Endpoint:** `GET /outcomes/{id}`

**Description:** Check verification status of a specific outcome.

**Example Response (Pending):**

```json
{
  "outcome_id": "out_a1b2c3d4e5f6",
  "status": "pending_verification",
  "submitted_at": "2026-07-24T14:32:00Z",

  "verification": {
    "sla_deadline": "2026-07-27T14:32:00Z",
    "hours_elapsed": 48,
    "hours_remaining": 24,
    "polls_completed": 13,
    "checks": {
      "initial_resolution": true,
      "no_reopen_so_far": true,
      "no_human_intervention": true
    }
  }
}
```

**Example Response (Verified):**

```json
{
  "outcome_id": "out_a1b2c3d4e5f6",
  "status": "verified",
  "submitted_at": "2026-07-24T14:32:00Z",
  "verified_at": "2026-07-27T14:32:00Z",

  "verification": {
    "result": "VERIFIED",
    "proof_id": "prf_9c8d7e6f5a4b",
    "sla_window_hours": 72,
    "checks": {
      "initial_resolution": true,
      "no_reopen": true,
      "no_human_intervention": true,
      "final_resolution": true
    }
  },

  "settlement": {
    "status": "cleared",
    "amount": 0.89,
    "currency": "USD",
    "settled_at": "2026-07-27T14:33:00Z",
    "transaction_id": "txn_xyz789"
  },

  "proof": {
    "algorithm": "Ed25519",
    "hash": "sha256:a3f5c7...",
    "signature": "ed25519:def456...",
    "verification_url": "https://verify.ontitled.ai/prf_9c8d7e6f5a4b"
  }
}
```

**Example Response (Failed):**

```json
{
  "outcome_id": "out_a1b2c3d4e5f6",
  "status": "failed",
  "submitted_at": "2026-07-24T14:32:00Z",
  "failed_at": "2026-07-26T08:15:00Z",

  "verification": {
    "result": "FAILED",
    "failure_reason": "Customer reopened ticket within SLA window",
    "failure_timestamp": "2026-07-26T08:15:00Z",
    "polls_completed": 11,
    "checks": {
      "initial_resolution": true,
      "no_reopen": false,
      "no_human_intervention": true,
      "final_resolution": false
    }
  },

  "settlement": {
    "status": "voided",
    "amount": 0.00,
    "reason": "Verification failed"
  }
}
```

---

### 7. Get Dashboard Metrics

**Endpoint:** `GET /dashboard/metrics`

**Description:** Retrieve CFO dashboard metrics.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | date | No | Filter start (default: month start) |
| `end_date` | date | No | Filter end (default: today) |
| `granularity` | string | No | `daily`, `weekly`, `monthly` |

**Example Response:**

```json
{
  "period": {
    "start_date": "2026-07-01",
    "end_date": "2026-07-24",
    "granularity": "daily"
  },

  "summary": {
    "total_spend": 47892.00,
    "budget": 50000.00,
    "variance_percent": -4.2,
    "outcomes_verified": 48376,
    "cost_per_outcome": 0.99
  },

  "contracts": [
    {
      "contract_id": "ctr_7f8a9b2c3d4e",
      "ticker": "UPX-CX-RES-US-L2",
      "quantity_purchased": 20000,
      "quantity_remaining": 15432,
      "progress_percent": 77.0
    },
    {
      "contract_id": "ctr_8g9b0c1d2e3f",
      "ticker": "UPX-CX-RES-EU-L2",
      "quantity_purchased": 10000,
      "quantity_remaining": 8234,
      "progress_percent": 82.3
    }
  ],

  "spend_by_category": [
    {"category": "Support Resolutions", "amount": 32000, "percent": 66.8},
    {"category": "Code Merges", "amount": 12000, "percent": 25.1},
    {"category": "Lead Qualification", "amount": 3892, "percent": 8.1}
  ],

  "verification_trend": [
    {"date": "2026-07-01", "claimed": 2100, "verified": 1985, "rate": 0.945},
    {"date": "2026-07-02", "claimed": 2150, "verified": 2032, "rate": 0.945},
    {"date": "2026-07-03", "claimed": 2080, "verified": 1987, "rate": 0.955}
    // ... more days
  ],

  "recent_activity": [
    {
      "outcome_id": "out_a1b2c3d4e5f6",
      "ticker": "UPX-CX-RES-US-L2",
      "status": "verified",
      "amount": 0.89,
      "timestamp": "2026-07-24T12:00:00Z"
    }
  ]
}
```

---

## Error Codes

### HTTP Status Codes

| Code | Meaning | Typical Cause |
|------|---------|---------------|
| 200 | Success | Request processed |
| 201 | Created | Contract/outcome created |
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Missing/invalid API key |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable | Business logic error |
| 429 | Rate Limited | Too many requests |
| 500 | Server Error | Internal error |
| 503 | Service Unavailable | Temporary outage |

### Error Response Format

```json
{
  "error": {
    "code": "invalid_ticker",
    "message": "The provided ticker is not recognized",
    "details": {
      "ticker": "UPX-UNKNOWN-XYZ",
      "suggestion": "Did you mean UPX-CX-RES-US-L2?"
    },
    "request_id": "req_abc123def456",
    "documentation": "https://docs.ontitled.ai/errors/invalid-ticker"
  }
}
```

### Common Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `invalid_ticker` | Unknown UPX ticker | Check ticker format |
| `invalid_quantity` | Quantity out of range | Use 1-1,000,000 |
| `quote_expired` | Quote no longer valid | Request new quote |
| `contract_inactive` | Contract not active | Check contract status |
| `insufficient_balance` | Contract depleted | Purchase new batch |
| `vendor_not_authorized` | Vendor not on contract | Update contract |
| `verification_in_progress` | Outcome already submitted | Wait for completion |

---

## Rate Limits

### Limits by Plan

| Plan | Requests/Minute | Requests/Hour | Requests/Day |
|------|-----------------|---------------|--------------|
| **Starter** | 60 | 1,000 | 10,000 |
| **Growth** | 300 | 10,000 | 100,000 |
| **Enterprise** | 1,000 | 50,000 | 500,000 |

### Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1626876000
```

### Exceeding Limits

**Response:**
```json
{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded",
    "retry_after": 60
  }
}
```

**Status:** 429 Too Many Requests

---

## Webhooks

### Webhook Events

| Event | Description | Payload |
|-------|-------------|---------|
| `outcome.verified` | Outcome passed verification | Outcome object |
| `outcome.failed` | Outcome failed verification | Outcome object |
| `contract.low_balance` | Contract < 20% remaining | Contract object |
| `contract.depleted` | Contract exhausted | Contract object |
| `quote.expired` | Quote expired | Quote object |

### Webhook Configuration

```bash
curl -X POST https://api.ontitled.ai/v1/webhooks \
  -H "Authorization: Bearer ont_live_..." \
  -d '{
    "url": "https://your-app.com/webhooks/themis",
    "events": ["outcome.verified", "outcome.failed"],
    "secret": "whsec_your_secret"
  }'
```

### Webhook Verification

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

---

## SDKs and Libraries

### Official SDKs

| Language | Package | Installation |
|----------|---------|--------------|
| Python | `ontitled` | `pip install ontitled` |
| JavaScript | `@ontitled/sdk` | `npm install @ontitled/sdk` |
| Go | `github.com/ontitled/go-sdk` | `go get github.com/ontitled/go-sdk` |

### Python Example

```python
from ontitled import ThemisClient

client = ThemisClient(api_key="ont_live_...")

# Get compute prices
prices = client.compute_prices.list()

# Generate quote
quote = client.quotes.create(
    ticker="UPX-CX-RES-US-L2",
    quantity=20000,
    delivery_period={
        "start_date": "2026-10-01",
        "end_date": "2026-12-31"
    }
)

# Create contract
contract = client.contracts.create(quote_id=quote.id)

# Submit outcome (vendor only)
outcome = client.outcomes.submit(
    contract_id=contract.id,
    ticket_id="ZD-18432",
    resolution_type="self_service"
)
```

---

## Next Steps

- **Zendesk integration:** Read [06 - Zendesk Integration](./06-integration-zendesk.md)
- **Vendor integration:** Read [07 - Vendor Integration](./07-integration-vendors.md)
- **System architecture:** Read [08 - System Architecture](./08-architecture.md)

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
