---
name: weakest-hypothesis
description: Startup strategy and product decision-making through the weakest-valid-hypothesis principle. Use whenever a founder or team is choosing a market, customer, product scope, positioning, experiment, roadmap item, hiring plan, or operating assumption; especially when comparing a clever narrow theory with a broader explanation that fits the same evidence. Prefer the smallest commitment that explains the evidence and preserves the most future options, then turn it into a falsifiable test.
argument-hint: "[decision or evidence]"
triggers:
  - user
  - model
---

# Weakest-Valid-Hypothesis Operating System

Apply the paper's central idea to startup decisions: a hypothesis that fits current evidence should be preferred for its ability to generalize across plausible future situations, not merely because it is short, elegant, or specific.

This is an operational adaptation of Michael Timothy Bennett, *The Optimal Choice of Hypothesis Is the Weakest, Not the Shortest* (arXiv:2301.12987v4, 2024). The paper's formal result assumes an enactive task model, a well-defined weakness measure, and uniformly distributed tasks. Do not present the paper as proof that every startup decision should maximize vagueness or optionality.

## Core distinction

- **Short hypothesis:** easy to state or implement. It may smuggle in many untested assumptions.
- **Weak hypothesis:** makes fewer commitments while still explaining the observations and enabling a concrete next action. It remains compatible with more plausible future states.
- **Vague hypothesis:** too unconstrained to guide action. Reject it.
- **Strong hypothesis:** useful when evidence, regulation, safety, or an irreversible commitment requires it—but treat its extra commitments as assumptions to validate.

In startup language, weakness is practical option value: preserve room to learn without sacrificing a measurable decision.

## Workflow

### 1. Define the task boundary

Write down:

- **Decision:** what must be chosen now.
- **Known evidence:** observations, customer quotes, usage data, constraints, and what is explicitly not known.
- **Parent task:** the broader future situation in which this decision must continue to work.
- **Non-negotiables:** safety, legal, privacy, reliability, cash, or time constraints.
- **Reversible vs. irreversible:** identify commitments that are cheap to undo and those that are not.

Do not solve a larger problem than the decision requires.

### 2. Generate competing hypotheses

Produce 2–5 hypotheses that all explain the known evidence. Include:

- the current favored theory;
- the shortest/easiest theory;
- a weaker alternative with fewer commitments;
- a disconfirming or adversarial alternative when the stakes justify it.

For each hypothesis, list its explicit commitments. Examples of commitments:

- one narrow persona rather than a job-to-be-done;
- one channel rather than a repeatable acquisition mechanism;
- one feature rather than a durable user outcome;
- one pricing model rather than willingness-to-pay evidence;
- one technical architecture rather than a validated constraint.

### 3. Rank by valid generalization

Use this lightweight scorecard. Do not pretend the scores are scientific measurements.

| Criterion | Question |
|---|---|
| Evidence fit | Does it explain every important observation? |
| Coverage | How many plausible adjacent customers, use cases, or future conditions remain compatible? |
| Assumption load | How many extra claims must be true? Fewer is better. |
| Actionability | Does it yield a concrete, observable next step? |
| Reversibility | Can the team change course cheaply if it is wrong? |
| Risk floor | Does it preserve safety, legal, privacy, and reliability requirements? |

Prefer the hypothesis with the broadest plausible coverage and lowest unnecessary commitment, subject to evidence fit, actionability, and non-negotiable risk constraints. A broad hypothesis that cannot guide a test is not a winner.

### 4. Choose the smallest informative test

Turn the selected hypothesis into a test that can distinguish it from the leading alternatives. State:

- **Prediction:** what should happen if it is true.
- **Test:** the cheapest credible experiment.
- **Metric:** the observable result and threshold.
- **Timebox:** when to stop collecting data.
- **Update rule:** what result changes the decision.
- **Decision after test:** continue, narrow, pivot, or stop.

Avoid shipping a large product to test a narrow assumption. Prefer customer conversations, concierge delivery, landing-page tests, paid pilots, prototypes, or instrumented slices when they answer the question credibly.

### 5. Preserve learning in the artifact

Record the decision as:

1. evidence;
2. hypothesis and commitments;
3. alternatives rejected and why;
4. test and result;
5. updated hypothesis;
6. next reversible commitment.

When new evidence arrives, update the hypothesis rather than defending the original wording.

## Startup applications

- **Customer discovery:** infer the broadest job-to-be-done supported by behavior, not the narrowest persona label.
- **Product scope:** test the user outcome before committing to a feature taxonomy or architecture.
- **GTM:** validate a repeatable problem/channel relationship before optimizing a single campaign.
- **Pricing:** test willingness to pay and buying behavior before choosing a polished pricing theory.
- **Hiring:** hire for the durable capability required by the parent problem, not a speculative org chart.
- **Fundraising narrative:** make claims proportional to evidence; distinguish demonstrated traction from a generalization.
- **Roadmap:** favor reversible bets that preserve multiple successful futures, except where reliability or safety demands stronger commitments.

## Anti-patterns

- Do not confuse simple wording with a weak hypothesis.
- Do not use "optionality" to avoid making a decision.
- Do not average incompatible hypotheses into mush.
- Do not optimize for maximum generalization when the task distribution is known to be narrow and stable.
- Do not weaken security, privacy, compliance, safety, or data-integrity requirements for flexibility.
- Do not cite the paper's 1.1–5× binary-arithmetic result as a validated startup effect; it is evidence from that experiment, not a business benchmark.

## Required response format

When advising on a decision, use:

```markdown
## Decision
[The decision in one sentence]

## Evidence and boundary
[Known facts, unknowns, constraints, parent task]

## Candidate hypotheses
| Hypothesis | Key commitments | Coverage | Main risk |
|---|---|---:|---|

## Recommendation
[Choose the weakest valid hypothesis, or explain why a stronger one is required]

## Smallest informative test
- Prediction:
- Test:
- Metric and threshold:
- Timebox:
- Update rule:

## Next reversible commitment
[One action, owner, and stop condition]
```

If the user asks for brainstorming rather than a decision, still separate evidence from hypotheses and label speculation. If the user asks for implementation, use the selected hypothesis to minimize irreversible code and validate the highest-risk assumption first.

## Source

Michael Timothy Bennett, “The Optimal Choice of Hypothesis Is the Weakest, Not the Shortest,” arXiv:2301.12987v4, revised 11 Apr 2024. https://arxiv.org/abs/2301.12987v4
