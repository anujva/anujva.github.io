---
title: From Crisis to Cloud: Migrating 35 Microservices from EC2 PostgreSQL to Aurora PostgreSQL
slug: from-crisis-to-cloud-migration
excerpt: How we turned a failed consultancy engagement into a successful cloud migration. And what we learned when the managed solution almost broke us.
tags: aws, postgres, microservices, migration, aurora, devops
published_at: 2026-03-25
---

How we turned a failed consultancy engagement into a successful cloud migration. And what we learned when the managed solution almost broke us.

---

## The Situation

In the span of a few weeks, four senior and staff-level engineers left the Platform/SRE team. Almost like they coordinated it. At the time, this was shocking—these engineers represented the best of what Thumbtack Engineering had to offer. We scrambled to rebuild: two senior openings, three junior positions.

This team had inherited a complex, self-managed Postgres setup. The institutional knowledge walked out the door with those four engineers.

Leadership, skeptical of our capacity to execute, had already engaged an external consultancy without consulting me (the most senior engineer at the time, though not officially the Team Lead) or the team. Six to eight weeks later, they delivered only a proof-of-concept and left.

That's when I proposed restarting the project. I took ownership as DRI. We finished in four months—and delivered incremental value throughout by upgrading the CI environments as we went.

---

## Why Aurora?

The existing EC2 Postgres setup had served us well, but it had deep operational costs. When we tallied up engineering hours spent managing infrastructure the team hadn't built and couldn't safely operate long-term, the calculus shifted.

A cost analysis showed something interesting. Migrating to Aurora PostgreSQL (one primary instance, four read replicas, plus Aurora I/O charges) would cost-match our existing EC2 spend. Same AWS bill. Better infrastructure.

We'd gain:

- Multi-AZ resiliency with automatic failovers (previously manual)
- Easier horizontal read scaling
- Aurora's native fast-clone feature to replace our homegrown ZFS snapshot system
- Point-in-time recovery handled by the platform itself

### Making the Case

I drove an RFC making the case for Aurora over three alternatives. CockroachDB, YugabyteDB, and Google Cloud Spanner. Aurora won on Postgres compatibility, operational simplicity for a lean team, and our existing AWS Premier Support relationship, which gave us a direct escalation path.

Leadership signed off before any migration work began.

---

## The Migration Strategy

### Bi-Directional Replication: Our Safety Net

Instead of the consultancy's one-way replication approach, I implemented bi-directional replication via AWS DMS. This created a live rollback path to EC2 throughout the migration. Every subsequent decision depended on this safety net being in place.

It was non-negotiable.

### Service-by-Service Cutover

Rather than a single DNS flip across all 35 services, we introduced two live connection strings toggled per service via environment variables. Each service migrated individually, with owner sign-off required at each stage.

The production cutover ran as a structured 6-hour event. Service owners joined a standing Zoom call, notified via Slack as each service migrated. No service was declared complete until its owner confirmed no regression.

---

## The Connection Pooler Decision

This is where it gets interesting.

### Our Options

**pgBouncer (status quo):** Our existing connection pooler, co-located on EC2. It ran in transaction pooling mode, aggressively reusing connections across transactions for an efficient CPU/memory profile. The downside: self-managed, adding operational surface we were trying to reduce.

**AWS RDS Proxy:** A managed connection pooler with tight IAM integration, eliminating secrets management for database credentials. Zero operational overhead. The known limitation: at the time, only session pooling was supported, which is less aggressive in connection reuse than transaction pooling.

### Evaluation

To de-risk the session pooling limitation, I ran a load test against RDS Proxy and escalated the concern directly to the AWS database specialist on our Premier Support account. They confirmed session pooling hadn't caused issues for comparable workloads. We validated the full migration path across development and staging environments with all 35 services.

The IAM integration and reduced management overhead tipped the decision. We proceeded with RDS Proxy.

---

## The Production Incident

Three high-traffic services (users, cobalt, and website) were cut over late at night when traffic was low. The session pooling issue didn't manifest.

By the next morning, service owners were paging us. `findUserById` and `findUsersByIds` were 30% slower than baseline.

We raised a Sev1 with AWS.

We systematically worked through every configuration RDS Proxy exposed. Connection pool sizing, idle connection handling, `MaxConnectionsPercent`, `MaxIdleConnectionsPercent`. We checked `DatabaseConnectionsCurrentlySessionPinned` and found elevated pinning from SET statements and session-level configuration. We consolidated those into `InitQuery` on the target group.

None of it closed the gap.

The fundamental issue was session pooling under our specific traffic patterns. No configuration could replicate what transaction pooling gave us.

### The Resolution

Rolling back to EC2 wasn't an option. Bi-directional replication had been stopped when we declared the cutover a success. The original pgBouncer instances had been co-located on EC2. Now decommissioned.

I made the call to deploy pgBouncer as a containerized ECS service, reusing our existing container deployment patterns but in a novel configuration. It ran in transaction pooling mode, connecting directly to Aurora and bypassing RDS Proxy entirely.

Within an hour of deployment, API latency returned to baseline. We migrated all remaining services from RDS Proxy to the ECS-hosted pgBouncer and decommissioned RDS Proxy.

The incident was resolved within a business day.

---

## The Outcome

The migration was completed in four months. All 35 microservices were successfully migrated. Aurora Fast Clones replaced the ZFS system entirely, covering engineers' personal database copies, schema migration testing, and the Airflow data pipeline.

EC2 infrastructure was kept live for one week as a safety net, then fully torn down.

---

## What We Learned

### 1. Validate every critical-path component under production conditions

The RDS Proxy decision seemed low-risk. We load tested it, consulted AWS specialists, and received assurances. What we didn't do was simulate the exact connection patterns of our highest-traffic services under realistic load.

The next-morning latency regression made clear: a vendor's confidence is not a substitute for your own validation.

Going forward, I treat any infrastructure component on the critical path, even one marketed as low-maintenance, as requiring the same scrutiny as something we built ourselves.

### 2. Keep rollback paths alive longer than you think you need them

We stopped bi-directional replication as soon as we declared the cutover a success. In hindsight, maintaining replication for at least another week, until all services had been validated through a full business traffic cycle, would have preserved our options during the RDS Proxy incident.

We kept the EC2 infrastructure running for a week after full migration. That was the right instinct. We should have applied that same caution to replication.

---

## Final Thoughts

This project taught me that the best-laid migration plans account for the unknowns, not just the knowns. The technical work was the easier part. Building confidence, establishing trust with leadership, and creating a culture where we could fail safely, that's what made four months possible.

And sometimes the best solution isn't the newest one. pgBouncer in a container turned out to be exactly what we needed.

---

Have you navigated a similar migration challenge? I'd love to hear about your approach. You can reach me through my socials.
