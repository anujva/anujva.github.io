---
title: "Platform engineering: what I wish I knew earlier"
slug: platform-engineering-lessons
excerpt: Hard-won lessons from building internal platforms, and why the best platform is the one nobody notices.
tags: platform-engineering, devops, infrastructure
published_at: 2025-10-01
---

Platform engineering is a strange job. You're building products, but your users are other engineers. This changes the dynamics in ways that aren't immediately obvious. After several years of building internal platforms, here are the lessons I wish someone had told me on day one.

## Your platform is a product

This is the most important mindset shift. An internal platform isn't a collection of scripts and configs. It's a product with users, and those users have choices. If your platform is hard to use, engineers will work around it, build their own solutions, or simply not adopt it.

Treat your platform like a product. Talk to your users, not through tickets but in person, at their desk, watching them use your tools. Measure adoption, because if engineers aren't using your platform, the platform has a problem, not the engineers. And invest in UX: good error messages, clear documentation, and sensible defaults matter as much for CLIs and APIs as they do for consumer products.

## The golden path should be the easy path

The "golden path" is the recommended way to do things on your platform. It should also be the easiest way. If the golden path requires more effort than the alternatives, people won't follow it.

This means sane defaults that work for 80% of use cases, progressive disclosure where simple things are simple and complex things are possible, and templates that produce production-ready starting points.

I've seen platforms that required 15 config files and a 30-step setup guide for a new service. Engineers would copy an existing service and modify it instead, leading to configuration drift and cargo-culted settings nobody understood.

## Abstractions leak. Plan for it.

Every abstraction your platform provides will eventually leak. The CI/CD pipeline will need a custom step. The deployment tool will need an escape hatch. The service template will need an override for that one team's special requirements.

Instead of trying to build a perfect abstraction, build escape hatches from the start:

```yaml
# Standard deployment config
deploy:
  strategy: rolling
  replicas: 3
  
# Escape hatch for custom needs
hooks:
  pre-deploy: ./scripts/custom-migration.sh
  post-deploy: ./scripts/verify-deployment.sh
```

The goal is to handle 80% of cases with the abstraction and provide a clean way to handle the remaining 20% without abandoning the platform entirely.

## Migrations are the hardest part

Building the new system is the fun part. Migrating everyone from the old system to the new one is the hard part. I've seen excellent platforms fail because the migration path was too painful.

Some rules for platform migrations: support both old and new simultaneously, and never force a flag day migration. Automate the migration, because if engineers have to do it manually, it won't happen. Provide a clear timeline, since "we'll deprecate the old system eventually" means "the old system will live forever." And help teams migrate directly through pairing sessions, office hours, or even doing the migration for them.

The best migration I've been part of was almost invisible to the engineers using the platform. We built an adapter layer that made the new system accept the old configuration format, ran both systems in parallel with automated comparison testing, and switched over with zero changes required from teams.

## Observability is not optional

If your platform runs other people's code, you need excellent observability. When something breaks at 2 AM, the on-call engineer needs to quickly figure out whether the problem is in their application code or in your platform.

At minimum, you need clear error messages that distinguish platform errors from application errors, dashboards showing platform health independently from application health, audit logs of every platform action (deployments, config changes, scaling events), and runbooks for common failure modes.

The worst platform failures I've seen were ones where the platform was broken but the symptoms looked like application bugs. Engineers spent hours debugging their code before realizing the platform was the problem.

## Don't build what you can buy (usually)

The urge to build custom solutions is strong in platform engineering. Resist it for commodity functionality. Your custom CI system is not better than GitHub Actions. Your custom container orchestrator is not better than Kubernetes. Your custom monitoring system is not better than Datadog.

Build custom where you have unique requirements or where the integration between systems creates value. Buy or use open source for everything else.

The exception is when the "buy" option doesn't integrate well with your existing systems, or when the operational overhead of running someone else's software exceeds the development cost of building your own. These situations exist, but they're less common than platform engineers tend to think.

## Wrapping up

Platform engineering is ultimately about empathy. You're building tools for people, and the quality of those tools directly affects their daily experience. The best platform engineers I've worked with spend as much time understanding their users' problems as they do writing code.

Build the platform you'd want to use. Then make it even simpler.
