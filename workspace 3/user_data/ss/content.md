![Image](/home/novix/workspace/user_data/ss/assets/image_0013.png)

![Image](/home/novix/workspace/user_data/ss/assets/image_0012.png)

![Image](/home/novix/workspace/user_data/ss/assets/image_0011.png)

RESEARCH

NEWS

COMPANY

## Reducing LLM Costs 50% Using BestExecution for Intelligence

July 21, 2026 Several Authors

![Image](/home/novix/workspace/user_data/ss/assets/image_0010.png)

Ship is an endpoint that provides output indistinguishable from the model you're already using, at half the price.

![Image](/home/novix/workspace/user_data/ss/assets/image_0009.png)

<!-- page-break -->

Just replace model="&lt;original&gt;" with model="shiplike/&lt;original&gt;" , and all requests will be 50% less expensive. We take the risk that any individual request costs us more to execute. This allows you to either (A) reduce costs on existing workflows or (B) increase quality by using more intelligence with the same budget. Updates Contact Docs Dashboard

We achieve this by doing inference-time optimization with two guarantees: capability equivalence and behavioral equivalence. Capability equivalence means that any problem solved by your original model will also be solved by Ship . Behavioral equivalence means that you don't need to change the prompt when you start using Ship ; you'll get the same behavior (everything outside the capabilities, e.g. the shape of the output, average number of tool calls, instruction following, etc. remains the same).

By defining and measuring reference-relative quality, we can turn model quality into a contractual service level. Ship is the first endpoint to offer a quality SLA alongside its price and availability commitments.

This blog post lays out:

1. Evidence that Ship maintains capability equivalence and behavioral equivalence
2. The tech powering Ship : scaling Inference-Time Optimization
3. What people have built with Ship
4. Our quality SLA

Base model

GPT-5.6 Sol

Equivalent Performance, at a fraction of the cost

GPT-5.6 Sol

Ship

<!-- page-break -->

![Image](/home/novix/workspace/user_data/ss/assets/image_0008.png)

## System Performance: Capability Equivalence &amp; Behavioral Equivalence

We make two claims, and measure each directly:

- Capability equivalence : any problem your reference model ( ref ) solves, Ship also solves. Formally, 1 - P(Ship solves x | ref solves x) &lt; ε .
- Behavioral equivalence : conditioned on the same input, Ship 's outputs are drawn from the same distribution of behaviors as the reference model's - same output shapes, tool-use patterns, formatting, refusals, and so on. It should

<!-- page-break -->

solve the problems equally well. Formally, distance(P\_D(x, behavior(Ship(x))), P\_D(x, behavior(ref(x)))) &lt; ε for any given distance metric and behavior. Updates Contact Docs Dashboard

This doesn't mean Ship gives literally identical outputs. Even the same language model isn't identical to itself under that definition: call the reference model twice and you get different tokens, a different number of tool calls, different phrasing. Instead, capability and behavioral equivalence is a claim about distributions : conditioned on the same input, Ship 's outputs are drawn from a sufficiently similar distribution of behaviors as the reference model's.

To measure these, we use two sets of evaluations:

1. Public benchmarks, which are easily reproducible
2. Private benchmarks, which other companies run for us

The public benchmarks let anyone verify our results. The private benchmarks show that we haven't overfit, because they come from third parties who run real applications. This means Ship generalizes to distributions it was never trained on, constructed from real-world use. In this blog post, we detail the public benchmarks. As our partners run private benchmarks, we'll report them as well.

## Capability Equivalence

Capability equivalence asks a single question: when your reference model can solve a problem, does Ship still solve it?

Across a large number of benchmarks, Ship maintains the same performance as the reference model.

## Solve rate by benchmark

± margin of error, with average cost per task beneath each score. Ship performance falls squarely within the margin for all benchmarks.

<!-- page-break -->

![Image](/home/novix/workspace/user_data/ss/assets/image_0007.png)

This also holds true for private benchmarks (see What People Have Built with Ship ).

Appendix: More On Capability Equivalence More

## Behavioral Equivalence

In addition to solving the same problem, you want the problem to be solved without having to modify your prompts or harness. We call this behavioral equivalence. It matters for two reasons: (A) it guards against overfitting - a system can ace traditional benchmarks while behaving worse in ways the benchmark doesn't capture - and (B) it means you don't have to invest excessive engineering effort to use the new system. Ship was optimized for behavioral equivalence to maintain a low switching cost for users.

<!-- page-break -->

![Image](/home/novix/workspace/user_data/ss/assets/image_0006.png)

Ship behaves more like Claude Opus 4.8 ( 91% distributional overlap ) than same-family models (64-68%) or unrelated models (35-43%).

Today, our definition of behavioral equivalence is arguably too strong: we're probably preserving properties that don't matter in production and don't affect the end-user experience. For example, our current measurements include output length. It's not clear this matters for practical use, and in many cases it might be better to generate fewer tokens to save cost. In the future we'll refine the definition to capture just the characteristics that matter; today, we've tried to match as closely as possible every property we measured.

Appendix: More On Behavioral Equivalence

More

## System Description: Scaling Inference-Time Optimization

How do we achieve capability and behavioral equivalence? The naïve approaches (always using one model or adding a simple router) don't work. Different models behave differently when given the same prompt and have different capabilities. Those approaches also miss optimizations required to make cache-aware decisions, deal with agentic tasks in complex environments, and miss other optimizations which can drive capability and behavioral equivalence. Instead, Ship optimizes the execution of each request at inference time. Updates Contact Docs Dashboard

<!-- page-break -->

## Inference-time optimization

Inference optimization is analogous to just-in-time compilation in compilers. Traditional compilers (like traditional training) optimize for the general case, because they have not observed the specific request at run-time. The additional information from inference-time allows for more effective optimization.

![Image](/home/novix/workspace/user_data/ss/assets/image_0005.png)

LLMs are typically frozen after training. A frozen model cannot adapt every part of its execution to the specific request in front of it: the compute allocation and available behavior are largely fixed by training, decoding settings, and the prompt.

An analogy to program compilation is useful. A traditional ahead-of-time compiler must produce a general binary before it sees real runtime inputs. A just-in-time (JIT) compiler can improve execution after observing those inputs, specializing hot paths and spending optimization effort where it pays. The important idea is not compilation itself; it is that runtime information enables optimizations that were unavailable ahead of time.

Model training is analogous to ahead-of-time compilation: it produces a frozen model before that model has seen your request. Ship is analogous to just-in-time compilation. At inference time, Ship

<!-- page-break -->

## CONTENTS

System Performance:

Capability Equivalence &amp; Behavioral Equivalence

Capability Equivalence

Behavioral Equivalence

System Description: Scaling Inference-Time Optimization

What People Have Built with Ship determines how much compute to spend and which method should handle the request. A method can be a model, a model with a harness and tools, a cascade, an ensemble, a plain program, a model modified in weight-space or activation-space, or a combination of the above. Like a JIT system, Ship benefits from runtime information unavailable during training: the request itself, together with verified outcomes from similar real traffic. Updates Contact Docs Dashboard

Given a set of models and ways of intervening on those models, there is a combinatorial number of methods for fulfilling a request. This makes it a search problem, analogous to Chess or Go; our aim is to build the equivalent of AlphaGo or AlphaZero. This is best execution: fulfilling requests in the best possible way given a set of models.

That's why Ship can cut cost by ~50% while maintaining capability and behavioral equivalence: it optimizes how each request is executed. We're building towards a world where everyone gets the best possible intelligence per dollar.

## What People Have Built with Ship

Cutting inference cost in half isn't just a line item. It changes what's economically possible to build. Because Ship is a drop-in replacement, teams saw the savings without touching their prompts or their evals. Here's what they did with them.

Kilo:

Ship Lowers LLM Bills

Ari Messer, Head of Partnerships @ Kilo Code

We've run Ship as a stealth model with trillions of tokens processed from Kilo Code users all over the world. Across

<!-- page-break -->

![Image](/home/novix/workspace/user_data/ss/assets/image_0004.png)

that traffic, it worked like a charm at half the cost. By making top-tier intelligence dramatically more affordable, Ship quickly became an indispensable daily driver for developers and knowledge workers, powering everything from code generation to complex agentic workflows. Excited to see it move out of stealth! Updates Contact Docs Dashboard

Baz:

Ship Makes New Use Cases Economical

Nimrod Kor, CTO @ Baz:

Having seen millions of PRs, we've built a benchmark of the 168 hardest bugs our systems have encountered. This is the benchmark we use internally to improve our harness and to choose what models to put in production.

Swapping in Ship for our reference model was very easy, just changing a base\_url and model string. We saw no statistical difference in performance on our benchmark. When we put it in production, user satisfaction and all of the end-user metrics we measure stayed steady.

The cost savings have let us ship new features that otherwise wouldn't have been economical. We were already spending millions of dollars on our existing feature set, and our usage has more than doubled. Ship lets us support new features like plan review, security review, and merge review.

## Quality SLA

Model APIs traditionally guarantee infrastructure: uptime, rate limits, and latency. They do not guarantee that the intelligence delivered remains at a particular level.

Ship makes that possible by treating the reference model as a quality grade. When you request ship-like/&lt;original&gt; , you are not asking us to run a particular implementation. You are asking us to deliver the reference model's capabilities and behavior within defined statistical tolerances.

<!-- page-break -->

That grade has two requirements: Ship must retain the reference model's capabilities, and its behavior must remain within some bounds (e.g. the reference model's own run-to-run variation). Updates Contact Docs Dashboard

Once quality has a grade, best execution becomes well-defined: find the least expensive execution that satisfies it (or the highest quality). Ship can change how a request is fulfilled, but it cannot silently lower the grade. For our public product, this is an SLO (what we measure and build around).

Our quality SLA turns that measurement into a commitment. We take the execution risk, the cost risk, and the risk that optimization degrades quality. Enterprise customers with an SLA receive a specified grade of intelligence at a specified price.

## Get Started

Ship is our first product for best-execution: an endpoint that delivers the highest intelligence per dollar. By scaling inference-time optimization, it can shift the Pareto curve for intelligence: 50% lower cost regardless of the model you were using before.

We're excited to release more endpoints like this, and to share more about the underlying research.

## Get started:

- Swap your first request: replace model="&lt;original&gt;" with model="ship-like/&lt;original&gt;" . See the docs.
- Interested in a quality SLA or enhanced rate limits? Talk to our team.

Want Ship for a reference model we don't yet support, or have a workload to test? Get in touch.

<!-- page-break -->

![Image](/home/novix/workspace/user_data/ss/assets/image_0003.png)

![Image](/home/novix/workspace/user_data/ss/assets/image_0002.png)

Several Authors

Home

News

Docs

Dashboard

Contact

© Thesean 2026. All Rights Reserved. Terms and Conditions / Privacy Policy

"The Antikythera Mechanism" by Thomas Weibel is licensed under CC BY 4.0. This work has been modified from the original.

Dashboard

![Image](/home/novix/workspace/user_data/ss/assets/image_0001.png)