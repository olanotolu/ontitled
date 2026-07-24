# 02 - CFO Dashboard Guide

## Navigating Themis as a Budget Owner

This guide walks through the Themis CFO Dashboard — the primary interface for procurement teams and finance leaders managing AI outcome spend.

---

## Dashboard Overview

### Main Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏛️ THEMIS                                    [Search] [Support] [Profile]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  MONTHLY SPEND OVERVIEW                                             │   │
│  │                                                                     │   │
│  │  This Month: $47,892          Budget: $50,000          Variance: -4%│   │
│  │  [████████████████████████████░░░░░░░░] 95.8% of budget consumed    │   │
│  │                                                                     │   │
│  │  Verified Outcomes: 48,376    Cost per Outcome: $0.99 (target: $1.00)│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────────┐  ┌─────────────────────────────────────────┐ │
│  │  ACTIVE UPX CONTRACTS    │  │  SPEND BY OUTCOME TYPE                  │ │
│  │                          │  │                                         │ │
│  │  • UPX-CX-RES-US-L2      │  │  Support Resolutions  ████████  $32K   │ │
│  │    $0.89/res  (Q3-2026)  │  │  Code Merges          ████      $12K   │ │
│  │    15,432 / 20,000 res   │  │  Lead Qualification   ██        $4K    │ │
│  │                          │  │                                         │ │
│  │  • UPX-CX-RES-EU-L2      │  │  [View Details →]                       │ │
│  │    $1.12/res  (Q3-2026)  │  │                                         │ │
│  │    8,234 / 10,000 res    │  │                                         │ │
│  │                          │  │                                         │ │
│  │  [Request New Batch →]   │  │                                         │ │
│  └──────────────────────────┘  └─────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  VERIFICATION RATE TREND                                            │   │
│  │                                                                     │   │
│  │  98% ┤                                        ╭─╮                   │   │
│  │  96% ┤                              ╭────────╯  ╰──╮               │   │
│  │  94% ┤                    ╭────────╯                 ╰──╮            │   │
│  │  92% ┤          ╭────────╯                              ╰──╮         │   │
│  │  90% ┤╭────────╯                                         ╰────      │   │
│  │      └────────────────────────────────────────────────────────────  │   │
│  │         Jul 1   Jul 7   Jul 14   Jul 21   Jul 28   Aug 4           │   │
│  │                                                                     │   │
│  │  ─── Claimed   ─ ─ Verified    Target: 95%                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  RECENT ACTIVITY                                                    │   │
│  │                                                                     │   │
│  │  ✓ UPX-CX-RES-US-L2 #18432 verified    $0.89    2 hours ago        │   │
│  │  ✓ UPX-CX-RES-US-L2 #18431 verified    $0.89    2 hours ago        │   │
│  │  ✗ UPX-CX-RES-US-L2 #18430 FAILED      $0.00    3 hours ago        │   │
│  │    └─ Reason: Customer reopened within 72h                         │   │
│  │  ✓ UPX-CX-RES-EU-L2 #8234 verified     $1.12    4 hours ago        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Monthly Spend Overview

### Understanding the Numbers

| Metric | Current Value | Interpretation |
|--------|---------------|----------------|
| **This Month** | $47,892 | Actual verified spend (not projected, not requested) |
| **Budget** | $50,000 | Your monthly UPX contract allocation |
| **Variance** | -4% | Under budget (negative = good) |
| **Verified Outcomes** | 48,376 | Number of outcomes that passed Dike verification |
| **Cost per Outcome** | $0.99 | Average cost across all UPX types |

### Reading the Progress Bar

The progress bar shows **actual verified spend** vs. budget:
- **Green zone (< 90%):** On track
- **Yellow zone (90-100%):** Approaching budget limit
- **Red zone (> 100%):** Over budget (not possible with Themis — contracts cap spend)

**Important:** Themis operates on **pre-purchased UPX contracts**. You cannot overspend. The progress bar shows consumption of committed budget, not runaway costs.

### Cost Per Outcome Tracking

**Target:** $1.00 per outcome (set during contract negotiation)
**Actual:** $0.99 per outcome
**Interpretation:** Slightly under target due to routing optimization

The target represents your expected cost based on:
- Contract price per outcome
- Expected verification rate
- Risk-adjusted pricing

If actual cost per outcome is **above** target:
- Verification rates are lower than expected
- Vendors are underperforming
- Themis may be routing to more expensive options due to quality issues

If actual cost per outcome is **below** target:
- Verification rates are higher than expected
- Routing optimization is working
- Vendors are overperforming

---

## Active UPX Contracts

### Contract Card Anatomy

```
┌─────────────────────────────────────┐
│  UPX-CX-RES-US-L2                   │ ← Ticker: Outcome type
│  $0.89/res  (Q3-2026)              │ ← Price & validity period
│                                     │
│  15,432 / 20,000 res               │ ← Consumed / Total
│  [████████████░░░░░░░░] 77%        │ ← Visual consumption
│                                     │
│  [View Details →]                   │
└─────────────────────────────────────┘
```

### Contract States

| State | Visual | Meaning | Action |
|-------|--------|---------|--------|
| **Active** | Green bar | Contract in effect, outcomes being verified | Monitor consumption |
| **Low Balance** | Yellow bar | < 20% remaining | Request new batch |
| **Depleted** | Red bar | 0% remaining | Request renewal immediately |
| **Pending** | Gray bar | Quote requested, not yet active | Wait for vendor confirmation |

### Requesting a New Batch

When a contract runs low:

1. **Click "Request New Batch"**

2. **Specify Requirements:**
   ```
   Outcome Type: UPX-CX-RES-US-L2
   Quantity: 20,000 outcomes
   Delivery Period: Q4 2026 (Oct-Dec)
   Quality SLA: 95% verification rate
   ```

3. **Review Quote** (see Quote Breakdown section)

4. **Accept or Counter**
   - Accept: Contract activates immediately
   - Counter: Submit revised terms, wait for vendor response

---

## Reading Quote Breakdowns

### Sample Quote

```
┌─────────────────────────────────────────────────────────────────────┐
│  UPX CONTRACT QUOTE                                                 │
│  UPX-CX-RES-US-L2 • 20,000 Outcomes • Q4 2026                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PRICING COMPONENTS                                                 │
│  ─────────────────                                                  │
│                                                                     │
│  Base Compute Cost (Ornn)          $0.42    42.0%                   │
│  └─ 0.85 GPU-hours @ $0.49/hr avg                                 │
│                                                                     │
│  Retry/Failure Multiplier          $0.08     8.0%                   │
│  └─ 1.19x historical attempts/outcome                              │
│                                                                     │
│  Verification Cost (Dike)          $0.12    12.0%                   │
│  └─ System polling, cryptographic attestation                       │
│                                                                     │
│  Risk Premium                      $0.05     5.0%                   │
│  └─ Volatility buffer for compute price swings                      │
│                                                                     │
│  Themis Protocol Fee               $0.22    22.0%                   │
│  └─ Routing, settlement, insurance                                │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  TOTAL PER OUTCOME                 $0.89   100.0%                   │
│                                                                     │
│  CONTRACT TOTAL                    $17,800                          │
│  (20,000 outcomes × $0.89)                                         │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  TERMS & CONDITIONS                                                 │
│  ─────────────────                                                  │
│  • Verification Window: 72 hours                                   │
│  • Quality SLA: 95% must pass Dike verification                    │
│  • Payment Terms: Net 30 after verification                        │
│  • Routing: Themis optimizes across Sierra, Intercom, custom      │
│                                                                     │
│  [Accept Quote]    [Counter Offer]    [Decline]                    │
└─────────────────────────────────────────────────────────────────────┘
```

### Understanding Components

#### Base Compute Cost (Ornn)
- **What:** Raw GPU cost to execute the AI work
- **Source:** Real-time Ornn price feed for H100/A100 spot pricing
- **Calculation:** Average GPU-hours per outcome × current spot price
- **Volatility:** Updated hourly based on compute market

#### Retry/Failure Multiplier
- **What:** Cost of failed attempts before success
- **Source:** Historical data from similar outcomes
- **Calculation:** If 19% of attempts fail and require retry, multiplier = 1.19x
- **Transparency:** Based on actual verified history, not estimates

#### Verification Cost (Dike)
- **What:** Cost to independently verify outcomes
- **Includes:**
  - API polling of Zendesk/Salesforce (every outcome)
  - Cryptographic proof generation
  - 72-hour temporal verification
  - Audit trail maintenance
- **Fixed cost:** $0.12 per outcome (example)

#### Risk Premium
- **What:** Buffer for compute price volatility
- **Purpose:** Protects vendor from price spikes during contract period
- **Size:** Typically 3-8% depending on contract duration
- **Rebate:** If compute prices drop, savings may be shared

#### Themis Protocol Fee
- **What:** Platform fee for routing, settlement, and insurance
- **Includes:**
  - Dynamic routing optimization
  - Payment clearing and escrow
  - Performance insurance (SLA guarantees)
  - Analytics and reporting
- **Value:** Ensures outcomes are verified and vendors are reliable

### Comparing Quotes

When evaluating quotes from multiple vendors (via Themis):

| Vendor | Price | Verification Rate | True Cost |
|--------|-------|-------------------|-----------|
| A | $0.75 | 85% | $0.88 |
| B | $0.89 | 95% | $0.94 |
| C | $1.00 | 98% | $1.02 |

**True Cost = Price ÷ Verification Rate**

Vendor A appears cheapest but has lower verification. Vendor B offers the best value.

**Themis advantage:** Routing automatically optimizes for true cost, not sticker price.

---

## Verification Rates

### Verification Rate Trend Chart

The chart shows two lines:
- **Solid line (—):** Outcomes claimed by vendors
- **Dashed line (- -):** Outcomes verified by Dike

The gap between lines represents **failure rate** (claims that didn't verify).

### Interpreting Trends

| Pattern | Meaning | Action |
|---------|---------|--------|
| **Both lines flat and close** | Stable, reliable performance | Maintain current contracts |
| **Verification line drops** | Quality issues emerging | Review vendor performance |
| **Gap widening** | Vendor over-claiming | Negotiate terms or switch vendor |
| **Both lines rising** | Scale increasing | Consider volume discounts |

### Target: 95% Verification Rate

Industry benchmark for customer support:
- **95%+:** Excellent, no action needed
- **90-95%:** Acceptable, monitor closely
- **85-90%:** Concerning, vendor discussion required
- **< 85%:** Unacceptable, consider contract termination

### Why Verification Rates Matter

Each unverified outcome represents:
- **Customer impact:** Issue not actually resolved
- **Cost impact:** You paid for work that failed
- **Vendor accountability:** Performance data for future routing

**Themis protection:** Failed verifications = no payment to vendor.

---

## Recent Activity Feed

### Activity Types

| Icon | Type | Meaning |
|------|------|---------|
| ✓ | Verified | Outcome passed Dike verification, payment cleared |
| ✗ | Failed | Outcome failed verification, payment voided |
| ⏳ | Pending | Outcome claimed, within 72-hour verification window |
| ⚠️ | Disputed | Vendor challenging verification result |

### Reading Activity Details

```
✗ UPX-CX-RES-US-L2 #18430 FAILED      $0.00    3 hours ago
  └─ Reason: Customer reopened within 72h
```

**What happened:**
- Ticket #18430 was marked resolved by AI vendor
- Dike detected reopen within 72-hour window
- Verification FAILED
- No payment to vendor
- Ticket likely requires human attention

**Why this matters:**
- Vendor incentive: Fix root cause to get paid
- Your cost: $0 (not charged for failed outcome)
- Quality insight: Vendor may be closing tickets prematurely

---

## Key Workflows

### Monthly Close Process

1. **Review Spend Overview** (first business day of month)
   - Verify previous month's spend matches accruals
   - Check variance vs. budget

2. **Analyze Verification Rates**
   - Review trend chart for quality issues
   - Identify underperforming vendors

3. **Reconcile Contracts**
   - Confirm outcome counts match vendor invoices
   - Verify Themis settled amounts

4. **Plan Next Month**
   - Check contract balances
   - Request new batches if needed
   - Adjust budget forecasts

### Vendor Performance Review

**Quarterly:**
1. Export verification rate data by vendor
2. Calculate true cost per outcome
3. Compare to contract SLA commitments
4. Renegotiate terms or switch vendors

**Themis data exports:** Available in CSV/Excel format

### Budget Planning

**Annual:**
1. Project outcome volume (support tickets, etc.)
2. Review UPX price trends
3. Lock in annual contracts for volume discounts
4. Set monthly budgets in Themis dashboard

**Themis advantage:** Fixed per-outcome pricing eliminates forecasting risk.

---

## Notifications and Alerts

### Alert Types

| Alert | Trigger | Action |
|-------|---------|--------|
| **Low Balance** | Contract < 20% remaining | Request new batch |
| **Verification Drop** | Rate falls below SLA | Contact vendor |
| **Price Spike** | Ornn compute prices +20% | Review routing |
| **Contract Expiry** | < 30 days to expiration | Renew or replace |
| **Dispute Filed** | Vendor challenges verification | Review case |

### Setting Alert Preferences

```
Settings → Notifications
☑️ Email alerts for low balance
☑️ SMS alerts for verification drops
☐ Slack integration
☑️ Weekly digest email
☐ Real-time for every outcome
```

---

## FAQ — Dashboard

**Q: Can I overspend my budget?**
A: No. Themis operates on pre-purchased contracts. Once depleted, no more outcomes can be submitted until you purchase a new batch.

**Q: What if verification rates are consistently below SLA?**
A: Themis automatically routes fewer outcomes to underperforming vendors. If SLA breaches persist, you can terminate the contract without penalty.

**Q: How often are quotes updated?**
A: Quotes reflect real-time Ornn compute pricing and are valid for 24 hours. After 24 hours, request a refreshed quote.

**Q: Can I export data for my ERP/GL?**
A: Yes. Themis provides CSV exports and API access for integration with SAP, NetSuite, and other ERP systems.

**Q: Who do I contact for support?**
A: In-dashboard chat (fastest), email support@ontitled.ai, or schedule a call with your account manager.

---

## Next Steps

- **Understand pricing:** Read [03 - Pricing & Routing Mathematics](./03-pricing-mathematics.md)
- **Deep dive on verification:** Read [04 - Dike Verification Protocol](./04-dike-protocol.md)
- **API integration:** Read [05 - API Reference](./05-api-reference.md)

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
