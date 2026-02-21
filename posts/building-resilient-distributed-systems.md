---
title: Building Resilient Distributed Systems
slug: building-resilient-distributed-systems
excerpt: Lessons from designing systems that survive failures gracefully, including circuit breakers, retries, and the art of failing well.
tags: distributed-systems, engineering, reliability
published_at: 2025-06-15
---

Distributed systems fail. Not sometimes, but constantly. The network partitions, nodes crash, disks fill up, and clocks drift. The difference between a good distributed system and a bad one isn't whether it fails, but how it fails.

After years of building and operating infrastructure at scale, here are the patterns I keep coming back to.

## Circuit breakers are not optional

The circuit breaker pattern is one of those things that sounds obvious in retrospect but gets skipped in the initial design of almost every system I've seen. The idea is simple: if a downstream dependency is failing, stop calling it for a while instead of piling on more failing requests.

```
closed → (failures exceed threshold) → open
open → (timeout expires) → half-open
half-open → (probe succeeds) → closed
half-open → (probe fails) → open
```

A circuit breaker protects both sides of the connection. The caller stops wasting resources on doomed requests, and the callee gets breathing room to recover.

In practice, I've found that threshold tuning matters less than people think. Start with something reasonable (5 failures in 30 seconds) and adjust based on real traffic patterns. What matters more is having the circuit breaker at all.

## Retries need backoff. Always.

Naive retries are worse than no retries. If a service is struggling under load and every client immediately retries failed requests, you've just doubled the load on an already-struggling service. This is the retry storm, and it will turn a partial outage into a complete one.

Exponential backoff with jitter is the standard answer:

```python
def retry_with_backoff(fn, max_retries=3, base_delay=1.0):
    for attempt in range(max_retries):
        try:
            return fn()
        except TransientError:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)
            jitter = random.uniform(0, delay * 0.1)
            time.sleep(delay + jitter)
```

The jitter is critical. Without it, all clients that failed at the same time will retry at the same time, creating synchronized thundering herds.

## Timeouts are a contract

Every network call needs a timeout. Every single one. An unbounded network call is a resource leak waiting to happen. It holds connections, threads, and memory hostage while waiting for a response that may never come.

But setting timeouts correctly is harder than it looks. Too aggressive and you'll time out on perfectly healthy requests during traffic spikes. Too generous and you'll hold resources for too long during actual failures.

I've found that p99 latency under normal conditions is a reasonable starting point for timeouts, with a multiplier of 2-3x to account for variance. Monitor timeout rates and adjust.

## Idempotency makes everything easier

If every operation in your system is idempotent, retries become safe, recovery becomes straightforward, and exactly-once delivery stops being a requirement. You can relax to at-least-once delivery and let idempotency handle the duplicates.

The standard approach is an idempotency key, a unique identifier that the client generates and the server uses to deduplicate:

1. Client generates a UUID for the request
2. Server checks if it has already processed a request with that key
3. If yes, return the cached result
4. If no, process the request and store the result keyed by the UUID

The storage for idempotency keys doesn't need to be permanent. A TTL of a few hours to a few days is usually sufficient.

## The fallacy of "just add more instances"

Horizontal scaling solves throughput problems but not latency problems, and it introduces coordination problems. More instances means more potential for split-brain scenarios, more complex deployments, and more network traffic for consensus protocols.

Before scaling horizontally, ask:
- Is the bottleneck actually throughput, or is it a single slow dependency?
- Will adding instances improve things, or just move the bottleneck?
- What coordination overhead does each new instance add?

Sometimes the answer to a scaling problem is a single, well-tuned instance rather than a fleet of poorly-configured ones.

## Wrapping up

Resilience isn't a feature you bolt on at the end. It's a design philosophy that needs to be present from the first architecture discussion. Start with the assumption that everything will fail, and build from there.

These patterns aren't novel. They're well-documented in the literature. The hard part isn't knowing about them; it's consistently applying them across every service, every integration, and every deployment in your system.
