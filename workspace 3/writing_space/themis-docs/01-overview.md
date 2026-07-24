# 01 - Product Overview

## What is Themis?

**Themis is the financial clearinghouse and settlement layer for AI-generated work.**

Instead of paying AI vendors for tokens consumed, compute hours used, or API calls made, Themis enables enterprises to pay for **verified outcomes**: support tickets resolved, code merged, leads qualified.

Themis handles three functions:
1. **Pricing:** UPX contracts quote flat, upfront prices for specific outcomes
2. **Routing:** Dynamic allocation of work to optimal AI vendors
3. **Settlement:** Payment cleared only after independent verification

---

## The Problem: Paying for Waste

### Current AI Billing is Broken

Today's AI vendors charge for **consumption**, not **production**:

| Billing Model | The Problem |
|--------------|-------------|
| **Per-token** | Agent loops infinitely → You pay for every token |
| **Per-request** | Agent hallucinates → You pay for garbage output |
| **Per-compute-hour** | Agent fails silently → You pay for wasted GPU time |
| **Per-seat** | Agent never used → You pay anyway |

**Real example:** A customer support agent might:
1. Call 5 different LLMs
2. Self-correct 20 times
3. Iterate for 3 minutes
4. Finally provide an answer

**You pay for all 5 LLM calls, all 20 corrections, all 3 minutes.** The vendor pays only for the final answer.

### The Gap: No Independent Verification

AI vendors currently:
- Define their own success metrics
- Grade their own homework
- Bill regardless of outcome quality

Enterprises have no neutral third party to verify that billed work was actually completed.

---

## The Solution: Outcome-Based Settlement

### How Themis Works

```
┌─────────────────────────────────────────────────────────────────┐
│                         ENTERPRISE                              │
│                    (CFO/Procurement)                            │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ 1. Request UPX Quote
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         THEMIS                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Pricing    │  │   Routing    │  │  Settlement  │          │
│  │    Engine    │→ │    Engine    │→ │    Engine    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ 2. Route to AI Vendor
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI VENDOR                                  │
│              (Sierra, Intercom, Custom)                         │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ 3. Execute Work
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DIKE                                    │
│              (Independent Verification)                         │
│                                                                 │
│  • Check Zendesk/Salesforce          • Verify no reopen         │
│  • Confirm state changes             • 72-hour SLA window       │
│  • Cryptographic audit trail         • Dispute resolution       │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ 4. Verification Result
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         THEMIS                                  │
│                    (Clear Payment)                              │
│                                                                 │
│  ✓ VERIFIED → Release payment to vendor                         │
│  ✗ FAILED → Void contract, vendor absorbs cost                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Concepts

#### UPX Contracts (Universal Product Exchange)

A UPX contract is a standardized agreement for a specific unit of AI work.

**Format:** `UPX-[DOMAIN]-[TASK]-[REGION]-[COMPLEXITY]`

| Component | Example | Meaning |
|-----------|---------|---------|
| **UPX** | UPX | Universal Product Exchange |
| **DOMAIN** | CX | Customer Experience |
| **TASK** | RES | Resolution |
| **REGION** | US | United States |
| **COMPLEXITY** | L2 | Level 2 (technical) |

**Example:** `UPX-CX-RES-US-L2`

*One Level-2 US customer support case correctly resolved.*

**What's included:**
- Ticket analysis and categorization
- Response generation
- Customer communication
- Resolution confirmation
- 72-hour no-reopen guarantee

**What's NOT included:**
- Hardware costs
- Token consumption
- Failed attempts
- Hallucinations

#### Dike Verification Protocol

Dike is the independent verification layer. It answers: **"Was the work actually done?"**

Dike checks:
1. **State Delta:** Did the ticket status change to "Resolved" in Zendesk?
2. **Temporal Verification:** Did the ticket stay closed for 72 hours?
3. **Human Intervention:** Did any human agent touch the ticket post-resolution?
4. **Cryptographic Proof:** Immutable audit trail of verification

**Key principle:** Dike reads from the enterprise's system of record. It does not trust the vendor's self-report.

#### Outcome-Based Pricing

Traditional: Pay for inputs (tokens, compute, API calls)
Themis: Pay for outputs (verified outcomes)

**Example comparison:**

| Metric | Traditional Billing | Themis Billing |
|--------|---------------------|----------------|
| **Unit** | 1M tokens consumed | 1,000 tickets resolved |
| **Price** | $0.01 per 1K tokens | $0.99 per resolution |
| **Agent loops 5x** | You pay 5x | You pay 1x |
| **Agent hallucinates** | You pay | Vendor absorbs cost |
| **Total cost** | Variable, unpredictable | Fixed, upfront |

---

## Who Should Use Themis?

### Primary Users

#### CFOs and Finance Teams
**Pain point:** Unpredictable AI spend, unclear ROI, budget overruns
**Themis value:** Fixed-cost outcome contracts, verified spend, predictable budgeting

#### Procurement Teams
**Pain point:** Vendor evaluation complexity, contract negotiation, performance disputes
**Themis value:** Standardized UPX contracts, independent verification, automated settlement

#### VP of Customer Experience
**Pain point:** Support costs scaling with volume, quality inconsistency
**Themis value:** Cost-per-resolution visibility, vendor optimization, SLA enforcement

#### VP of Engineering
**Pain point:** AI agent reliability, debugging cost overruns
**Themis value:** Verified outcomes, performance analytics, vendor comparison

### Ideal Customer Profile

**Company size:** $50M-$5B ARR
**AI spend:** $500K-$50M annually
**Use case:** Customer support, content moderation, data processing, code review
**Pain level:** High frustration with current AI billing models
**Tech maturity:** Uses Zendesk, Salesforce, or similar systems of record

---

## Value Proposition

### For CFOs: Cost Predictability

**Before Themis:**
- Q3 AI budget: $500K
- Actual spend: $890K (178% over budget)
- Explanation: "Usage was higher than expected"

**With Themis:**
- UPX contract: 100,000 resolutions at $0.99 each
- Total cost: $99,000 (locked in upfront)
- Variance: $0

### For Procurement: Vendor Optimization

**Before Themis:**
- Vendor A: $0.008 per token
- Vendor B: $0.012 per token
- Which is cheaper? Depends on usage, implementation, quality...

**With Themis:**
- UPX-CX-RES-US-L2 spot price: $0.89 per resolution
- Themis routes to optimal vendor automatically
- Verified cost-per-outcome: Transparent

### For Operations: Quality Assurance

**Before Themis:**
- Vendor claims 95% resolution rate
- No independent verification
- Customers complain, but tickets show "resolved"

**With Themis:**
- Dike verifies: Only 78% actually resolved (no reopen, no human fix)
- Vendor performance: Transparent
- Payment: Adjusted to actual verified rate

---

## Themis vs. Alternatives

| Capability | Traditional AI APIs | AI Agents (Sierra, etc.) | Themis |
|------------|---------------------|--------------------------|--------|
| **Billing** | Per token/request | Per resolution (self-reported) | Per verified outcome |
| **Verification** | None | Self-reported | Independent (Dike) |
| **Pricing** | Variable | Opaque | Fixed, upfront |
| **Routing** | Manual | Vendor-controlled | Themis-optimized |
| **Settlement** | Immediate | Vendor discretion | Conditional on verification |

### Themis vs. Ship (Thesean)

**Ship:** Optimizes input layer — how to execute a request cheaper
**Themis:** Optimizes output layer — verify what was actually achieved

Ship makes tokens cheaper. Themis makes outcomes trustworthy.

### Themis vs. Braintrust

**Braintrust:** Evaluates AI quality during development
**Themis:** Verifies AI outcomes in production and settles payment

Braintrust is upstream (evaluation). Themis is downstream (settlement).

---

## Getting Started

### Step 1: Understand Your Current Spend

Request a free AI Spend Audit from Themis:
- Provide 90 days of support ticket history
- Provide AI vendor invoices for same period
- Themis independently verifies actual resolution rates
- Receive report: "You paid $X for Y actual resolutions"

### Step 2: Pilot with UPX-CX-RES-US-L2

Start with the most common use case:
- US customer support tickets
- Level 2 (technical) complexity
- Zendesk integration
- 72-hour verification window

### Step 3: Expand to Additional Outcome Types

Once pilot succeeds, add:
- UPX-CX-RES-EU-L2 (European support)
- UPX-DEV-PR-MR (code merge requests)
- UPX-SALES-QUAL (lead qualification)
- Custom UPX contracts for your workflows

---

## Next Steps

- **CFOs:** Read [02 - CFO Dashboard Guide](./02-cfo-dashboard.md)
- **Engineers:** Read [05 - API Reference](./05-api-reference.md)
- **Integrators:** Read [06 - Zendesk Integration](./06-integration-zendesk.md)

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
