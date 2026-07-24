# Ontitled: Founder's Manifesto

## The Financial Clearinghouse and Verification Protocol for Machine Labor

---

**Version:** 1.0
**Date:** July 21, 2026
**Status:** Pre-Product / Pre-Revenue / Concept Validation Stage

---

## 1. The One-Liner

**Ontitled is the title and settlement layer for machine labor.**

We price AI work upfront and verify execution afterward. Enterprises stop paying for tokens, loops, and hallucinations. They pay exclusively for verified outcomes.

**What Ontitled IS:** The impartial third party that answers the question "Was the work actually done?" and settles payment accordingly.

**What Ontitled IS NOT:** A model provider. An agent framework. A consulting firm. We don't build AI. We verify that the AI you hired did what it promised.

---

## 2. The Broken World

### The Problem in Plain English

Enterprises today pay AI vendors for **consumption**, not **production**.

An agent can loop infinitely. It can hallucinate a solution. It can fail silently while logging a success. And the enterprise is billed for every token consumed along the way.

This is structurally insane. It would be like paying a plumber by the hour regardless of whether the leak was fixed. Like paying a contractor for materials and labor even if the roof still leaks. Like paying an employee their full salary even if they spent the day staring at the wall.

Yet this is exactly how AI billing works today.

### Why This Is Getting Worse, Not Better

As AI agents become more autonomous, the gap between **activity** and **outcome** widens:

- **The Loop Problem:** An agent trying to resolve a customer ticket might call five different LLMs, self-correct twenty times, and iterate for minutes before delivering an answer. The enterprise pays for all that cognitive thrashing.

- **The Hallucination Problem:** An agent can mark a ticket "resolved" when it actually provided nonsense. The customer reopens the ticket. The enterprise pays twice.

- **The Grade-Your-Own-Homework Problem:** AI vendors define their own success metrics. "Resolution" means what they say it means. They are both player and referee.

Alex Karp (Palantir CEO) stated on CNBC in July 2026: "Enterprises are livid about paying for AI tokens that produce no value. Something has gone completely wrong with current AI billing models."

Gartner estimates that over 40% of agentic AI projects are at risk of cancellation by 2027, citing unclear ROI and governance gaps.

The frustration is real. The structural fix is missing.

---

## 3. The Fix

### UPX Contracts: The Standardized Unit of Machine Labor

Ontitled introduces **UPX (Universal Process Execution) contracts** — standardized, tradeable units of verified machine labor.

A UPX contract specifies:
- **What** was done (the task type)
- **Where** it was done (the region/compliance zone)
- **How well** it was done (the quality threshold)
- **Within what window** it stayed done (the SLA period)

Example: `UPX-CX-RES-US-L2-Q95-72H`

Translation: One Level-2 US customer support case correctly resolved, at 95% verified quality, within a 72-hour window.

The enterprise pays a flat, upfront price for this contract. Not for tokens. Not for compute. Not for attempts. For the verified outcome.

### The Two-Layer Architecture

#### Themis: The Routing and Pricing Engine

**Named for:** The Titaness of divine law, order, and the scales of justice.

Themis is the financial brain. It:
1. **Prices** UPX contracts based on historical verification data, current compute costs (via integration with Ornn and other compute indices), and risk models
2. **Routes** tasks to the most cost-effective execution path available at that moment
3. **Settles** payments once verification is complete
4. **Issues** cryptographic proofs of verified work

Themis doesn't care which model executes the work. Claude, GPT, DeepSeek, or a swarm of local models — Themis is model-agnostic. It cares about the outcome.

#### Dike: The Verification Protocol

**Named for:** The goddess of justice who wielded the sword of enforcement.

Dike is the verification backbone. It is the answer to the question: "How do we actually know the work was done?"

This is the underdeveloped piece in most pitches. Let us develop it fully.

---

## 4. How Dike Actually Works

### The Core Principle

Dike verifies outcomes by checking **state changes in the enterprise's systems of record**, not by trusting the agent's self-report.

An AI agent can claim anything. Dike checks Salesforce, Zendesk, Jira, GitHub, or the enterprise's internal databases to verify that the claimed outcome actually occurred.

### The Verification Mechanisms

Dike uses three complementary verification methods:

#### 1. State Delta Verification (The Foundation)

Dike checks for **provable state changes** in systems of record:

- **Customer Support:** Was the ticket marked "Resolved" in Zendesk? Did the customer reopen it within the SLA window? Was there any human agent intervention after the AI's resolution?

- **Software Engineering:** Was the pull request merged? Did the code compile? Did it pass CI/CD regression tests? Is the issue still closed 72 hours later?

- **Data Operations:** Was the record actually written to the database? Does it match the schema? Can it be queried successfully?

Dike hooks into enterprise systems via secure, read-only APIs. It queries the actual state of the system — not what the agent claims, but what the database says.

#### 2. Temporal Verification (The 72-Hour Window)

Many AI "resolutions" fail the test of time. The agent provides an answer, the ticket is marked closed, and two hours later the customer reopens it because the answer was wrong.

Dike implements a **verification window** (typically 72 hours for customer support, variable for other tasks):

1. **T+0:** Agent claims resolution. Ticket marked closed.
2. **T+72H:** Dike checks the system of record again. If the ticket is still closed with no human intervention, the resolution is verified.
3. **If reopened:** The resolution is void. The enterprise is not charged. The vendor absorbs the cost.

This prevents the "hallucinated closure" problem. The agent can't game the system by marking tickets closed that aren't actually resolved.

#### 3. Cryptographic Attestation (The Proof)

When Dike verifies an outcome, it generates a **cryptographic proof**:

```json
{
  "proof_id": "prf_7f8a9b2c3d4e5f6",
  "ticker": "UPX-CX-RES-US-L2",
  "state_hash": "sha256:a3f5c7...",
  "verified_at": "2026-07-21T14:32:00Z",
  "slas_met": ["resolution", "no_reopen", "no_human_intervention"],
  "signature": "ed25519:9b8c7d..."
}
```

This proof contains:
- A hash of the verified state (e.g., ticket status, resolution timestamp, customer ID)
- Timestamps of verification checks
- SLA compliance status
- Cryptographic signature from Dike's secure enclave

This proof is immutable and auditable. It becomes the basis for settlement.

### How Dike Prevents Gaming (Goodhart's Law Resistance)

**Goodhart's Law:** When a measure becomes a target, it ceases to be a good measure.

If agents optimize to "pass Dike" rather than "solve the problem," the verification degrades. Dike resists this through:

#### Multi-Factor Verification

Dike doesn't rely on a single metric. A support resolution requires:
- Ticket marked resolved (agent action)
- Customer did not reopen within 72 hours (customer validation)
- No human agent touched the ticket post-resolution (operational validation)
- Sentiment analysis of customer reply (quality validation)

An agent gaming one metric fails the others.

#### Temporal Decoupling

The 72-hour window means agents cannot immediately verify their own work. They must wait. This breaks the tight feedback loop that enables rapid gaming.

#### Human-in-the-Loop Escalation

Dike flags edge cases for human review:
- Tickets closed with suspicious patterns
- Multiple rapid resolutions by the same agent
- Customer sentiment indicating dissatisfaction despite "resolution"

Human reviewers spot gaming patterns that algorithms miss. These patterns are then encoded into Dike's detection rules.

#### Cryptographic Binding

The state hash binds the proof to specific, immutable system states. An agent cannot retroactively claim a different state. The blockchain of verification (not necessarily a public blockchain, but a cryptographic ledger) creates an audit trail.

### The Dike SDK: Technical Implementation

Enterprises integrate Dike via a lightweight SDK:

```python
from ontitled import Dike

# Initialize Dike with your system of record
dike = Dike(
    api_key="ont_live_...",
    ticker="UPX-CX-RES-US-L2",
    sla_window_hours=72
)

# When your AI agent claims resolution
@dike.verify_outcome
def resolve_ticket(ticket_id, agent_response):
    # Your agent logic here
    zendesk.close_ticket(ticket_id, agent_response)
    return {"ticket_id": ticket_id, "status": "resolved"}

# Dike automatically:
# 1. Captures the state change
# 2. Waits the SLA window
# 3. Re-checks the system of record
# 4. Generates cryptographic proof
# 5. Signals Themis to clear or void the contract
```

The SDK handles:
- Secure API connections to systems of record
- State capture and hashing
- SLA window timing
- Proof generation and submission
- Dispute flagging

### Dispute Resolution

What happens when the vendor claims success but Dike reports failure?

**The Proof Prevails:** Dike's cryptographic proof is the authoritative record. It shows:
- The exact state of the system at verification time
- The hash of that state
- The timestamp of the check

**Escalation Path:**
1. Vendor reviews Dike's proof
2. If the proof is erroneous (e.g., Dike queried the wrong record), the vendor provides evidence
3. Ontitled's dispute resolution team (or eventually, an arbitration DAO) reviews
4. If Dike was wrong, the proof is corrected and the contract cleared
5. If the vendor was wrong, the contract remains void

The cryptographic audit trail makes disputes rare and resolvable.

### Security Model

**How does Dike access buyer systems without compromising security?**

1. **Read-Only Access:** Dike only reads state. It never writes. It cannot modify tickets, code, or databases.

2. **Scoped Permissions:** Enterprises grant Dike access to specific objects (e.g., tickets in a specific Zendesk view, issues in a specific Jira project).

3. **Encrypted Channels:** All API calls use TLS 1.3. Credentials are stored in hardware security modules (HSMs).

4. **Optional On-Premise:** For highly regulated enterprises, Dike can run as an on-premise sidecar that communicates only cryptographic proofs (not raw data) to Themis.

5. **Zero-Knowledge Proofs (Future):** For sensitive data, Dike will verify outcomes using zero-knowledge proofs — proving the work was done without revealing the work content.

---

## 5. Why This Is Inevitable

### The Historical Pattern

Every industrial revolution has required an independent verification layer to scale:

| Era | Raw Input | Verification Layer | Standardized Output |
|-----|-----------|-------------------|---------------------|
| 600 BCE | Gold ore | Assayed coinage (Croesus) | Standardized currency |
| 1870s | Crude oil | 42-gallon barrel + Platts grading | Tradeable petroleum |
| 1888 | Electricity | Induction meter (Shallenberger) | Kilowatt-hour billing |
| 2026 | GPU compute | Ornn Compute Price Index | Compute futures |
| **2026+** | **AI agents** | **Ontitled (Dike + Themis)** | **Verified machine labor** |

The pattern is consistent: when a new productive capacity emerges, the market cannot scale until there's a trusted way to measure and price its output.

### Why THIS Wave Follows the Pattern

**Structural Force #1: Asymmetric Information**

AI vendors know more about their systems' performance than buyers do. This information asymmetry creates market failure. Independent verification restores equilibrium.

**Structural Force #2: The Principal-Agent Problem**

Enterprises (principals) hire AI vendors (agents) to do work. The vendors' incentives (maximize token consumption) are misaligned with the enterprises' incentives (maximize outcomes). A third-party verification layer realigns these incentives.

**Structural Force #3: Market Maturation**

Early markets tolerate inefficiency. As AI deployment scales from experiments to core operations, enterprises demand the same rigor they apply to human labor: clear deliverables, verified outcomes, fair pricing.

### Honest Evaluation of the Analogy

**The differences from gold/oil/electricity are real:**

- AI work is abstract, not physical
- "Resolution" is subjective, unlike gold purity
- Existing outcome-based pricing (Zendesk, Intercom) means the market isn't waiting for a standard

**But the similarities matter more:**

- The fundamental need — independent verification of claimed output — is identical
- The market failure — paying for inputs instead of outputs — is identical
- The economic force — buyers demanding fair measurement — is identical

The historical cases verify that markets demand independent standards. They don't guarantee that Ontitled will be the standard. But they suggest that *some* standard will emerge. Ontitled aims to be it.

---

## 6. Why No One Else Can Build This

### The Competitive Landscape

| Competitor | What They Do | The Gap |
|------------|--------------|---------|
| **Nevermined** | Payment/metering with tamper-proof logs | They notarize vendor-reported outcomes, not independently verified outcomes |
| **Braintrust** | AI evaluation and observability | Evaluation criteria are set by the AI team, not the buyer; no settlement layer |
| **Paid.ai** | Convert agent actions to billing events | Relies on vendor-emitted signals, no independent verification |
| **Zendesk/Intercom/Sierra** | Outcome-based pricing | They verify THEIR OWN work — conflict of interest |
| **ServiceNow AI Control Tower** | Governance and measurement | No settlement layer; verification is IT-configured, not buyer-controlled |

### The Specific White Space

Ontitled occupies a specific, unclaimed position:

**Independent + Buyer-Controlled + Cross-Vendor + Verification + Settlement**

- **Independent:** Not the vendor grading their own homework
- **Buyer-Controlled:** The buyer defines "done," not the vendor
- **Cross-Vendor:** Works across all AI providers
- **Verification:** Actually checks systems of record
- **Settlement:** Clears payment based on verification

No competitor combines all five.

### Why Extension Is Harder Than It Looks

**Could Braintrust add settlement?** Yes, but their evaluation is developer-controlled, not buyer-controlled. Their core architecture assumes the AI team defines quality.

**Could ServiceNow extend to independent verification?** Yes, but their AI Control Tower is positioned as IT governance, not financial settlement. The organizational and technical pivot is significant.

**Could Zendesk/Intercom become independent verifiers?** No — they have a fundamental conflict of interest. They're paid when their AI works. They're incentivized to grade generously.

**Could Nevermined add independent verification?** Possibly, but their architecture is built around notarizing vendor claims. Pivoting to buyer-system verification is a fundamental redesign.

The white space is unoccupied because it requires a specific combination of capabilities that no existing player has prioritized.

---

## 7. The Path Forward

### Phase 1: The Oracle (Months 1–12)

**What:** Retrospective auditing of AI vendor performance

**How:** We obtain 90 days of a company's support ticket history and their AI vendor's invoice. We independently verify how many billed "resolutions" were actually resolved and stayed resolved.

**Revenue Model:** SaaS audit fees

**Goal:** Prove the problem exists at scale. Build verification algorithms. Establish credibility.

**The Real Test:** Not "was there waste?" but "will you pay us to prevent future waste?"

### Phase 2: The Routing Index (Months 12–24)

**What:** Real-time marketplace for machine labor

**How:** Enterprises submit "outcome orders" to the Ontitled Terminal. Themis dynamically routes tasks to the lowest-cost, highest-efficiency execution path available at that moment.

**Revenue Model:** Transaction fees on routed work

**Goal:** Become the default routing layer for AI work. Accumulate data on model performance, cost curves, and optimal routing paths.

**The Network Effect:** More enterprises → more routing data → better routing → more enterprises.

### Phase 3: The Derivatives Market (Years 3–5)

**What:** Financial derivatives for machine labor

**How:** Enterprises purchase futures contracts to lock in prices for future AI work (e.g., 10 million customer resolutions for Q4 at $0.80/resolution). Agent providers sell contracts to secure predictable revenue.

**Revenue Model:** Liquidity provision, hedging fees, insurance premiums

**Goal:** Become the CME Group for machine labor. Enable institutional-grade risk management for AI operations.

**The End State:** AI work is as tradeable, hedgeable, and bankable as oil, wheat, or interest rates.

### Why This Sequence Is the Only Viable Path

You cannot build a derivatives market without:
1. **Price discovery** (Phase 1: audit data reveals true costs)
2. **Liquid spot market** (Phase 2: routing creates volume and transparency)
3. **Risk management demand** (Phase 3: price volatility creates hedging need)

Skipping phases creates a hollow market. The Oracle phase validates the verification model. The Routing phase creates liquidity. The Derivatives phase captures the value of that liquidity.

---

## 8. The Closing Argument

### What Must Be True for This to Work

1. **Verification must be technically feasible** at a cost lower than the waste it prevents. This requires domain-specific standards that are objective enough to check.

2. **Enterprises must demand independent verification** strongly enough to overcome vendor resistance and integration friction.

3. **The market must remain fragmented** enough that cross-vendor verification is valuable. A single dominant AI vendor would internalize verification.

4. **Competitors must fail to extend** into the white space before we establish defensible network effects.

### Why, If Those Things Are True, Ontitled Is Inevitable

If verification is feasible, buyers demand it, the market stays fragmented, and competitors don't move first, then:

- The economic logic is unassailable: buyers will pay for verified outcomes
- The network effects are powerful: more verification data → better pricing → more buyers
- The moat deepens over time: the ledger of verified outcomes becomes irreplaceable
- The end state is natural: every significant AI deployment will route through a verification layer

Ontitled aims to be that layer.

### The Founder's Personal Stake

I am building Ontitled because I believe that:

1. **AI should be held to the same standard as human labor.** We don't pay humans for effort. We pay them for results. AI should be no different.

2. **The current billing model is extractive and unsustainable.** It rewards vendors for inefficiency. It punishes buyers for trusting AI. This will not stand.

3. **Independent verification is a public good.** Like weights and measures, like financial auditing, like building codes — it enables trust and trade at scale.

4. **Someone must build this.** If not Ontitled, then someone else. But the structural need is real. The market will not mature without it.

I am not building Ontitled to be a feature. I am building it to be infrastructure. The kind of infrastructure that becomes invisible because it is essential. The kind that every enterprise uses but few think about. The kind that, once established, cannot be unseated.

**Ontitled: Price the outcome. Verify the work. Settle the contract.**

---

**End of Manifesto**

*This document represents the founder's current thinking as of July 21, 2026. It is subject to revision as the market teaches us what we don't yet know.*
