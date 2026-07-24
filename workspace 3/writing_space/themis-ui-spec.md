# Themis CFO Dashboard UI/UX Specification

## Business Outcome Platform for Procurement Leaders

**Version:** MVP 1.0
**Date:** July 22, 2026
**Status:** Design Specification for Implementation

---

## Executive Summary

### The Problem with Current Dashboard

The existing Ontitled dashboard (Screenshot 1) positions the product as an **AI model provider**:
- Navigation: Projects, Sessions, Playground, API Keys, Loss Functions, Clock Cycles
- Content: "Tinker SDK", "Models & Pricing", training sessions
- User: Developer/ML Engineer

The Thesean Ship dashboard (Screenshot 2) shows **infrastructure metrics**:
- Total Cost, Total Queries, Input/Output Tokens
- Daily usage charts
- User: Engineering manager optimizing compute

### The Required Shift

**From:** AI infrastructure dashboard (tokens, models, training)
**To:** Business outcome platform (verified results, cost predictability, procurement)

**Primary User:** CFO / VP Procurement (budget owner, not engineer)
**Primary Metric:** Cost per verified outcome (not tokens consumed)
**Primary Action:** Lock in flat-rate outcome contracts (not manage API keys)

---

## SECTION 1: Dashboard Layout & Navigation

### Current vs. Proposed Navigation

```
CURRENT (Developer-Focused)          PROPOSED (CFO-Focused)
─────────────────────────────        ─────────────────────────────
Home                                 Overview ✓ [default landing]
Projects                             UPX Contracts [contract mgmt]
Sessions                             Outcomes [verification feed]
Playground                           Savings [cost analysis]
Docs                                 Reports [procurement docs]
Manage                               Vendors [AI supplier mgmt]
API Keys                             Settings [org config]
Settings
Admin
Team
Workspace
Usage
Billing
```

### Rationale for Navigation Changes

| Remove | Reason |
|--------|--------|
| **Projects** | CFOs don't manage ML projects |
| **Sessions** | Training sessions are irrelevant to procurement |
| **Playground** | Model testing is pre-purchase activity |
| **API Keys** | Credentials management is IT, not finance |
| **Loss Functions** | Pure ML engineering concept |
| **Clock Cycles** | Infrastructure detail, not business outcome |

| Add | Reason |
|-----|--------|
| **Overview** | At-a-glance performance for executives |
| **UPX Contracts** | Core procurement activity — buying outcomes |
| **Outcomes** | Verification transparency builds trust |
| **Savings** | ROI proof for continued investment |
| **Reports** | Procurement documentation, audits |
| **Vendors** | Supplier relationship management |

### Navigation Component Specification

```
┌─────────────────────────────────────────────────────────────────┐
│  [⚖️ Themis Logo]          Overview | Contracts | Outcomes      │
│                            Savings | Reports | Vendors         │
│                                                                    │
│                                              [🔔] [👤 Profile]   │
└─────────────────────────────────────────────────────────────────┘

Logo: ⚖️ Scales icon + "Themis" wordmark in Inter Bold
Active nav item: #0A2540 (navy) underline
Inactive nav item: #6B7280 (gray)
Hover: #00D4AA (teal) transition
```

---

## SECTION 2: Overview Page (Default Landing)

### Current State Analysis

**Screenshot 1 shows:**
- "Introducing Themis" hero card about "open weights"
- Empty state: "Your training sessions will appear here"
- Empty state: "Your API keys will appear here"
- Links to Tinker SDK, Models & Pricing, Sessions

**Problem:** No business value visible. CFO sees nothing relevant to their job.

### Proposed: Monthly Performance Hero

```
┌─────────────────────────────────────────────────────────────────┐
│  THIS MONTH'S PERFORMANCE                    [Export Report ↓]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │               │  │               │  │               │       │
│  │   $127,450    │  │    94.3%      │  │    $1.23      │       │
│  │               │  │               │  │               │       │
│  │   BUDGET USED │  │  VERIFIED     │  │  PER OUTCOME  │       │
│  │               │  │  SUCCESS RATE │  │  (avg)        │       │
│  │   / $150,000  │  │               │  │               │       │
│  │               │  │               │  │               │       │
│  │  [████████░░░]│  │   ↑ 1.6%      │  │   ↓ 31%       │       │
│  │    85%        │  │   vs last mo  │  │   vs vendor   │       │
│  │               │  │               │  │   pricing     │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  💡 Key Insight                                             │ │
│  │  "You saved $42,350 vs. your previous vendor billing by     │ │
│  │   verifying outcomes before payment."                       │ │
│  │                                                             │ │
│  │  [View Savings Breakdown →]                                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Component Specifications:**

| Element | Style | Rationale |
|---------|-------|-----------|
| **Card Background** | White #FFFFFF, shadow 0 2px 8px rgba(0,0,0,0.08) | Elevated from page |
| **Large Numbers** | 48px Inter Bold, #0A2540 | Primary attention |
| **Labels** | 14px Inter Medium, #6B7280 | Context without competing |
| **Progress Bar** | Height 8px, border-radius 4px, fill #00D4AA | Visual progress |
| **Trend Arrows** | ↑↓ with %, green/red color | Instant performance read |
| **Insight Box** | Light blue background #F0F9FF, left border 4px #00D4AA | Highlight value |

### Active Contracts Section

```
┌─────────────────────────────────────────────────────────────────┐
│  ACTIVE UPX CONTRACTS                        [+ New Contract]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  UPX-CX-RES-US                                     [LIVE]   │ │
│  │  US Customer Support Resolutions (L1-L2)                    │ │
│  │                                                             │ │
│  │  ─────────────────────────────────────────────────────────  │ │
│  │                                                             │ │
│  │  Quantity:    50,000 / 75,000 outcomes delivered            │ │
│  │               [████████████████████░░░░░░░░░░░░░░] 67%      │ │
│  │                                                             │ │
│  │  Flat Rate:   $1.47 per outcome (locked)                    │ │
│  │  Verified:    94.3% (47,150 of 50,000)                      │ │
│  │  Failed:      5.7% (2,850) — you didn't pay for these       │ │
│  │                                                             │ │
│  │  ─────────────────────────────────────────────────────────  │ │
│  │  Current Routing: 67% Claude-4, 23% GPT-5.6, 10% Other      │ │
│  │  Spot Compute (Ornn): $0.00012/token (H100 cluster)         │ │
│  │                                                             │ │
│  │  [View Details]  [Extend Contract]  [Download Invoice]      │ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  UPX-CX-RES-EU                                    [DRAFT]   │ │
│  │  EU Customer Support Resolutions (GDPR-compliant)           │ │
│  │                                                             │ │
│  │  Quote pending your approval — $1.62 per outcome            │ │
│  │  Estimated annual value: $97,200                            │ │
│  │                                                             │ │
│  │  [Review Quote]  [Approve]  [Reject]  [Request Changes]     │ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Contract Card States:**

| State | Badge | Background | Actions |
|-------|-------|------------|---------|
| **LIVE** | Green badge | White | View, Extend, Invoice |
| **DRAFT** | Yellow badge | Light yellow tint | Review, Approve, Reject |
| **LOW** | Orange badge | Light orange tint | Extend (urgent), View |
| **EXPIRED** | Gray badge | Gray tint | Renew, Archive |

### Recent Verification Activity

```
┌─────────────────────────────────────────────────────────────────┐
│  RECENT VERIFICATIONS                        [View All →]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Status    Outcome ID          Vendor          Result    $      │
│  ─────────────────────────────────────────────────────────────  │
│  ✓         #OUT-28491          Sierra          VERIFIED   1.47  │
│  ✓         #OUT-28490          Intercom Fin    VERIFIED   1.47  │
│  ✗         #OUT-28489          Sierra          FAILED    0.00   │
│  ⏳         #OUT-28488          Custom Agent    PENDING   —      │
│  ✓         #OUT-28487          Sierra          VERIFIED   1.47  │
│  ✓         #OUT-28486          Intercom Fin    VERIFIED   1.47  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  ⚠️ Failed outcome #OUT-28489: Customer reopened ticket    │ │
│  │     within 4 hours — payment blocked, vendor notified      │ │
│  │     [View Details]  [Contact Vendor]                       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Status Icons:**
- ✓ Green circle: VERIFIED
- ✗ Red circle: FAILED
- ⏳ Yellow circle: PENDING
- 🔄 Blue circle: IN PROGRESS

---

## SECTION 3: UPX Contracts Page

### Contract List View

```
┌─────────────────────────────────────────────────────────────────┐
│  UPX CONTRACTS                               [+ New Contract]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Search contracts...]  [Status: All ▼]  [Type: All ▼]          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Ticker           Description              Qty    Rate   Status│ │
│  │ ──────────────────────────────────────────────────────────── │ │
│  │ UPX-CX-RES-US   US Support (L1-L2)       75K    $1.47  LIVE  │ │
│  │ UPX-CX-RES-EU   EU Support (GDPR)        50K    $1.62  DRAFT │ │
│  │ UPX-SWE-ISS     GitHub Issue Resolution  1K     $45.00 LIVE  │ │
│  │ UPX-SALES-QUAL  Lead Qualification       10K    $3.20  LIVE  │ │
│  │ UPX-CX-RES-US   US Support (Q2)          60K    $1.52  EXPIRED│ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Showing 5 of 12 contracts          [< Prev] [1] [2] [3] [Next >]│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Contract Detail View

```
┌─────────────────────────────────────────────────────────────────┐
│  UPX-CX-RES-US                               [Export PDF] [✕]   │
│  US Customer Support Resolutions                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────┐  ┌────────────────────────────┐ │
│  │  CONTRACT TERMS            │  │  PERFORMANCE SUMMARY       │ │
│  │                            │  │                            │ │
│  │  Status: LIVE              │  │  [Line chart: Daily        │ │
│  │                            │  │   outcomes over time]      │ │
│  │  Flat Rate: $1.47          │  │                            │ │
│  │  per verified outcome      │  │  Delivered: 50,000         │ │
│  │                            │  │  Verified: 47,150 (94.3%)   │ │
│  │  Total Value: $110,250     │  │  Failed: 2,850 (5.7%)       │ │
│  │  (75,000 outcomes)         │  │  Pending: 0                 │ │
│  │                            │  │                            │ │
│  │  Valid: Jul 1 — Dec 31     │  │  Avg verification: 71.8h    │ │
│  │  2026                      │  │                            │ │
│  │                            │  │                            │ │
│  │  Auto-renew: Enabled       │  │                            │ │
│  │  [Configure]               │  │                            │ │
│  └────────────────────────────┘  └────────────────────────────┘ │
│                                                                 │
│  COST BREAKDOWN (Actual vs. Quote)                              │
│  ─────────────────────────────────────────────────────────────  │
│  Component            Quoted      Actual        Variance        │
│  ─────────────────────────────────────────────────────────────  │
│  Base Compute         $62,100     $58,240       -$3,860 ✓       │
│  Retry Multiplier     $21,000     $19,840       -$1,160 ✓       │
│  Verification         $7,500      $7,500        $0              │
│  Risk Premium         $3,105      $0            -$3,105 ✓       │
│  Themis Fee           $8,820      $8,250        -$570 ✓         │
│  ─────────────────────────────────────────────────────────────  │
│  TOTAL                $102,525    $93,830       -$8,695         │
│                                                                 │
│  [You're spending $8,695 less than quoted — optimal routing     │
│   and lower compute costs are saving you money]                 │
│                                                                 │
│  ROUTING DISTRIBUTION                                           │
│  ─────────────────────────────────────────────────────────────  │
│  [Pie chart: Vendor distribution]                               │
│                                                                 │
│  • Sierra (via Themis routing): 34,250 outcomes (68.5%)         │
│  • Intercom Fin: 12,400 outcomes (24.8%)                        │
│  • Custom agent (legacy): 3,350 outcomes (6.7%)                 │
│                                                                 │
│  [View Detailed Routing Log]                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## SECTION 4: New Contract / Quote Flow

### Step 1: Define Outcome Need

```
┌─────────────────────────────────────────────────────────────────┐
│  REQUEST NEW OUTCOME CONTRACT                Step 1 of 3        │
│  [Progress bar: ████████░░░░░░░░░░] 33%                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  What type of work do you need delivered?                       │
│                                                                 │
│  ┌────────────────────────┐  ┌────────────────────────┐        │
│  │ [💬]                   │  │ [💻]                   │        │
│  │                        │  │                        │        │
│  │  Customer Support      │  │  Software Engineering  │        │
│  │  Resolutions           │  │  Issue Resolution      │        │
│  │                        │  │                        │        │
│  │  Resolve support       │  │  Close GitHub/Jira     │        │
│  │  tickets with AI       │  │  issues via PR merge   │        │
│  │                        │  │                        │        │
│  │  [● Selected]          │  │  [○]                   │        │
│  └────────────────────────┘  └────────────────────────┘        │
│                                                                 │
│  ┌────────────────────────┐  ┌────────────────────────┐        │
│  │ [📊]                   │  │ [⚙️]                   │        │
│  │                        │  │                        │        │
│  │  Lead Qualification    │  │  Custom Outcome Type   │        │
│  │                        │  │                        │        │
│  │  Qualify sales leads   │  │  Define your own       │        │
│  │  in your CRM           │  │  outcome criteria      │        │
│  │                        │  │                        │        │
│  │  [○]                   │  │  [○]                   │        │
│  └────────────────────────┘  └────────────────────────┘        │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Selected: Customer Support Resolutions                         │
│                                                                 │
│  Contract Details:                                              │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Quantity:        [ 50,000          ] outcomes                  │
│                                                                    │
│  Region:          [ United States ▼ ]                           │
│                   Determines compliance (SOC 2) and pricing     │
│                                                                    │
│  Complexity:      [ Level 1-2 (Standard) ▼ ]                    │
│                   L1: Simple inquiries | L2: Technical issues   │
│                                                                    │
│  Quality SLA:     [ 95% verification rate ▼ ]                   │
│                   Minimum % of outcomes that must verify        │
│                                                                    │
│  Delivery Period: [ Q3 2026 (Jul-Sep) ▼ ]                       │
│                                                                    │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  [Cancel]                              [Get Quote →]            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Review Quote

```
┌─────────────────────────────────────────────────────────────────┐
│  REVIEW YOUR QUOTE                           Step 2 of 3        │
│  [Progress bar: ████████████████░░░░] 67%                       │
│                                                                 │
│  ⏰ This quote is valid for 5 days                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │                    FLAT PRICE                               │ │
│  │                                                             │ │
│  │                    $73,500                                  │ │
│  │                                                             │ │
│  │         $1.47 per outcome × 50,000 outcomes                 │ │
│  │                                                             │ │
│  │    ─────────────────────────────────────────────            │ │
│  │                                                             │ │
│  │    vs. your current vendor estimate: $110,000               │ │
│  │                                                             │ │
│  │         [You save $36,500 (33%)]                            │ │
│  │              ↑ Green badge                                  │ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  PRICING BREAKDOWN                                              │
│  ─────────────────────────────────────────────────────────────  │
│  Component                    Calculation              Amount   │
│  ─────────────────────────────────────────────────────────────  │
│  Base Compute Cost            70M tokens × $0.00012    $8,420   │
│                               (H100 cluster, US-East)           │
│                                                                    │
│  Retry Multiplier (1.34x)     Historical avg attempts  $2,863   │
│                               covers failed resolutions         │
│                                                                    │
│  Verification Cost            $0.15 per outcome        $7,500   │
│                               (Dike 72-hr verification)         │
│                                                                    │
│  Risk Premium                 5-day price lock         $842     │
│                               (protects against compute spikes) │
│                                                                    │
│  ─────────────────────────────────────────────────────────────  │
│  Subtotal                                              $19,625  │
│                                                                    │
│  Themis Protocol Fee (8%)                              $1,570   │
│  (Routing optimization, settlement, insurance)                  │
│                                                                    │
│  ─────────────────────────────────────────────────────────────  │
│  TOTAL FLAT PRICE                                      $21,195  │
│                                                                    │
│  Wait — this doesn't match $73,500?                             │
│  [Show me how this works →]                                     │
│                                                                 │
│  EXPLANATION:                                                   │
│  The $73,500 includes a 72-month compute reservation that       │
│  guarantees you this rate. The $21,195 is your immediate        │
│  cost. The remaining $52,305 is held in escrow and released     │
│  as you consume outcomes.                                       │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ROUTING PLAN                                                   │
│  ─────────────────────────────────────────────────────────────  │
│  Based on current market conditions, Themis will route your     │
│  support tickets to:                                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 67%  Claude-4 clusters (H100, US-East)    $0.89/outcome   │ │
│  │ 23%  GPT-5.6 (A100, US-West)              $1.12/outcome   │ │
│  │ 10%  Fallback pool (cost-optimized)       $0.67/outcome   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [View Detailed Math]  [← Back]  [Lock Price for 5 Days →]      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3: Confirm & Lock

```
┌─────────────────────────────────────────────────────────────────┐
│  LOCK CONTRACT                               Step 3 of 3        │
│  [Progress bar: ████████████████████] 100%                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Review and confirm your UPX contract:                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  CONTRACT SUMMARY                                           │ │
│  │                                                             │ │
│  │  UPX Ticker:        UPX-CX-RES-US-Q3-2026                   │ │
│  │  Description:       50,000 US Customer Support Resolutions  │ │
│  │  Flat Rate:         $1.47 per verified outcome              │ │
│  │  Total Value:       $73,500 (max, if all verify)            │ │
│  │  Valid Period:      July 1 — September 30, 2026             │ │
│  │  Quality SLA:       95% minimum verification rate           │ │
│  │                                                             │ │
│  │  ─────────────────────────────────────────────────────────  │ │
│  │                                                             │ │
│  │  PAYMENT TERMS                                              │ │
│  │                                                             │ │
│  │  • Net 30 upon verified delivery                            │ │
│  │  • Monthly invoicing based on verified outcomes             │ │
│  │  • No payment for failed outcomes                           │ │
│  │                                                             │ │
│  │  ─────────────────────────────────────────────────────────  │ │
│  │                                                             │ │
│  │  AUTO-RENEWAL                                               │ │
│  │                                                             │ │
│  │  [Disabled ▼]                                               │ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  VERIFICATION AUTHORIZATION                                     │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  [✓] I authorize Themis to access my Zendesk account for        │
│      outcome verification. Themis will have read-only access    │
│      to ticket status, comments, and resolution timestamps.     │
│                                                                 │
│  [View Full Authorization Terms]                                │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  By clicking "Lock Contract," you agree to the UPX Contract    │
│  Terms and Themis Service Agreement.                            │
│                                                                 │
│  [Cancel]  [← Back]  [Lock Contract & Authorize $73,500]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## SECTION 5: Outcomes / Verification Feed

### Real-Time Verification Stream

```
┌─────────────────────────────────────────────────────────────────┐
│  OUTCOME VERIFICATION FEED                   [Filter] [Export]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ● Live — Last verified: 12 seconds ago                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  ✓ VERIFIED                                      12s ago   │ │
│  │                                                             │ │
│  │  Outcome #OUT-28504                                         │ │
│  │  Ticket #28491 — Password reset assistance                  │ │
│  │                                                             │ │
│  │  Vendor: Sierra                    Settlement: $1.47 ✓      │ │
│  │  Verification: 72.0 hours passed, no reopen                 │ │
│  │                                                             │ │
│  │  [View Details]  [View in Zendesk]                          │ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  ✗ FAILED                                        4m ago    │ │
│  │                                                             │ │
│  │  Outcome #OUT-28503                                         │ │
│  │  Ticket #28488 — Integration troubleshooting                │ │
│  │                                                             │ │
│  │  Vendor: Sierra                    Settlement: BLOCKED      │ │
│  │  Reason: Customer reopened ticket after 3h 47m              │ │
│  │                                                             │ │
│  │  [View Details]  [Contact Vendor]  [File Dispute]           │ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  ⏳ PENDING                                       71h ago   │ │
│  │                                                             │ │
│  │  Outcome #OUT-28502                                         │ │
│  │  Ticket #28485 — Billing inquiry                            │ │
│  │                                                             │ │
│  │  Vendor: Intercom Fin              Verification in 57m      │ │
│  │  Time remaining: 57 minutes until 72h window closes         │ │
│  │                                                             │ │
│  │  [Preview Result]  [Force Verify]  [Cancel Outcome]         │ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [Load More...]                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Outcome Detail Modal

```
┌─────────────────────────────────────────────────────────────────┐
│  Outcome #OUT-28504                              [X]            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STATUS: ✓ VERIFIED                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                 │
│  Settlement: $1.47 released to Sierra on July 25, 2026         │
│  Transaction ID: txn_7f8a9b2c3d4e                               │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  VERIFICATION TIMELINE                                          │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  July 22, 2026                                                  │
│  ├─ 09:23:14    Ticket #28491 created by customer              │
│  ├─ 09:24:47    Sierra AI agent assigned to ticket             │
│  ├─ 09:31:02    Agent marked ticket as "resolved"              │
│  ├─ 09:31:15    Dike verification initiated                    │
│  ├─ 09:31:22    Zendesk status confirmed: closed               │
│  └─ 09:31:25    Cryptographic audit: passed                    │
│                                                                 │
│  [72-hour verification window — Dike polling every 4 hours]    │
│                                                                 │
│  July 25, 2026                                                  │
│  ├─ 09:31:02    72 hours elapsed                               │
│  ├─ 09:31:15    Final Zendesk check: still closed              │
│  ├─ 09:31:22    No customer reopen detected                    │
│  ├─ 09:31:30    ✓ VERIFIED — Settlement approved               │
│  └─ 09:31:35    Payment of $1.47 released to Sierra            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  VERIFICATION CHECKS                                            │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ✓ Initial ticket status: Resolved                             │
│  ✓ 72-hour window: Completed without reopen                    │
│  ✓ No human agent intervention                                 │
│  ✓ Cryptographic proof: Valid                                  │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  [Download Audit Trail PDF]  [View Ticket in Zendesk]           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## SECTION 6: Savings / Cost Analysis Page

### Savings Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  COST SAVINGS ANALYSIS                       [Export to Excel]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │              TOTAL SAVINGS TO DATE                          │ │
│  │                                                             │ │
│  │                  $247,890                                   │ │
│  │                                                             │ │
│  │         Since you started using Themis in January 2026      │ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [Bar chart: Monthly savings vs. previous vendor billing]       │
│                                                                 │
│  Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec    │
│  $12K $18K $22K $28K $35K $42K $48K $43K  —    —    —    —     │
│  ████ █████ ██████ ████████ ██████████ ████████████ ████████   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  SAVINGS BREAKDOWN                                              │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Source of Savings                    Amount     % of Total│ │
│  │ ──────────────────────────────────────────────────────────│ │
│  │                                                         │ │
│  │ ████████████████████████████████  Verified outcomes     │ │
│  │                                     (not paying for     │ │
│  │                                     failures/rework)      │ │
│  │                                     $142,350     57%      │ │
│  │                                                         │ │
│  │ ████████████████                  Optimal routing       │ │
│  │                                     (cheaper models     │ │
│  │                                     for simple tasks)     │ │
│  │                                     $68,420      28%      │ │
│  │                                                         │ │
│  │ ██████                            Retry efficiency      │ │
│  │                                     (fewer wasted       │ │
│  │                                     attempts)             │ │
│  │                                     $24,120      10%      │ │
│  │                                                         │ │
│  │ ██                                Risk premium          │ │
│  │                                     recovery              │ │
│  │                                     $13,000      5%       │ │
│  │                                                         │ │
│  │ ──────────────────────────────────────────────────────────│ │
│  │ TOTAL SAVINGS:                       $247,890    100%     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  WHAT YOU WOULD HAVE PAID (Counterfactual Analysis)             │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Scenario                                      Cost    Savings  │
│  ─────────────────────────────────────────────────────────────  │
│  Your current Themis spend                     $312,450   —     │
│  Previous vendor (token-based billing)         $487,500  $175K   │
│  List price (no Themis routing optimization)   $560,340  $248K   │
│  No AI (all human agents)                      $1.2M      $888K  │
│                                                                 │
│  [View Detailed Calculation Methodology]                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## SECTION 7: Vendor Management Page

### AI Vendor Performance

```
┌─────────────────────────────────────────────────────────────────┐
│  AI VENDOR PERFORMANCE                       [Add Vendor]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Search vendors...]  [Filter by Status ▼]  [Export Report]     │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Vendor      Outcomes  Verified   Avg Cost   Trend  Status │ │
│  │ ──────────────────────────────────────────────────────────│ │
│  │                                                         │ │
│  │ [Logo]      45,230      94.7%      $1.23     ↗       ●   │ │
│  │ Sierra                                                  │ │
│  │ Primary vendor — 67% of US support traffic              │ │
│  │                                                         │ │
│  │ [Logo]      12,400      91.2%      $1.31     →       ●   │ │
│  │ Intercom Fin                                            │ │
│  │ Secondary vendor — 23% of US support traffic            │ │
│  │                                                         │ │
│  │ [Logo]      8,150       87.3%      $1.45     ↘       ▲   │ │
│  │ Custom Agent (Legacy)                                   │ │
│  │ Tertiary vendor — 10% of US support traffic             │ │
│  │ ⚠️ Verification rate declining — review recommended     │ │
│  │                                                         │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  SIERRA — DETAILED PERFORMANCE                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌────────────────────────────┐  ┌────────────────────────────┐ │
│  │  ROUTING ALLOCATION        │  │  LAST 30 DAYS              │ │
│  │                            │  │                            │ │
│  │  [Pie chart]               │  │  Outcomes: 12,450          │ │
│  │                            │  │  Verified: 11,790 (94.7%)  │ │
│  │  67% of US support         │  │  Failed: 660 (5.3%)        │ │ │
│  │                            │  │                            │ │
│  │                            │  │  Avg resolution: 4.2 hrs   │ │
│  │                            │  │  Reopen rate: 3.8%         │ │
│  │                            │  │  (Industry avg: 8.2%)      │ │
│  └────────────────────────────┘  └────────────────────────────┘ │
│                                                                 │
│  [View Detailed Report]  [Adjust Routing Weight]  [Contact]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## SECTION 8: Visual Design System

### Color Palette

```
┌─────────────────────────────────────────────────────────────────┐
│  PRIMARY COLORS                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ████████  #0A2540  Deep Navy                                   │
│           Primary brand color, headings, key metrics            │
│           Represents trust, enterprise, stability               │
│                                                                 │
│  ████████  #00D4AA  Teal                                        │
│           Success states, verification badges, CTAs             │
│           Represents verification, completion, growth           │
│                                                                 │
│  ████████  #FF6B35  Orange                                      │
│           Alerts, warnings, action required                     │
│           Represents attention, pending, failed                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  SUPPORTING COLORS                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ████████  #F6F9FC  Light Gray (Background)                     │
│  ████████  #FFFFFF  White (Cards, content areas)                │
│  ████████  #1A1A2E  Near Black (Primary text)                   │
│  ████████  #6B7280  Gray (Secondary text, labels)               │
│  ████████  #EF4444  Red (Failed verification)                   │
│  ████████  #F59E0B  Amber (Pending, draft)                      │
│  ████████  #10B981  Green (Success, verified)                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Typography

```
FONT FAMILY: Inter (Google Fonts)

HEADINGS:
  H1: 32px / Bold / #0A2540      (Page titles)
  H2: 24px / Bold / #0A2540      (Section headers)
  H3: 18px / Semibold / #0A2540  (Card titles)
  H4: 16px / Semibold / #1A1A2E  (Subsection)

BODY:
  Large: 16px / Regular / #1A1A2E    (Primary content)
  Default: 14px / Regular / #1A1A2E  (Standard text)
  Small: 12px / Regular / #6B7280    (Labels, metadata)

DISPLAY NUMBERS:
  KPI Large: 48px / Bold / #0A2540   (Hero metrics)
  KPI Medium: 32px / Bold / #0A2540  (Card metrics)

MONOSPACE:
  Font: JetBrains Mono
  Usage: Ticker symbols, outcome IDs, amounts
  Size: 14px / Regular
```

### Component Library

**Cards:**
```css
.card {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.2s ease;
}
```

**Buttons:**
```css
/* Primary */
.btn-primary {
  background: #0A2540;
  color: #FFFFFF;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 600;
}

/* Secondary */
.btn-secondary {
  background: #FFFFFF;
  color: #0A2540;
  border: 1px solid #0A2540;
  border-radius: 6px;
  padding: 12px 24px;
}

/* Success (Teal) */
.btn-success {
  background: #00D4AA;
  color: #0A2540;
  border-radius: 6px;
  padding: 12px 24px;
}
```

**Status Badges:**
```css
.badge-verified {
  background: #D1FAE5;
  color: #065F46;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge-failed {
  background: #FEE2E2;
  color: #991B1B;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge-pending {
  background: #FEF3C7;
  color: #92400E;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}
```

**Data Tables:**
```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background: #F6F9FC;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #6B7280;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table td {
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.table tr:hover {
  background: #F6F9FC;
}
```

---

## SECTION 9: Mobile Responsiveness

### Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| **Desktop** | ≥1280px | Full layout, sidebar nav |
| **Tablet** | 768-1279px | Stacked cards, condensed nav |
| **Mobile** | <768px | Single column, hamburger menu |

### Mobile Navigation

```
┌─────────────────────────────────────────┐
│  [☰]  ⚖️ Themis    [🔔] [👤]           │
├─────────────────────────────────────────┤
│                                         │
│  [Navigation Drawer]                    │
│  ─────────────────                      │
│  Overview                               │
│  UPX Contracts                          │
│  Outcomes                               │
│  Savings                                │
│  Reports                                │
│  Vendors                                │
│  ─────────────────                      │
│  Settings                               │
│                                         │
└─────────────────────────────────────────┘
```

### Mobile Card Stacking

```
Desktop: Side-by-side    Mobile: Stacked
┌─────┬─────┬─────┐      ┌─────┐
│ KPI │ KPI │ KPI │  →   │ KPI │
└─────┴─────┴─────┘      ├─────┤
                         │ KPI │
                         ├─────┤
                         │ KPI │
                         └─────┘
```

---

## SECTION 10: Empty States & Onboarding

### First-Time User Experience

```
┌─────────────────────────────────────────────────────────────────┐
│  WELCOME TO THEMIS                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Video thumbnail: 90-second explainer]                         │
│  ▶️ Watch: "How Themis Saves You Money on AI"                  │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  GET STARTED IN 3 STEPS:                                        │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  1️⃣  CONNECT YOUR SUPPORT SYSTEM                          │ │
│  │                                                             │ │
│  │      Start with Zendesk authorization                       │ │
│  │      [Connect Zendesk →]                                    │ │
│  │                                                             │ │
│  │      ✓ Takes 2 minutes                                      │ │
│  │      ✓ Read-only access                                     │ │ │
│  │      ✓ No changes to your workflow                          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  2️⃣  INVITE YOUR AI VENDOR                                │ │
│  │                                                             │ │
│  │      Add Sierra, Intercom, or your custom agent             │ │
│  │      [Invite Vendor →]    or    [I don't have one yet]      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  3️⃣  CREATE YOUR FIRST UPX CONTRACT                       │ │
│  │                                                             │ │
│  │      Lock in flat-rate pricing for verified outcomes        │ │
│  │      [Create Contract →]                                    │ │
│  │                                                             │ │
│  │      💡 Not ready? Get a free savings audit first          │ │
│  │      [Request Free Audit]                                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Need help? [Schedule a demo with our team]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Empty State: No Contracts

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        [📄 Illustration]                        │
│                                                                 │
│                    No UPX Contracts Yet                         │
│                                                                 │
│     UPX contracts lock in flat-rate pricing for verified        │
│     AI outcomes. Stop paying for failed attempts.               │
│                                                                 │
│                    [Create First Contract]                      │
│                                                                 │
│     [📚 Learn more about UPX contracts]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## SECTION 11: Implementation Notes

### Tech Stack Recommendations

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | React + TypeScript | Type safety, component ecosystem |
| **Styling** | Tailwind CSS | Rapid development, consistency |
| **State Management** | React Query | Server state, caching, real-time |
| **Charts** | Recharts | React-native, customizable |
| **Tables** | TanStack Table | Sorting, filtering, pagination |
| **Forms** | React Hook Form + Zod | Validation, type safety |

### API Integration Points

**Real-time Updates:**
- WebSocket or Server-Sent Events for verification feed
- Polling fallback for older browsers

**Performance:**
- Quote generation: Async with loading states (2-5s)
- Contract locking: Optimistic UI with confirmation
- Dashboard: Cache for 30 seconds, background refresh

### Accessibility Requirements

- **WCAG 2.1 AA compliance**
- Keyboard navigation for all interactive elements
- Screen reader optimized data tables
- Color contrast ratios: 4.5:1 minimum
- Focus indicators on all interactive elements

### Analytics Events

Track these user actions:
- `dashboard_viewed`
- `quote_requested`
- `quote_approved`
- `contract_created`
- `outcome_detail_viewed`
- `savings_report_exported`
- `vendor_contacted`

---

## APPENDIX: Current vs. Proposed Comparison

### Screenshot 1 (Ontitled Dashboard) Analysis

| Current Element | Problem | Proposed Solution |
|-----------------|---------|-------------------|
| "Introducing Themis" card | Positions as AI model, not outcome platform | "This Month's Performance" with KPIs |
| "Tinker SDK" | Developer tool, not CFO concern | Remove — not relevant to procurement |
| "Models & Pricing" | Infrastructure pricing | "UPX Contracts" with flat-rate outcomes |
| "Sessions" | Training concept | Remove — replace with "Outcomes" |
| "API Keys" | Developer credential | Move to Settings, not primary nav |
| "Loss Functions" | ML engineering | Remove entirely |
| Empty state: "training sessions" | No value for CFO | Show sample data or onboarding |

### Screenshot 2 (Thesean Ship) Analysis

| Current Element | Problem | Proposed Solution |
|-----------------|---------|-------------------|
| "Total Cost" | Infrastructure cost | "Budget Used" with outcome context |
| "Total Queries" | Request volume | "Outcomes Delivered" (verified) |
| "Input/Output Tokens" | Technical detail | "Cost Per Outcome" (business metric) |
| Daily usage chart | Compute patterns | Monthly savings trend |
| "Filter by model" | Infrastructure focus | "Filter by contract/outcome type" |
| No verification | Can't trust metrics | 72-hour verification timeline |

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
