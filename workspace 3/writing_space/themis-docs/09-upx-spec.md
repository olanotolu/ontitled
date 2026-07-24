# 09 - UPX Contract Specification

## Universal Product Exchange (UPX) Standard

This document defines the UPX contract specification — the standardized format for machine labor outcomes.

---

## Overview

### What is UPX?

**UPX (Universal Product Exchange)** is a standardized contract format for AI-generated work outcomes. It provides:

- **Standardization:** Common language for buying/selling AI work
- **Composability:** Building blocks for complex workflows
- **Tradeability:** Contracts can be priced, routed, and settled
- **Extensibility:** New outcome types can be added

### UPX Ticker Format

```
UPX-[DOMAIN]-[TASK]-[REGION]-[COMPLEXITY]-[QUALITY]-[WINDOW]
```

| Component | Description | Examples |
|-----------|-------------|----------|
| **UPX** | Universal Product Exchange prefix | Always "UPX" |
| **DOMAIN** | Business domain | CX, SWE, SALES, FIN |
| **TASK** | Specific task type | RES, ISS, QUAL, AP |
| **REGION** | Geographic/compliance zone | US, EU, APAC, GLB |
| **COMPLEXITY** | Task difficulty level | L1, L2, L3, L4 |
| **QUALITY** | Quality threshold (optional) | Q90, Q95, Q99 |
| **WINDOW** | SLA window hours (optional) | 24H, 72H, 168H |

---

## Standard Outcome Types

### Customer Experience (CX)

#### UPX-CX-RES-{REGION}-{COMPLEXITY}

**Customer Support Resolution**

| Attribute | Description |
|-----------|-------------|
| **Task** | Resolve customer support ticket |
| **Input** | Customer question/issue |
| **Output** | Resolved ticket (no reopen within SLA) |
| **Complexity** | L1=Simple, L2=Technical, L3=Complex, L4=Escalation |

**Example:** `UPX-CX-RES-US-L2`

*Level-2 technical support case resolved in US region.*

**Verification Criteria:**
- Ticket marked "solved" in system of record
- No customer reopen within 72 hours
- No human agent intervention post-resolution

**Typical Price Range:** $0.50 - $2.00 per outcome

---

### Software Engineering (SWE)

#### UPX-SWE-ISS-{REGION}-{COMPLEXITY}

**GitHub/Jira Issue Resolution**

| Attribute | Description |
|-----------|-------------|
| **Task** | Close software issue via PR |
| **Input** | Bug report or feature request |
| **Output** | Merged PR, closed issue, passing CI |
| **Complexity** | L1=Docs, L2=Bugfix, L3=Feature, L4=Architecture |

**Example:** `UPX-SWE-ISS-GLB-L2`

*Global bugfix issue resolved via PR merge.*

**Verification Criteria:**
- PR merged to main branch
- CI/CD tests passing
- Issue closed
- No revert within 72 hours

**Typical Price Range:** $5.00 - $50.00 per outcome

#### UPX-SWE-PR-{REGION}-{COMPLEXITY}

**Pull Request Review**

| Attribute | Description |
|-----------|-------------|
| **Task** | Review and approve PR |
| **Input** | Pull request |
| **Output** | Approved PR with comments |
| **Complexity** | L1=Typo, L2=Logic, L3=Architecture, L4=Security |

**Verification Criteria:**
- PR approved by AI reviewer
- Human review confirms quality (spot check)
- No critical issues found post-merge

---

### Sales (SALES)

#### UPX-SALES-QUAL-{REGION}-{COMPLEXITY}

**Lead Qualification**

| Attribute | Description |
|-----------|-------------|
| **Task** | Qualify sales lead |
| **Input** | Lead form, email, or call transcript |
| **Output** | Qualified lead in CRM |
| **Complexity** | L1=Auto-qualify, L2=Research, L3=Outreach, L4=Demo |

**Example:** `UPX-SALES-QUAL-US-L2`

*US lead qualification with research component.*

**Verification Criteria:**
- Lead marked "qualified" in CRM
- Required fields populated
- Contact information validated
- Sales rep accepts handoff

**Typical Price Range:** $1.00 - $10.00 per outcome

---

### Finance (FIN)

#### UPX-FIN-AP-{REGION}-{COMPLEXITY}

**Accounts Payable Processing**

| Attribute | Description |
|-----------|-------------|
| **Task** | Process invoice for payment |
| **Input** | Vendor invoice |
| **Output** | Approved invoice in AP system |
| **Complexity** | L1=Standard, L2=Exception, L3=Dispute, L4=International |

**Verification Criteria:**
- Invoice entered in AP system
- PO matching complete
- Approval workflow complete
- No rejection within SLA

---

### Data Operations (DATA)

#### UPX-DATA-EXT-{REGION}-{COMPLEXITY}

**Data Extraction**

| Attribute | Description |
|-----------|-------------|
| **Task** | Extract structured data from documents |
| **Input** | PDF, image, or unstructured document |
| **Output** | Structured data record |
| **Complexity** | L1=Single field, L2=Form, L3=Table, L4=Complex doc |

**Verification Criteria:**
- Data record created in target system
- Validation rules pass
- Human audit sample (1%) confirms accuracy

**Typical Price Range:** $0.05 - $0.50 per outcome

---

## Contract Parameters

### UPX Contract Schema

```json
{
  "upx_contract": {
    "version": "1.0",
    "contract_id": "ctr_7f8a9b2c3d4e",

    "ticker": {
      "full": "UPX-CX-RES-US-L2-Q95-72H",
      "components": {
        "domain": "CX",
        "task": "RES",
        "region": "US",
        "complexity": "L2",
        "quality": "Q95",
        "window": "72H"
      }
    },

    "outcome_definition": {
      "description": "Level-2 US customer support case correctly resolved",
      "input_spec": "Customer ticket with technical question",
      "output_spec": "Resolved ticket, no reopen within 72h",
      "acceptance_criteria": [
        "Ticket status = 'solved'",
        "No customer reopen within 72 hours",
        "No human agent post-resolution"
      ]
    },

    "delivery_terms": {
      "quantity": 20000,
      "period": {
        "start_date": "2026-10-01",
        "end_date": "2026-12-31"
      },
      "quality_sla": 0.95,
      "sla_window_hours": 72
    },

    "pricing": {
      "price_per_outcome": 0.89,
      "currency": "USD",
      "total_value": 17800.00,

      "breakdown": {
        "base_compute": 0.42,
        "retry_multiplier": 0.08,
        "verification_cost": 0.12,
        "risk_premium": 0.05,
        "themis_fee": 0.22
      }
    },

    "verification": {
      "method": "dike_protocol",
      "system_of_record": "zendesk",
      "checks": [
        "state_delta",
        "temporal",
        "cryptographic"
      ]
    },

    "routing": {
      "method": "themis_optimized",
      "allowed_vendors": ["sierra", "intercom", "custom_001"],
      "constraints": {
        "max_per_vendor": 0.50,
        "min_quality": 0.95
      }
    },

    "settlement": {
      "payment_terms": "net_30",
      "currency": "USD",
      "method": "ach_debit"
    }
  }
}
```

### Required Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ticker` | string | Yes | UPX ticker identifier |
| `quantity` | integer | Yes | Number of outcomes |
| `period.start_date` | date | Yes | Contract start |
| `period.end_date` | date | Yes | Contract end |
| `price_per_outcome` | float | Yes | Price in USD |
| `quality_sla` | float | Yes | Minimum verification rate |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sla_window_hours` | integer | 72 | Verification window |
| `allowed_vendors` | array | all | Vendor whitelist |
| `routing_constraints` | object | {} | Routing rules |
| `payment_terms` | string | "net_30" | Payment timing |

---

## Domain Definitions

### Domain: CX (Customer Experience)

**Tasks:**
| Code | Task | Description |
|------|------|-------------|
| RES | Resolution | Resolve support ticket |
| TRI | Triage | Categorize and route ticket |
| ESC | Escalation | Prepare escalation summary |
| FUP | Follow-up | Post-resolution follow-up |

**Complexity Levels:**
| Level | Description | Examples |
|-------|-------------|----------|
| L1 | Simple inquiries | Password reset, account info |
| L2 | Technical issues | Integration help, troubleshooting |
| L3 | Complex problems | Custom configurations, edge cases |
| L4 | Expert required | Architecture, security, compliance |

### Domain: SWE (Software Engineering)

**Tasks:**
| Code | Task | Description |
|------|------|-------------|
| ISS | Issue | Resolve GitHub/Jira issue |
| PR | Pull Request | Review and approve PR |
| DOC | Documentation | Write or update docs |
| TEST | Testing | Generate or run tests |

**Complexity Levels:**
| Level | Description | Examples |
|-------|-------------|----------|
| L1 | Documentation | Typo fixes, comment updates |
| L2 | Bugfix | Simple bug fixes |
| L3 | Feature | New functionality |
| L4 | Architecture | System design, refactoring |

### Domain: SALES

**Tasks:**
| Code | Task | Description |
|------|------|-------------|
| QUAL | Qualification | Qualify inbound lead |
| OUT | Outreach | Cold outreach and follow-up |
| DEM | Demo | Deliver product demo |
| PRO | Proposal | Generate sales proposal |

### Domain: FIN (Finance)

**Tasks:**
| Code | Task | Description |
|------|------|-------------|
| AP | Accounts Payable | Process vendor invoices |
| AR | Accounts Receivable | Send customer invoices |
| REC | Reconciliation | Reconcile accounts |
| AUD | Audit | Prepare audit documentation |

### Domain: DATA

**Tasks:**
| Code | Task | Description |
|------|------|-------------|
| EXT | Extraction | Extract data from documents |
| TRANS | Transformation | Transform data formats |
| LOAD | Loading | Load data to target system |
| VAL | Validation | Validate data quality |

---

## Region Codes

| Code | Region | Compliance |
|------|--------|------------|
| US | United States | SOC 2, CCPA |
| EU | European Union | GDPR |
| UK | United Kingdom | UK GDPR |
| CA | Canada | PIPEDA |
| APAC | Asia-Pacific | Varies by country |
| GLB | Global | Highest common standard |

---

## Quality Levels

| Code | Verification Rate | Use Case |
|------|-------------------|----------|
| Q90 | 90% | High volume, cost-sensitive |
| Q95 | 95% | Standard enterprise |
| Q98 | 98% | Critical applications |
| Q99 | 99% | Financial, medical, legal |

---

## SLA Windows

| Code | Hours | Use Case |
|------|-------|----------|
| 24H | 24 | Fast-cycle tasks |
| 72H | 72 | Standard support (default) |
| 168H | 168 | Enterprise/complex tasks |
| 720H | 720 | Monthly verification |

---

## Extending UPX

### Adding New Domains

**Proposal Process:**
1. Submit proposal to standards@ontitled.ai
2. Include: domain definition, task types, verification criteria
3. Community review period: 30 days
4. Voting by UPX Governance Council
5. If approved: added to specification

**Example Proposal:**
```json
{
  "proposal": {
    "domain": "LEGAL",
    "name": "Legal Operations",
    "tasks": [
      {
        "code": "CON",
        "name": "Contract Review",
        "description": "Review and summarize contracts"
      }
    ],
    "justification": "Legal teams spend $X annually on contract review"
  }
}
```

### Adding New Tasks

Within existing domains, new tasks can be proposed:

**Example: Adding UPX-CX-SUR (Survey)**
```json
{
  "task_proposal": {
    "domain": "CX",
    "code": "SUR",
    "name": "Survey Analysis",
    "description": "Analyze customer survey responses",
    "verification_criteria": [
      "All responses categorized",
      "Sentiment scores assigned",
      "Summary report generated"
    ]
  }
}
```

### Custom Extensions

Organizations can create private UPX extensions:

**Format:** `UPX-{DOMAIN}-{TASK}-{ORG}-{REGION}`

**Example:** `UPX-CX-RES-ACME-US`

*ACME-specific support resolution process.*

**Requirements:**
- Must register with Themis
- Must define verification criteria
- May not conflict with standard tickers

---

## Example Contracts

### Example 1: Standard Support Contract

```json
{
  "ticker": "UPX-CX-RES-US-L2",
  "quantity": 50000,
  "period": "Q4-2026",
  "price": 0.89,
  "quality_sla": 0.95
}
```

**Summary:** 50,000 US Level-2 support resolutions at $0.89 each, 95% verification rate.

### Example 2: Premium Engineering Contract

```json
{
  "ticker": "UPX-SWE-ISS-GLB-L3-Q98-168H",
  "quantity": 1000,
  "period": "Annual",
  "price": 45.00,
  "quality_sla": 0.98
}
```

**Summary:** 1,000 global Level-3 engineering issues at $45 each, 98% verification, 7-day SLA window.

### Example 3: High-Volume Data Contract

```json
{
  "ticker": "UPX-DATA-EXT-US-L1",
  "quantity": 1000000,
  "period": "Monthly",
  "price": 0.05,
  "quality_sla": 0.90
}
```

**Summary:** 1M US Level-1 data extractions at $0.05 each, 90% verification (high volume, lower quality acceptable).

---

## Validation Rules

### Ticker Validation

```python
import re

UPX_PATTERN = re.compile(
    r'^UPX-([A-Z]{2,})-([A-Z]{2,})-([A-Z]{2,})-L([1-4])'
    r'(-Q([0-9]{2}))?(-([0-9]+H))?$'
)

def validate_ticker(ticker):
    match = UPX_PATTERN.match(ticker)
    if not match:
        return False, "Invalid ticker format"

    domain, task, region, complexity, _, quality, _, window = match.groups()

    # Validate domain exists
    if domain not in VALID_DOMAINS:
        return False, f"Unknown domain: {domain}"

    # Validate task exists in domain
    if task not in VALID_TASKS[domain]:
        return False, f"Unknown task {task} for domain {domain}"

    # Validate region
    if region not in VALID_REGIONS:
        return False, f"Unknown region: {region}"

    # Validate quality if present
    if quality and int(quality) not in [90, 95, 98, 99]:
        return False, f"Invalid quality level: {quality}"

    return True, "Valid"
```

### Contract Validation

```python
def validate_contract(contract):
    errors = []

    # Required fields
    required = ['ticker', 'quantity', 'period', 'price_per_outcome']
    for field in required:
        if field not in contract:
            errors.append(f"Missing required field: {field}")

    # Quantity range
    if contract.get('quantity', 0) < 1:
        errors.append("Quantity must be >= 1")
    if contract.get('quantity', 0) > 10000000:
        errors.append("Quantity must be <= 10,000,000")

    # Price validation
    price = contract.get('price_per_outcome', 0)
    if price <= 0:
        errors.append("Price must be > 0")
    if price > 10000:
        errors.append("Price must be <= $10,000")

    # Period validation
    start = contract.get('period', {}).get('start_date')
    end = contract.get('period', {}).get('end_date')
    if start and end:
        if start >= end:
            errors.append("Start date must be before end date")

    # Quality SLA
    sla = contract.get('quality_sla', 0)
    if sla < 0.5 or sla > 1.0:
        errors.append("Quality SLA must be between 0.5 and 1.0")

    return len(errors) == 0, errors
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-21 | Initial specification |
| 1.1 | Planned | Add LEGAL domain |
| 1.2 | Planned | Add HEALTH domain |

---

## Governance

### UPX Standards Committee

**Members:**
- Ontitled (chair)
- 3 Enterprise buyers
- 3 AI vendors
- 1 Independent expert

**Responsibilities:**
- Review and approve new domains/tasks
- Maintain specification
- Resolve disputes
- Set quality standards

### Proposal Process

```
Proposal → Discussion (14 days) → Vote (7 days) → Implementation
```

**Voting:**
- 2/3 majority required for approval
- All committee members vote
- Abstentions allowed

---

## Next Steps

- **Glossary:** Read [10 - Glossary & FAQ](./10-glossary-faq.md)
- **API reference:** Read [05 - API Reference](./05-api-reference.md)
- **Integration guides:** Read [06](./06-integration-zendesk.md) and [07](./07-integration-vendors.md)

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
