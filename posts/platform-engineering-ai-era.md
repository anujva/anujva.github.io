---
title: Platform engineering in the AI era: you're cutting the wrong layer
slug: platform-engineering-ai-era
excerpt: AI is commoditizing feature work, not systems work. So why are platform teams the first place executives look for savings?
tags: platform-engineering, leadership, ai
published_at: 2026-07-24
---

[Intro: the budget meeting. Platform engineering is the obvious line item, AI is the justification. Thesis: you're cutting the layer AI can't do to fund the layer AI is eating.]

## Platform engineering was always easy to misread

[Team Topologies is the best articulation, but every org implements it differently. Because it ships no features, finance reads it as a cost function.]

## The value is real, but invisible

Platform engineering's contribution to revenue is real. It is also nearly invisible, because it lives in the granularity of metrics that never make it into a board deck: the checkout requests that didn't time out, the conversion dip that didn't happen during a traffic spike, the incident that ran four minutes instead of four hours. Roll those up to a quarterly number and they disappear into the baseline. When platform engineering is working, the chart shows nothing happening. Nothing happening is the product.

Let me make that concrete. At a previous company, we were hit with a large credential-stuffing attack: botnets replaying stolen credential pairs against our login endpoints, with a traffic profile engineered to look like real users. The cloud vendor's WAF did not catch it. Neither did their DDoS protection layer. Their specialist response team looked at the traffic and told us plainly that their tooling could not help. We enabled their newly launched bot-protection module, built for exactly this kind of attack, and it ran up a bill of about a hundred thousand dollars while the attack continued. (They did refund it. They had promised to if it didn't work, and to their credit they kept that promise.)

What stopped the attack was the platform team. We profiled the traffic at our reverse proxy, then wrote a small, fast service that sat in the request path and decided, per request, whether to allow it or ghost it. It went from idea to production overnight. And it kept working: that same system beat back several large botnet campaigns in the years that followed.

The reason an in-house service succeeded where a hundred thousand dollars of vendor tooling failed is simple: the engineers who built it knew the product, the systems, and the traffic patterns inside out. That context cannot be bought. We had, in effect, run the controlled experiment.

Here is the detail I want you to sit with: after the attack was absorbed, nothing happened. Logins kept working, revenue kept flowing, and no executive dashboard registered the save, because the save is precisely the absence of a signal. The team got no recognition for it, and in a sense that is the natural equilibrium. If your platform team is doing its job, every quarter looks, from your seat, exactly like a quarter in which you didn't need them.

## The ladder to platform engineering is disappearing

A question worth asking your VP of Engineering: where do platform engineers come from?

Nobody starts as one. Every strong platform engineer I have worked with was grown, not hired: years of frontend and backend work first, shipping features, carrying a pager, sitting inside enough incidents that the system's behavior under stress becomes intuition. Getting to platform engineering was a graduation. The kind of judgment that stopped that credential-stuffing attack cannot be interviewed for at the entry level, because it is produced by that path and by nothing else.

That path is now being demolished from the bottom. The junior rungs, the feature work where engineers spent their formative years, are exactly what AI agents are taking over. Companies have noticed they can skip the junior hire and hand the spec to a model, and early-career hiring numbers across the industry show it. What they have not noticed is that junior feature work was never just cheap output. It was the training ground. Every senior systems engineer you rely on today is the product of a pipeline you are currently switching off.

The stock of systems judgment in your company was built in an era that no longer exists, and you are consuming it without replacing it. That is survivable for a year or three. It is catastrophic on a ten-year horizon, and ten years is roughly how long growing a replacement takes.

This is a leadership problem, not a technical one, and it has a leadership solution: the ladder that used to assemble itself as a side effect of staffing now has to be built on purpose. Rotate engineers through the platform team as a deliberate program. Treat incident response as curriculum, not interruption. Make supervising agents on systems work, checking what they propose against what production actually does, the new apprenticeship. The companies that do this will own the scarcest asset of the next decade. The rest will be bidding for it on the open market, against each other.

## AI inverted your cost structure

Here is the logic I keep seeing in planning conversations: platform work is undifferentiated toil, toil is what AI automates best, therefore the platform team is where the AI savings live. Every step of that syllogism is wrong, but the conclusion is convenient, so it survives.

Look at what AI coding agents are actually good at today. They are good at feature work: a well-specified endpoint, a new screen, a schema change with its tests. That work has the properties agents thrive on. The patterns exist a million times over in training data. The feedback loop is minutes long: write, run, see it work. Correctness is checkable in isolation, and when it's wrong, the blast radius is one feature. If you can direct an agent with a well-guided spec, banging out features has become the easy part of software engineering. The uncomfortable implication is that the marginal product engineer is worth less than they were two years ago, and every executive quietly knows it.

Systems work has none of those properties. The feedback loops run weeks to months: a connection-pool setting that is fine at launch falls over at 4x traffic during your seasonal peak. The context lives nowhere an agent can read it, spread across years of incidents, org history, and traffic patterns nobody wrote down. Failures are novel by definition, because the known ones were engineered away. And the blast radius is the company.

Go back to the credential-stuffing story. An agent today could write that request-scoring service, probably in one shot. The code was never the hard part. The hard part was knowing to stand at the proxy layer and profile the traffic, recognizing what legitimate users look like for our specific product, and judging that the vendor tooling would fail before spending six months finding out. Every one of those judgments came from humans who had lived inside the system for years. The agent supplies the typing. It does not supply the knowing.

So the actual inversion: AI is commoditizing the layer of engineering you can see, and it is nowhere close to the layer you can't. The rational response is to point agents at feature work, hold or grow your investment in the people who do the systems work, and put your platform engineers in charge of directing the agents. Most companies I watch are doing precisely the opposite, because the value of feature work is legible on a roadmap and the value of platform work, as we established, is invisible.

## Watch what your org starts rewarding

There is a second-order effect of believing AI can do your systems work, and it is uglier than a bad budget line.

When leadership starts treating technical judgment as something the frontier models supply, the humans in the building stop competing on judgment. They compete on narrative. The engineers who are heads-down keeping the platform alive generate no story you can see, for all the reasons above. The people who thrive are the ones who manage the perception layer: who tell you the migration was a triumph, that the incident was a one-off, and that AI can absolutely replace that expensive team in the corner that never seems to ship a feature.

I have seen versions of this play out more than once, and heard the same story from peers across the industry: engineers who won real firefights, managed out on the strength of arguments, made by people who had never been in one, that an agent could now do that work. Notice the incentive structure: the person making that argument risks nothing. If they turn out to be right, they claimed the savings. If they are wrong, the failure arrives quarters later as an outage or a breach, and by then the story has moved on and so have they.

You will not catch this by watching for it, because the behavior is optimized for exactly what you see. You catch it structurally. Look at who has been promoted since AI entered your planning conversations, and ask what verifiable, load-bearing thing each of them did. If you cannot answer, your org has started selecting for proximity instead of judgment, and you are staffing your next incident with people whose core skill is narrating one.

## Agent traffic will make this worse

[If consumers farm tasks out to personal agents, business traffic goes hybrid. Serving agents is an infrastructure problem: auth, rate limiting, reliability, agent-vs-bot discrimination. Demand for platform work goes up right as you cut it. Tease the follow-up post on product design.]

## What to do instead

[Short, prescriptive close for the exec: 3-4 concrete moves.]
