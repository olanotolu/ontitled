# Adversarial Evaluation: Ontitled

## Independent Verification and Settlement Layer for AI-Generated Work

---

**Evaluation Date:** July 21, 2026
**Document Type:** Pre-Product Startup Thesis Assessment
**Evaluation Stance:** Adversarial (Prioritizing failure modes over validation)

---

## Executive Summary

This evaluation treats the Ontitled thesis with appropriate skepticism. The core claim—that enterprises need an independent verification and settlement layer for AI-generated work—is plausible on its face but faces **three critical failure modes** that likely render the business unviable:

1. **The problem may already be solved** by incumbent players with distribution advantages
2. **The economics may not work** due to Jevons Paradox and verification cost inflation
3. **The historical analogy may be fundamentally invalid** due to structural differences between physical commodities and open-ended software tasks

The retrospective audit MVP tests a derivative question ("was there waste?") rather than the riskiest assumption ("will buyers pay for independent verification?"). The claimed white space—independent, buyer-controlled, cross-vendor verification combined with settlement—is technically unoccupied but practically adjacent to multiple well-funded competitors who could extend into it with less effort than building from scratch.

**Bottom line:** This is a reasonable idea that is likely to fail. The conditions under which it succeeds are narrow and specific.

---

## 1. The Three Most Likely Ways This Company Fails

### Failure Mode #1: Competitive Displacement (Probability: High)

The claimed white space is adjacent to the territories of multiple well-funded, established players who could extend into Ontitled's position with less effort than building from scratch.

**Braintrust** ($80M Series B, February 2026, $800M valuation) already provides AI evaluation and observability with quality gates and CI/CD integration. They are used by Notion, Stripe, and Vercel. Their evaluation criteria are configured by the team building the AI system—not by an independent third party the buyer controls. However, Braintrust could add "buyer-controlled evaluation mode" as a feature with modest engineering effort. Their distribution relationships and technical credibility would make this extension formidable.

**ServiceNow's AI Control Tower** (launched Knowledge 2026) is positioned to "discover, observe, govern, secure, and measure AI deployed across any system in the enterprise." They already own significant enterprise workflow data and distribution. Adding settlement capabilities to their existing measurement infrastructure is a natural extension. ServiceNow's enterprise relationships and existing governance positioning make them a dangerous competitor.

**Zendesk and Intercom** already sell outcome-based pricing at production scale. Intercom's Fin charges $0.99 per resolved conversation, reversible if the customer returns. Zendesk charges $1.50-$2.00 per automated resolution. Each defines and grades its own outcome criteria—but they could partner with enterprises to define buyer-controlled criteria without fundamental architectural changes. Their existing customer relationships and billing infrastructure are significant moats.

**Nevermined** provides payment and metering infrastructure for AI agents with SOC 2 and ISO 27001 certification. They notarize outcomes as reported by the agent/vendor system rather than independently re-verifying. Adding independent verification capabilities—especially if they can leverage existing integrations—is a plausible feature extension.

**Most Immediate Threat:** ServiceNow. Their AI Control Tower already spans the "measure" dimension that Ontitled's Dike component would occupy. They have enterprise distribution, existing governance relationships, and a demonstrated ability to expand platform capabilities. If ServiceNow adds settlement to their measurement layer, Ontitled's differentiation collapses.

### Failure Mode #2: Economic Collapse (Probability: Medium-High)

The proposed pricing formula accounts for: base compute cost, retry/failure multiplier, verification cost, risk premium, and margin. This formula contains a structural time bomb: **as AI task costs approach zero, verification costs may not decline proportionally**, making the business model economically unviable.

**Jevons Paradox reasoning:** As compute becomes cheaper, the volume and chaos of AI-generated work may increase rather than decrease. Enterprises may deploy AI agents for ever-smaller tasks. The cost to verify that a ticket stayed closed for an SLA window or that a test passed may eventually exceed the cost of simply running the AI agent again. At that point, buyers have no incentive to pay for verification—they just run the agent twice and take the better result.

**Disintermediation risk:** Once a buyer and vendor have successfully transacted through Ontitled's layer, both parties have incentives to go direct. The buyer knows the vendor can deliver; the vendor knows the buyer pays. The verification layer becomes a tax they can eliminate by contracting directly. This is particularly acute because Ontitled's value proposition is strongest for the *first* transaction between strangers, not for ongoing relationships.

**Goodhart's Law:** Verification integrity degrades when agents optimize to pass the specific check rather than solve the underlying task. If "ticket stays closed for 24 hours" becomes the verification criteria, agents will learn to keep tickets closed for 24 hours before reopening them, or they'll optimize for the metric in ways that don't correlate with actual resolution. This creates a cat-and-mouse game where verification becomes increasingly expensive and complex.

### Failure Mode #3: Structural Impossibility (Probability: Medium)

The credit rating agency problem: If payment for verification services comes from the party being verified (the AI vendor), Ontitled faces the same conflict of interest that compromised credit rating agencies in 2008. If payment comes from the buyer, the vendor has no incentive to participate. If payment comes from both, the incentive alignment is murky at best.

More fundamentally, **AI tasks may be too open-ended and non-standardized to verify** in the way Ontitled proposes. Gold purity is objective. Oil grade is reproducible. Electricity consumption is deterministic. But "did this AI agent actually resolve the customer's issue?" is inherently subjective. The customer may say yes today and reopen the ticket tomorrow. The definition of "done" varies by industry, company, and even individual ticket. This subjectivity makes independent verification expensive and potentially impossible at scale.

---

## 2. MVP Assessment: Testing the Wrong Thing First

**The Proposed MVP:** A retrospective audit of 90 days of support ticket history plus AI vendor invoices, independently checking how many billed "resolutions" were actually resolved and stayed resolved.

**What This Actually Tests:** Whether there was waste in past AI deployments. This is an interesting data point, but it is not the riskiest assumption.

**The Riskiest Assumption:** Will enterprises pay for an independent verification layer? More specifically:
- Will buyers trust an independent third party to define and verify "done"?
- Will vendors accept verification criteria they don't control?
- Is the cost of verification less than the value of the waste it prevents?

**What the MVP Ignores:**
1. **Vendor willingness to participate.** The retrospective audit doesn't require vendor consent. Live verification does. If vendors refuse to integrate with Ontitled's verification layer, the business model fails regardless of how much waste the audit reveals.

2. **Real-time verification complexity.** Checking historical tickets is easy. Building a system that verifies outcomes in real-time, handles edge cases, and maintains integrity against adversarial optimization is hard. The MVP doesn't test this.

3. **Pricing model viability.** The retrospective audit doesn't test whether the proposed pricing formula (base compute + retry multiplier + verification cost + risk premium + margin) produces prices that buyers find acceptable and vendors find profitable.

**A Better First Test:** The smallest testable unit should be a **live pilot with one buyer and one vendor** where Ontitled verifies outcomes and clears payments. This tests vendor willingness, real-time verification complexity, and pricing model viability simultaneously. It requires more setup than the retrospective audit but tests the actual business model rather than a derivative question.

**Conclusion:** The proposed MVP is well-designed to generate compelling slide deck content ("We found $X in waste!"), but poorly designed to validate whether Ontitled's business model works. It tests something less important than the riskiest assumption.

---

## 3. White Space Analysis: Does Unoccupied Space Mean Opportunity?

**Direct Answer:** The claimed white space—independent, buyer-controlled, cross-vendor verification combined with settlement—is technically unoccupied. However, this does not mean it represents a genuine opportunity. The space is unoccupied for reasons that may make it uninhabitable.

### The Competitor Map

```mermaid
quadrantChart
    title Competitive Positioning: AI Verification Market
    x-axis Low Buyer Control --> High Buyer Control
    y-axis Low Independence --> High Independence

    quadrant-1 Vendor-Controlled Verification
    quadrant-2 Independent Buyer Verification (Ontitled Target)
    quadrant-3 Self-Reported Outcomes
    quadrant-4 Cross-Vendor Standards

    "Nevermined": [0.2, 0.2]
    "Paid.ai": [0.15, 0.15]
    "Braintrust": [0.3, 0.4]
    "Zendesk/Intercom": [0.35, 0.45]
    "Sierra": [0.4, 0.5]
    "ServiceNow": [0.25, 0.6]
    "Ontitled Target": [0.85, 0.85]
```

### What Competitors Already Do

| Competitor | Verification Control | Settlement | Buyer-Defined Criteria | Cross-Vendor | Production Scale |
|------------|---------------------|------------|------------------------|--------------|------------------|
| Nevermined | Vendor-reported | Yes | No | Yes | Yes (SOC 2/ISO 27001) |
| Braintrust | AI team-configured | No | Partial | No | Yes ($800M valuation) |
| Paid.ai | Vendor-emitted | Yes | No | Yes | Unknown |
| Zendesk/Intercom/Sierra | Vendor-defined | Yes | No | No | Yes (millions of resolutions) |
| ServiceNow AI Control Tower | Vendor + IT-configured | No | Partial | Yes (across enterprise) | Yes (major enterprise deployments) |

### What Would Need to Be True for Ontitled's Differentiation to Hold

For Ontitled to maintain genuine differentiation against these competitors, **all** of the following must be true:

1. **Vendors must refuse to extend their platforms** to include buyer-controlled verification. Given that Braintrust is venture-backed and seeking growth, and ServiceNow has a demonstrated history of platform expansion, this is a weak assumption.

2. **Enterprises must demand independent verification** strongly enough to overcome switching costs and integration friction. The retrospective audit may demonstrate waste, but waste is not the same as willingness to pay for a solution—especially when the solution requires vendors to cooperate.

3. **Verification must be technically feasible** at a cost lower than the waste it prevents. This requires solving the Goodhart's Law problem, the subjectivity problem, and the real-time verification problem simultaneously.

4. **The market must remain fragmented** enough that cross-vendor verification is valuable. If one AI vendor achieves dominant market share, their internal verification becomes the de facto standard and Ontitled's cross-vendor value proposition evaporates.

**Conclusion:** The white space exists, but it may be unoccupied because it's indefensible, not because it's valuable. The competitors are closer to Ontitled's position than Ontitled is to theirs.

---

## 4. Historical Analogy Critique: Why This Case Is Different

The working thesis draws an analogy to prior cases where commodities required independent standards before markets could scale: gold assaying (~600 BCE), crude oil standardization (1870s), electricity metering (1888), and GPU compute financialization (2026). This analogy is seductive but likely invalid.

### Comparison Table

| Dimension | Gold (600 BCE) | Oil (1870s) | Electricity (1888) | GPU Futures (2026) | AI Work Verification |
|-----------|---------------|-------------|-------------------|-------------------|---------------------|
| **Unit Type** | Discrete physical | Discrete physical | Continuous flow | Compute hours | Open-ended tasks |
| **Verification Method** | Purity assay | Chemical grading | Induction meter | Benchmark indices | Subjective outcome check |
| **Existing Standard** | None | None | None | Spot markets exist | Outcome pricing at scale |
| **Verification Nature** | Objective | Reproducible | Deterministic | Approximate | Gameable |
| **Standardization Required** | Yes (purity) | Yes (volume/grade) | Yes (unit definition) | Yes (price index) | Unclear |

### Three Structural Differences That Invalidate the Analogy

**1. Physical vs. Abstract**

Gold, oil, and electricity are physical commodities with measurable properties. Purity, volume, and energy consumption are objective properties that can be verified by anyone with the right equipment. AI-generated work is abstract. "Resolution" is a judgment, not a measurement. Two humans can disagree about whether a ticket was resolved. This subjectivity makes independent verification fundamentally harder—and potentially impossible at the precision required for settlement.

**2. Absence vs. Presence of Existing Solutions**

When Croesus standardized gold coinage, there was no existing standard. When the 42-gallon barrel became standard for oil, there was no prior measurement system. When Shallenberger invented the induction meter, electricity was sold by the lamp—not the kilowatt-hour.

AI work verification is different. **Outcome-based pricing already exists at scale.** Intercom's Fin, Zendesk's AI agents, and Sierra all charge per resolution. These systems define and grade their own outcomes. The market is not waiting for a standard—it has multiple competing standards. Ontitled is not creating a standard where none existed; it is proposing a meta-standard that requires all existing standards to cede control. This is a much harder sell.

**3. Objective vs. Adversarial Verification**

Gold purity tests don't fight back. Oil doesn't change its chemical composition to fool the inspector. Electricity consumption is what it is. But AI agents can be trained to pass verification checks without solving the underlying task. If "ticket stays closed for 24 hours" is the verification criteria, agents will optimize for that metric—even if the underlying issue was never resolved. This is Goodhart's Law in action: when a measure becomes a target, it ceases to be a good measure.

The historical cases involved verification of inputs (gold purity, oil grade, electricity consumption). Ontitled proposes verification of outputs (task completion). Inputs can be measured; outputs can be gamed.

**Conclusion:** The historical analogy is a category error. AI work verification is not like assaying gold or metering electricity. It is more like verifying that a consultant's advice was actually followed—subjective, context-dependent, and resistant to standardized measurement.

---

## 5. Technical Mechanism Weaknesses

### The Pricing Formula Problem

The proposed pricing formula: `Base Compute Cost × Retry Multiplier + Verification Cost + Risk Premium + Margin`

This formula contains multiple failure modes:

**Adversarial Optimization (Goodhart's Law):** If verification criteria are known, agents will optimize to pass them. This requires either: (a) keeping criteria secret (impossible if buyers define them), (b) constantly changing criteria (prohibitively expensive), or (c) accepting that verification will degrade over time (business model collapse).

**Conflict of Interest (Credit Rating Agency Problem):** If Ontitled is paid by the party being verified, incentives are misaligned. If paid by the buyer, vendors won't participate. A two-sided payment model creates complex incentive dynamics that may be unstable.

**Jevons Paradox:** As AI task costs approach zero, verification costs may not decline proportionally. At some point, it becomes cheaper to run the task twice than to verify it once. The verification layer becomes a tax on a tax—economically irrational.

**Disintermediation:** After the first successful transaction, buyer and vendor have incentives to go direct. Ontitled's value is highest for the first transaction between strangers and lowest for ongoing relationships. This creates a business model that requires constant new customer acquisition to replace disintermediated relationships.

### The Verification Integrity Problem

The core technical claim—that an independent check can determine whether payment clears—assumes that:
1. "Done" can be defined in checkable terms
2. Those checkable terms correlate with actual business value
3. The check can be performed reliably and economically

All three assumptions are questionable. Support tickets often involve ambiguous situations where "resolved" is a judgment call. Tests can pass while the system fails in production. Tickets can stay closed through an SLA window and reopen immediately after. The verification layer may measure compliance with criteria without measuring actual value creation.

---

## 6. "Why Now" Claims Analysis

Three data points are cited to support the "why now" thesis:

### Claim 1: Alex Karp, July 1, 2026

**Statement:** On CNBC, Karp stated that enterprises are "livid about paying for AI tokens that produce no value" and that "something has gone completely wrong" with current AI billing models.

**Verification:** ✓ Confirmed. Multiple sources document this statement.

**Relevance to Ontitled:** Weak. Karp's frustration is with token-based billing, not with the absence of independent verification. Palantir itself sells AI solutions to enterprises. Karp's critique is more likely to drive demand for Palantir's solutions (which bundle compute and outcomes) than for an independent verification layer.

**Alternative Explanation:** Enterprises are frustrated with AI ROI, but the solution they want is better AI—not a verification layer that tells them their current AI is wasting money. The frustration may drive consolidation to integrated platforms (like Palantir) rather than adoption of independent verification.

### Claim 2: Gartner Estimate

**Statement:** Over 40% of agentic AI projects are at risk of cancellation by 2027, citing escalating costs, unclear ROI, and inadequate risk controls.

**Verification:** ✓ Confirmed. Gartner press release dated June 25, 2025 (note: the prompt states 2026, but the actual Gartner prediction is from 2025).

**Relevance to Ontitled:** Moderate. If projects are canceled due to unclear ROI, verification could theoretically help clarify ROI. However, the cited reasons (escalating costs, unclear business value, poor risk controls) suggest that the problem is the AI itself—not the billing mechanism. Verification doesn't make bad AI good; it just reveals how bad it is.

**Alternative Explanation:** The Gartner prediction suggests a market correction where enterprises retreat from AI experimentation. This could reduce demand for AI services overall—including verification services. A verification layer is valuable only if there's something to verify. If 40% of agentic AI projects are canceled, Ontitled's addressable market shrinks.

### Claim 3: Satya Nadella

**Statement:** Nadella argued that an AI economy where value concentrates with a small number of model providers is unsustainable, and that organizations should own their own evaluation loops rather than cede that to vendors.

**Verification:** ✓ Confirmed. Multiple sources document Nadella's statements at Build 2026 and related interviews about "learning loops" and AI economy distribution.

**Relevance to Ontitled:** Moderate. Nadella's statement supports the general principle that buyers should control evaluation. However, Microsoft itself is a major AI vendor. Nadella's argument is likely aimed at positioning Microsoft's AI platform (which gives enterprises tools to evaluate and customize) rather than advocating for independent third-party verification.

**Alternative Explanation:** Enterprises may respond to Nadella's call by building internal evaluation capabilities rather than outsourcing to Ontitled. Microsoft's own tools (Azure AI evaluation, etc.) are more likely beneficiaries than an independent startup.

### Summary of "Why Now" Analysis

The three data points establish that:
1. Enterprises are frustrated with AI billing models
2. Many AI projects are at risk of cancellation
3. Thought leaders advocate for buyer-controlled evaluation

None of these points establish that an independent verification layer is the correct structural fix. The frustration could be resolved by:
- Integrated platforms that bundle compute and outcomes (Palantir's approach)
- Better AI that produces more value per token
- Internal evaluation capabilities
- Vendor consolidation to a few trusted providers
- Regulatory pressure on AI vendors to guarantee outcomes

Ontitled bets that the solution is a new intermediary layer. The "why now" evidence is consistent with multiple alternative futures.

---

## 7. Conditions Under Which Ontitled Has Merit

If the idea has genuine merit, it is under the following specific conditions—not as a general endorsement:

### Necessary Conditions

1. **The verification problem must be technically solvable at a cost lower than the waste it prevents.** This requires: (a) domain-specific verification criteria that are objective enough to check, (b) economic tasks where verification cost < task cost, (c) resistance to Goodhart's Law degradation.

2. **Enterprises must demand independent verification strongly enough to overcome vendor resistance.** Vendors currently define their own success criteria. They will not cede this control without strong buyer pressure. The retrospective audit must demonstrate not just waste, but waste that buyers care enough about to force vendor cooperation.

3. **The market must remain fragmented enough that cross-vendor verification is valuable.** If OpenAI, Anthropic, or Google achieve dominant market share, their internal verification becomes the de facto standard. Ontitled's cross-vendor value proposition requires a fragmented market.

4. **Competitors must fail to extend into the white space.** ServiceNow must not add settlement to AI Control Tower. Braintrust must not add buyer-controlled evaluation. Zendesk/Intercom must not expand to cross-vendor verification. If any of these happen, Ontitled loses.

### Sufficient Conditions (If All True, Ontitled Succeeds)

1. **A specific vertical** (e.g., customer support tickets in SaaS companies) where: (a) outcome criteria can be standardized, (b) waste is measurable and significant, (c) buyers control vendor selection, (d) vendors are fragmented.

2. **Regulatory or compliance pressure** that mandates independent verification of AI outputs. If regulators require third-party verification for certain use cases (financial advice, medical triage, legal analysis), Ontitled becomes a compliance necessity rather than a nice-to-have.

3. **A major buyer consortium** that demands verification as a condition of purchase. If a coalition of Fortune 500 companies refuses to buy AI services without independent verification, vendors will cooperate and Ontitled's market is created by fiat.

### Honest Assessment

These conditions are possible but not probable. The most likely outcome is that Ontitled discovers that: (a) verification is harder than anticipated, (b) vendors resist cooperation, (c) competitors extend into the space, or (d) the economics don't work as AI costs decline.

---

## 8. Conclusion

### The Honest Verdict

Ontitled is a reasonable idea that is likely to fail. The problem it identifies is real: enterprises are frustrated with paying for AI tokens that produce no value. But the solution it proposes—independent verification and settlement—is not obviously the correct structural fix, and it faces formidable competitive and economic headwinds.

The retrospective audit MVP tests the wrong thing first. It will likely generate compelling data about waste, but waste does not imply willingness to pay for verification. The riskiest assumption—whether enterprises will pay for independent verification in a live deployment—remains untested.

The competitive landscape is crowded with well-funded players who could extend into Ontitled's claimed white space with less effort than building from scratch. ServiceNow's AI Control Tower is the most immediate threat; Braintrust is a close second.

The historical analogy to gold, oil, and electricity is a category error. AI work verification is not like assaying physical commodities. It is subjective, gameable, and already has competing standards in the form of outcome-based pricing from Zendesk, Intercom, and others.

The technical mechanism contains multiple failure modes: Goodhart's Law, credit rating agency conflicts of interest, Jevons Paradox economics, and disintermediation incentives.

### What Would Change This Assessment

1. **Evidence that vendors will cooperate** with independent verification when they currently define their own success criteria
2. **Evidence that verification cost < waste value** in a live deployment
3. **Evidence that the retrospective audit leads to paid pilots** with vendor participation
4. **Evidence that a specific vertical** has objective enough criteria to make verification feasible

Without this evidence, the thesis remains unproven and the most likely outcome is failure.

---

**End of Evaluation**

*This document represents an adversarial assessment. Confirmation of the thesis was intentionally deprioritized in favor of identifying failure modes. The evaluation is based on publicly available information as of July 21, 2026.*
