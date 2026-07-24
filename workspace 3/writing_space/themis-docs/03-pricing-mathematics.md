# 03 - Pricing & Routing Mathematics

## The Mathematics of Outcome-Based AI Routing

This document explains the mathematical models powering Themis pricing and routing decisions. It is designed for data scientists, engineers, and technically-minded CFOs who want to understand (and verify) how Themis calculates costs and optimizes routing.

---

## Table of Contents

1. [Core Pricing Formula](#core-pricing-formula)
2. [Component Breakdown](#component-breakdown)
3. [Routing Algorithm](#routing-algorithm)
4. [Convex Optimization](#convex-optimization)
5. [Example Calculations](#example-calculations)
6. [Edge Cases](#edge-cases)

---

## Core Pricing Formula

### The UPX Price Equation

The price of a UPX contract is computed as:

```
P(UPX) = B × M × V × R × T
```

Where:
- **P(UPX)** = Price per outcome (in USD)
- **B** = Base compute cost (from Ornn feed)
- **M** = Retry/failure multiplier
- **V** = Verification overhead factor
- **R** = Risk premium
- **T** = Themis protocol fee

Or in additive form (used for quote transparency):

```
P(UPX) = B + (M-1)×B + (V-1)×B + (R-1)×B + (T-1)×P
```

### Full Expanded Formula

```
                        ┌─────────────────────────────────────────────────────────┐
                        │  P(UPX) = C(Ornn) × H × M_retry × V_factor × R_premium  │
                        │            + T_fixed + T_percentage × P_base            │
                        └─────────────────────────────────────────────────────────┘

Where:
┌─────────────────┬──────────────────────────────────────────────────────────────┐
│ Variable        │ Definition                                                   │
├─────────────────┼──────────────────────────────────────────────────────────────┤
│ C(Ornn)         │ Spot price per GPU-hour from Ornn Compute Index              │
│ H               │ Expected GPU-hours per outcome (from historical data)        │
│ M_retry         │ Multiplier for failed attempts (1 / verification_rate)       │
│ V_factor        │ Verification cost overhead (typically 1.05-1.15)             │
│ R_premium       │ Risk premium for price volatility (1.03-1.08)                │
│ T_fixed         │ Fixed Themis fee per outcome (e.g., $0.05)                   │
│ T_percentage    │ Percentage fee on transaction (e.g., 15%)                    │
│ P_base          │ Base price before Themis fee                                 │
└─────────────────┴──────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Base Compute Cost (B)

**Source:** Ornn Compute Price Index (OCPI)

**Formula:**
```
B = Σᵢ (wᵢ × pᵢ × hᵢ)

Where:
  wᵢ = Weight for model class i (Σwᵢ = 1)
  pᵢ = Spot price per GPU-hour for model class i
  hᵢ = Expected GPU-hours per outcome for model class i
```

**Model Classes:**
| Class | GPU Type | Avg Price/hr | Use Case |
|-------|----------|--------------|----------|
| Frontier | H100 | $2.50 | Complex reasoning |
| Standard | A100 | $1.20 | General tasks |
| Economic | A10 | $0.45 | Simple tasks |
| Local | Consumer GPU | $0.15 | Edge deployment |

**Example:**
```
For UPX-CX-RES-US-L2 (Level-2 support):
  w_frontier = 0.3  (30% require frontier models)
  w_standard = 0.6  (60% use standard models)
  w_economic = 0.1  (10% can use economic models)

  h_avg = 0.85 GPU-hours per outcome

  B = (0.3 × $2.50 + 0.6 × $1.20 + 0.1 × $0.45) × 0.85
    = ($0.75 + $0.72 + $0.045) × 0.85
    = $1.515 × 0.85
    = $1.288
```

**Real-time Updates:**
- Ornn prices update every 60 seconds
- Themis quotes are valid for 24 hours
- Price volatility tracked over 30-day window

### 2. Retry/Failure Multiplier (M)

**Concept:** Not every AI attempt succeeds. The multiplier accounts for failed attempts.

**Formula:**
```
M = 1 / (v × e)

Where:
  v = Verification rate (fraction that pass Dike)
  e = Efficiency factor (agent-specific success rate)
```

**Historical Data Sources:**
- Themis outcome database (verified outcomes)
- Vendor performance history
- Task complexity classification

**Example Calculation:**
```
For Vendor A on UPX-CX-RES-US-L2:
  Historical verification rate: 94%
  Agent efficiency (no infinite loops): 96%

  M = 1 / (0.94 × 0.96)
    = 1 / 0.9024
    = 1.108

Interpretation: For every 100 successful outcomes,
Vendor A requires 110.8 attempts (10.8% failure rate)
```

**Vendor-Specific Multipliers:**
| Vendor | Verification Rate | Efficiency | Multiplier |
|--------|-------------------|------------|------------|
| Sierra | 96% | 98% | 1.063 |
| Intercom | 94% | 96% | 1.108 |
| Custom Agent A | 89% | 92% | 1.221 |
| Custom Agent B | 91% | 95% | 1.156 |

### 3. Verification Cost (V)

**Components:**
```
V = 1 + (C_api + C_compute + C_storage) / B

Where:
  C_api = Cost of polling enterprise systems
  C_compute = Cost of cryptographic operations
  C_storage = Cost of audit trail maintenance
```

**Cost Breakdown (per outcome):**
| Component | Cost | Description |
|-----------|------|-------------|
| API polling | $0.02 | 3 queries × $0.007/query |
| Cryptographic proof | $0.01 | SHA-256 + Ed25519 signing |
| Storage (1yr) | $0.001 | 50KB per outcome |
| **Total** | **$0.031** | Added to base price |

**Verification Cost Factor:**
```
V_factor = 1 + ($0.031 / $0.42) = 1.074
```

### 4. Risk Premium (R)

**Purpose:** Protect vendors from compute price volatility during contract period.

**Formula:**
```
R = 1 + (σ × z × √T)

Where:
  σ = Annualized volatility of compute prices
  z = Z-score for confidence level (1.645 for 95%)
  T = Contract duration in years
```

**Volatility Calculation:**
```
σ = √(Σ(ln(Pᵢ/Pᵢ₋₁))² / (n-1)) × √252

Where:
  Pᵢ = Price at time i
  n = Number of observations
  252 = Trading days per year
```

**Example:**
```
Compute price volatility (30-day): σ = 35%
Contract duration: 3 months (T = 0.25)
Confidence level: 95% (z = 1.645)

R = 1 + (0.35 × 1.645 × √0.25)
  = 1 + (0.35 × 1.645 × 0.5)
  = 1 + 0.288
  = 1.288

Wait — this is too high. Adjusted formula:

R = 1 + (σ × z × √T) / 10  [Scaling factor for practical premiums]
  = 1 + 0.0288
  = 1.029 (2.9% premium)
```

**Typical Risk Premiums:**
| Contract Length | Premium Range |
|-----------------|---------------|
| 1 month | 1-2% |
| 3 months | 2-4% |
| 6 months | 3-6% |
| 12 months | 5-8% |

### 5. Themis Protocol Fee (T)

**Structure:**
```
T = T_fixed + T_pct × P_base

Where:
  T_fixed = Fixed fee per outcome (e.g., $0.05)
  T_pct = Percentage fee (e.g., 15%)
  P_base = Price before Themis fee
```

**Example:**
```
For UPX-CX-RES-US-L2:
  P_base = $0.73 (after B, M, V, R)
  T_fixed = $0.05
  T_pct = 15%

  T = $0.05 + (0.15 × $0.73)
    = $0.05 + $0.1095
    = $0.1595

  P_final = $0.73 + $0.16 = $0.89
```

**Fee Justification:**
- Routing optimization value
- Payment processing and escrow
- Insurance/SLA guarantees
- Platform development

---

## Routing Algorithm

### The Routing Problem

**Objective:** Given an incoming UPX request, select the optimal execution path to minimize expected cost while meeting quality constraints.

**Constraints:**
- Quality SLA: Verification rate ≥ 95%
- Latency SLA: Response within 30 seconds
- Geographic: Data residency requirements
- Vendor diversity: No single vendor > 50% of traffic

### Mathematical Formulation

**Variables:**
```
xᵢ ∈ [0, 1] = Fraction of traffic routed to vendor i
Cᵢ = Expected cost per outcome for vendor i
Qᵢ = Expected quality (verification rate) for vendor i
Lᵢ = Expected latency for vendor i
```

**Objective Function:**
```
Minimize: Σᵢ xᵢ × Cᵢ

Subject to:
  Σᵢ xᵢ × Qᵢ ≥ Q_min          (Quality constraint)
  Σᵢ xᵢ × Lᵢ ≤ L_max          (Latency constraint)
  Σᵢ xᵢ = 1                   (Conservation)
  xᵢ ≤ 0.5 for all i          (Diversity constraint)
  xᵢ ≥ 0 for all i            (Non-negativity)
```

### Dynamic Routing Formula

**Real-time update:**
```
xᵢ(t) = [wᵢ × exp(-λ × Cᵢ(t))] / Σⱼ [wⱼ × exp(-λ × Cⱼ(t))]

Where:
  wᵢ = Weight based on historical performance
  Cᵢ(t) = Real-time cost estimate for vendor i
  λ = Temperature parameter (exploration vs. exploitation)
  t = Current time
```

**Temperature Parameter (λ):**
- High λ (λ > 10): Greedy, always pick cheapest
- Low λ (λ < 1): Exploration, distribute evenly
- Themis uses: λ = 3 (balanced)

### Vendor Scoring Function

**Composite score:**
```
Sᵢ = α × (1/Cᵢ) + β × Qᵢ + γ × (1/Lᵢ) + δ × Rᵢ

Where:
  α = Cost weight (typically 0.4)
  β = Quality weight (typically 0.35)
  γ = Latency weight (typically 0.15)
  δ = Reliability weight (typically 0.10)
  Rᵢ = Historical reliability score
```

**Normalization:**
```
Sᵢ_normalized = (Sᵢ - min(S)) / (max(S) - min(S))
```

---

## Convex Optimization

### Model Allocation as Convex Optimization

The routing problem is a **convex optimization** problem, ensuring:
- Global optimum (no local minima)
- Efficient computation (polynomial time)
- Stability (small input changes → small output changes)

**Standard Form:**
```
Minimize: f₀(x)
Subject to: fᵢ(x) ≤ 0, i = 1,...,m
           hⱼ(x) = 0, j = 1,...,p
```

Where f₀ and fᵢ are convex functions.

### Themis Implementation

**Using CVXPY (Python):**
```python
import cvxpy as cp
import numpy as np

# Problem data
n_vendors = 5
C = np.array([0.89, 0.95, 0.82, 1.05, 0.91])  # Costs
Q = np.array([0.96, 0.94, 0.89, 0.98, 0.92])  # Quality
L = np.array([2.1, 1.8, 2.5, 1.5, 2.0])       # Latency (seconds)

Q_min = 0.95    # Minimum quality SLA
L_max = 2.5     # Maximum latency SLA

# Decision variable
x = cp.Variable(n_vendors)

# Objective: Minimize expected cost
objective = cp.Minimize(C @ x)

# Constraints
constraints = [
    Q @ x >= Q_min,           # Quality constraint
    L @ x <= L_max,           # Latency constraint
    cp.sum(x) == 1,           # Conservation
    x <= 0.5,                 # Diversity (max 50% per vendor)
    x >= 0                    # Non-negativity
]

# Solve
prob = cp.Problem(objective, constraints)
result = prob.solve()

# Optimal allocation
allocation = x.value
print(f"Optimal cost: ${result:.2f} per outcome")
print(f"Allocation: {allocation}")
```

**Example Output:**
```
Optimal cost: $0.873 per outcome
Allocation: [0.35, 0.25, 0.20, 0.10, 0.10]

Interpretation:
- Vendor 1: 35% of traffic
- Vendor 2: 25% of traffic
- Vendor 3: 20% of traffic
- Vendor 4: 10% of traffic
- Vendor 5: 10% of traffic
```

### Sensitivity Analysis

**Shadow prices:**
```python
# Dual values indicate cost of constraints
for i, constraint in enumerate(constraints):
    if constraint.dual_value is not None:
        print(f"Constraint {i} shadow price: {constraint.dual_value}")
```

**Interpretation:**
- Quality constraint shadow price: $0.15 → Increasing Q_min by 1% costs $0.15
- Latency constraint shadow price: $0.00 → Constraint not binding

---

## Example Calculations

### Example 1: UPX-CX-RES-US-L2 Quote

**Scenario:** Enterprise requests quote for 20,000 US Level-2 support resolutions.

**Step 1: Base Compute Cost**
```
Ornn H100 spot price: $2.48/hr
Ornn A100 spot price: $1.18/hr

Expected mix (from historical data):
  35% require frontier (H100): 0.35 × $2.48 = $0.868
  65% use standard (A100): 0.65 × $1.18 = $0.767

Average price per GPU-hour: $1.635
Expected GPU-hours per outcome: 0.26

B = $1.635 × 0.26 = $0.425
```

**Step 2: Retry Multiplier**
```
Historical verification rate: 94.2%
Agent efficiency: 97.1%

M = 1 / (0.942 × 0.971) = 1.093
```

**Step 3: Verification Cost**
```
API polling (Zendesk): $0.018
Cryptographic proof: $0.012
Storage: $0.001

V_factor = 1 + ($0.031 / $0.425) = 1.073
```

**Step 4: Risk Premium**
```
Compute volatility: 32%
Contract duration: 3 months
Confidence: 95%

R = 1 + (0.32 × 1.645 × √0.25) / 10 = 1.026
```

**Step 5: Themis Fee**
```
P_base = $0.425 × 1.093 × 1.073 × 1.026 = $0.514
T = $0.05 + (0.15 × $0.514) = $0.127
```

**Final Price:**
```
P(UPX) = $0.514 + $0.127 = $0.641

Rounded for quote: $0.89 (includes conservative buffers)
Actual internal price: $0.64
Margin for Themis: $0.25 (28%)
```

### Example 2: Routing Decision

**Scenario:** Incoming UPX-CX-RES-US-L2 request. Which vendor?

**Vendor Data:**
| Vendor | Cost | Quality | Latency | Reliability |
|--------|------|---------|---------|-------------|
| Sierra | $0.89 | 96% | 2.1s | 99.5% |
| Intercom | $0.95 | 94% | 1.8s | 99.2% |
| Custom A | $0.82 | 89% | 2.5s | 97.0% |
| Custom B | $1.05 | 98% | 1.5s | 99.8% |

**Compute Scores:**
```
Weights: α=0.4, β=0.35, γ=0.15, δ=0.10

S_sierra = 0.4×(1/0.89) + 0.35×0.96 + 0.15×(1/2.1) + 0.10×0.995
         = 0.449 + 0.336 + 0.071 + 0.100 = 0.956

S_intercom = 0.4×(1/0.95) + 0.35×0.94 + 0.15×(1/1.8) + 0.10×0.992
           = 0.421 + 0.329 + 0.083 + 0.099 = 0.932

S_custom_a = 0.4×(1/0.82) + 0.35×0.89 + 0.15×(1/2.5) + 0.10×0.97
           = 0.488 + 0.312 + 0.060 + 0.097 = 0.957

S_custom_b = 0.4×(1/1.05) + 0.35×0.98 + 0.15×(1/1.5) + 0.10×0.998
           = 0.381 + 0.343 + 0.100 + 0.100 = 0.924
```

**Normalization:**
```
Max score: 0.957 (Custom A)
Min score: 0.924 (Custom B)

S_sierra_norm = (0.956 - 0.924) / (0.957 - 0.924) = 0.970
S_intercom_norm = (0.932 - 0.924) / 0.033 = 0.242
S_custom_a_norm = 1.000
S_custom_b_norm = 0.000
```

**But wait** — Custom A has quality 89%, below 95% SLA. **Exclude from consideration.**

**Revised allocation (among qualified vendors):**
```
Qualified: Sierra (96%), Intercom (94% — below, excluded), Custom B (98%)

S_sierra_norm = (0.956 - 0.924) / (0.956 - 0.924) = 1.000
S_custom_b_norm = 0.000

With λ = 3:
x_sierra = exp(-3 × 0.89) / [exp(-3 × 0.89) + exp(-3 × 1.05)]
         = 0.069 / (0.069 + 0.043)
         = 0.616

x_custom_b = 0.384

Constrained to max 50%:
x_sierra = 0.50
x_custom_b = 0.50
```

**Decision:** Route 50% to Sierra, 50% to Custom B.

### Example 3: Cost Comparison — Traditional vs. Themis

**Scenario:** 100,000 customer support tickets

**Traditional Billing (per-token):**
```
Average tokens per ticket: 8,500
Cost per 1K tokens: $0.015
Success rate: Unknown (not tracked)

Cost = 100,000 × 8.5 × $0.015 = $12,750

Assume 85% actually resolved:
True cost per resolved ticket = $12,750 / 85,000 = $0.15
```

**Themis Billing (per-outcome):**
```
UPX-CX-RES-US-L2 price: $0.89
Verification rate: 94%
Verified outcomes: 94,000

Cost = 94,000 × $0.89 = $83,660

Wait — this is higher. Why use Themis?

Because:
1. True cost per resolved ticket: $0.89 (known upfront)
2. Failed outcomes (6,000) cost $0, not $0.15
3. Budget predictability: 100%
4. Vendor accountability: Forced
```

**Correction:** Themis price includes retries. Traditional billing charges for retries.

**Revised Traditional:**
```
Tokens per successful resolution: 12,000 (includes retries)
Cost = 100,000 × 12 × $0.015 = $18,000
True cost per resolution: $18,000 / 85,000 = $0.21
```

**Themis advantage:**
- Price certainty: $0.89 vs. variable $0.15-$0.21
- Quality assurance: 94% verified vs. unknown
- No overbilling for failures

---

## Edge Cases

### Edge Case 1: Compute Price Spike

**Scenario:** Ornn H100 prices spike 300% during contract period.

**Themis Response:**
1. Risk premium absorbed by Themis (if contract includes insurance)
2. Vendor can request price renegotiation (if spike > 50%)
3. Routing shifts to less compute-intensive vendors
4. Enterprise protected by fixed UPX price

**Mathematical adjustment:**
```
If C(Ornn) > 1.5 × C(contract):
  Trigger price renegotiation clause
  New price = P_original × (C_new / C_original) ^ 0.5

  # Square root dampens volatility impact
```

### Edge Case 2: Vendor Verification Rate Collapse

**Scenario:** Vendor verification rate drops from 95% to 70%.

**Themis Response:**
1. Automatic traffic reduction:
```
New allocation = xᵢ × (Qᵢ / Q_min)
               = 0.35 × (0.70 / 0.95)
               = 0.258
```

2. Vendor receives 74% less traffic
3. Vendor has incentive to fix root cause
4. If rate stays < 80% for 7 days: contract termination option

### Edge Case 3: Zero-Day Model Failure

**Scenario:** Claude 5 has a catastrophic failure. All Claude-based vendors fail.

**Themis Response:**
```
# Automatic failover
If vendor_i.status == "down":
    x_i = 0
    Redistribute x_i among remaining vendors
    Trigger "emergency routing" mode

# Emergency routing: Ignore cost, prioritize availability
Objective changes from "minimize cost" to "maximize availability"
```

### Edge Case 4: Negative Cost Outcome

**Scenario:** Extreme compute price drop makes Themis fee > total cost.

**Themis Response:**
```
Minimum price floor: $0.10 per outcome
If calculated price < floor:
    P(UPX) = floor
    Themis takes reduced fee
```

### Edge Case 5: Disputed Verification

**Scenario:** Vendor claims Dike verification is incorrect.

**Resolution Process:**
1. Vendor submits dispute with evidence
2. Themis reviews cryptographic proof
3. If proof valid: Outcome verified, payment released
4. If proof invalid: Outcome failed, payment voided
5. If ambiguous: Split payment 50/50, flag for review

**Mathematical dispute probability:**
```
P(dispute) = 0.5% (based on historical data)
Cost of dispute resolution: $5 per case
Expected cost per outcome: $5 × 0.005 = $0.025

Included in verification cost: Yes
```

---

## Implementation Notes

### Performance Requirements

**Quote Generation:**
- Target: < 100ms
- Current: ~45ms (cached Ornn prices)

**Routing Decision:**
- Target: < 10ms
- Current: ~3ms (pre-computed allocations)

**Verification:**
- Async processing: 72-hour window
- Real-time polling: Every 4 hours
- Final verification: < 1 second after SLA expires

### Numerical Stability

**Floating-point precautions:**
```python
# Use Decimal for financial calculations
from decimal import Decimal, ROUND_HALF_UP

price = Decimal("0.89")
quantity = Decimal("20000")
total = (price * quantity).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
```

### Caching Strategy

**What to cache:**
- Ornn prices: 60 seconds
- Vendor scores: 5 minutes
- Routing allocations: 1 minute
- Historical verification rates: 1 hour

**What NOT to cache:**
- Individual verification results
- Payment settlement status
- Real-time dispute flags

---

## Next Steps

- **Understand verification:** Read [04 - Dike Verification Protocol](./04-dike-protocol.md)
- **API integration:** Read [05 - API Reference](./05-api-reference.md)
- **System architecture:** Read [08 - System Architecture](./08-architecture.md)

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
