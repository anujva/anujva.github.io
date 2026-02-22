---
title: "From subdomain to sidecar: building cloud development environments on Envoy"
slug: cde-envoy-service-mesh
excerpt: How Thumbtack uses a custom Envoy control plane on ECS to give every engineer their own network-isolated development environment without the cost of full per-engineer stacks.
tags: envoy, service-mesh, platform-engineering, networking, ecs
published_at: 2021-09-15
---

At Thumbtack, our backend runs as a large collection of microservices on ECS. For years, the standard approach to testing changes was to merge to main and observe behavior in our shared CI/CD dev environment, `demo.thumbtack.com`. The problem is obvious in hindsight: a shared environment means shared state and shared failures. If your colleague is testing a breaking change to a core service, your test is broken too, through no fault of your own.

The alternative, giving every engineer a full, isolated copy of the entire service graph, is expensive and operationally complex. With dozens of services and a full engineering org, that doesn't scale.

What we built instead is a Cloud Development Environment (CDE) system: a way for engineers to deploy only the services they've changed, have all traffic for their label routed to those services, and let everything else fall through to the shared CI/CD baseline. The whole thing is built on a custom Envoy control plane, and it requires zero changes to how engineers write their application code.

This post covers Part 1: how network isolation works through routing labels embedded in subdomain URLs.

## The Problem

Testing in a microservices architecture is deceptively hard. The unit of deployment is a single service, but the unit of behavior is a request that fans out across many services. If you're changing how the `users` service handles authentication, you also need `payments`, `notifications`, and three other downstream services to be running in a coherent state for your change to be testable end to end.

The naive solutions all have costs. A shared dev environment is easy to set up, but engineers step on each other constantly; one bad deploy from a colleague takes down your test. Full per-engineer stacks give you true isolation, but you're now running N copies of every service, database, and queue, which is cost-prohibitive for a large org. Feature flags and production testing work for some changes, but you can't always test half-built features in production.

What we wanted was something in between: engineers deploy only the services they've touched, traffic for their label routes to their versions, and everything else transparently uses the shared baseline. No duplicate infrastructure and no application code changes.

## Architecture overview

Thumbtack's backend runs on ECS on EC2. Every ECS service is deployed with an Envoy proxy running as a sidecar container that intercepts all inbound and outbound traffic for that service. Envoy is a powerful data plane, but it needs something to tell it about the state of the world: where are all the services, what are their addresses, and how should traffic be routed? That's the control plane's job.

Rather than adopt a full service mesh like Istio (which would have required significant operational overhead and doesn't map cleanly to ECS), we built a custom control plane using Envoy's open source [`go-control-plane`](https://github.com/envoyproxy/go-control-plane) library. This gives us the xDS APIs that Envoy expects, with full control over the routing logic we need.

The three key components:

- Envoy sidecar on every ECS service, the data plane that makes routing decisions at request time
- `schaafd`, a daemon running on every ECS-EC2 host that uses the Docker API to list all containers currently running on that host, exposing service name, IP, and port
- `schaaf`, the custom control plane that continuously polls `schaafd` across all hosts and the ECS APIs to build a complete picture of what's running where, then pushes routing configuration to every Envoy sidecar via xDS

## The routing label: from URL to header

The entry point for the entire CDE system is the URL.

`demo.thumbtack.com` is Thumbtack's dev environment, the live deployment of whatever code has been merged to main. When an engineer deploys their own version of a service, they get a personal subdomain:

```
https://anujvarma.demo.thumbtack.com
```

The subdomain prefix, `anujvarma`, is the routing label. Every request coming through this URL needs to carry that label through the entire service call graph.

Here's how it works at the network boundary:

1. The request hits Nginx, which sits in front of the cluster
2. Nginx extracts the subdomain prefix and injects it as an HTTP header:

   ```
   x-tt-routing-label: anujvarma
   ```

3. The request is forwarded into the cluster with this header attached

From this point on, Nginx is out of the picture. The routing label travels as a plain HTTP header, and it's Envoy's job to act on it at every service boundary.

## How the control plane knows the world

For Envoy to route `x-tt-routing-label: anujvarma` to the right place, it needs to know where `users-anujvarma` is actually running. That's `schaaf`'s job.

`schaaf` runs a reconciliation loop every 16 seconds. In each cycle it builds a complete picture of the running cluster from two sources:

### `schaafd`: the per-host discovery daemon

Every ECS-EC2 instance runs `schaafd`, a lightweight daemon that queries the local Docker API to enumerate all containers currently running on that host. For each container, it reports the service name, the IP address, and the port it's listening on. The service name is the key: it encodes both the service identity and the routing label. A container named `users-anujvarma` is the `users` service for the `anujvarma` label.

### ECS + AWS APIs

`schaafd` knows about containers on a single host. `schaaf` uses ECS and EC2 APIs to discover the full set of hosts, then aggregates `schaafd` responses across all of them.

The result: every 16 seconds, `schaaf` has a complete, ground-truth map of every service running in the cluster, including its name, its label (if any), and its IP:port endpoint.

This map is used to construct Envoy's xDS configuration: clusters (upstream service definitions) and routes (the rules that match headers to clusters). `schaaf` pushes this configuration to every Envoy sidecar in the cluster. Envoy updates its routing table without any restarts or reloads.

## Envoy makes the routing decision

When a request arrives at a service's Envoy sidecar, Envoy inspects the `x-tt-routing-label` header and applies a routing rule:

1. **Does a cluster exist for `<service>-<label>`?** If `users-anujvarma` is registered in the xDS configuration, route to it.
2. **If not, fall through to the default.** Route to `users`, the baseline CI/CD version of the service.

This fallback is what makes the whole system practical. An engineer working on the `users` service only needs to deploy `users-anujvarma`. Every other service in the call graph (`payments`, `notifications`, `search`) will be served by the shared default. The engineer gets true isolation for the service they changed, without having to stand up a full copy of the world.

The routing rules themselves are generated by the control plane as Envoy's [Route Configuration](https://www.envoyproxy.io/docs/envoy/latest/api-v3/config/route/v3/route.proto). For each service, the control plane generates a header-match route for every known label, with the default cluster as the catch-all. Envoy evaluates these rules in order on every request, and the entire decision happens in microseconds, at the data plane layer, with no application code involved.

## Header propagation through the call stack

Routing at the first service hop is straightforward. The complexity kicks in when the labeled service makes downstream calls.

Consider this call chain:

```
users-anujvarma  →  cobalt-default  →  agonas-anujvarma
```

Anuj has deployed custom versions of `users` and `agonas`, but not `cobalt`. The request enters `users-anujvarma` carrying `x-tt-routing-label: anujvarma`. When `users-anujvarma` calls `cobalt`, Envoy injects the header into the outgoing request automatically. That's handled at the sidecar level.

But `cobalt-default` is the tricky part. It receives the request with the routing label, does its own processing, and then calls `agonas`. For the routing label to reach `agonas`, `cobalt` needs to forward it in its outgoing call, even though `cobalt` itself has no special version for `anujvarma` and has no concept of CDEs in its business logic.

We solved this at the framework level, not the application level. Our internal RPC framework automatically reads `x-tt-routing-label` from any incoming request and includes it in all outgoing calls made within the same request context. Service authors don't think about it. The propagation is transparent.

This is what makes multi-hop routing work: the label travels through the entire call graph, and Envoy at each hop independently decides whether to send traffic to a labeled instance or the default, based purely on what the control plane has told it is running.

## Deploying a labeled service

Getting your service into the CDE system is intentionally low-friction. Engineers have three paths:

Gerrit button: We added a one-click deploy button directly into our code review tool. When you're reviewing your own change, you can deploy it to your CDE without leaving Gerrit. This is the most common path for feature development.

Alfred CLI: `alfred` is Thumbtack's deployment CLI. You can deploy a labeled service directly from your terminal:

```
alfred deploy --environment development --label anujvarma --version <image-tag> users
```

The `--version` flag specifies the tagged container image with the engineer's changes baked in. `--environment` targets `development` or `staging`.

CDE Web App: A web frontend for Alfred operations, useful for managing multiple labeled services or for engineers who prefer a UI over a CLI.

In all three cases, the deployed service is tagged with the engineer's label in its ECS service name (e.g., `users-anujvarma`). The control plane picks it up in the next 16-second reconciliation cycle, registers it as a cluster, and starts advertising it to all Envoy sidecars. Within roughly 16 seconds of deploy, `anujvarma.demo.thumbtack.com` is routing to your service.

## Lifecycle and cleanup

Labeled services are not permanent. When an engineer tears down their CDE service, or it's cleaned up automatically, the ECS service stops running. On the next `schaaf` reconciliation cycle (within 16 seconds), `schaafd` no longer reports that container, and `users-anujvarma` disappears from the xDS cluster list.

`schaaf` pushes the updated configuration to all Envoy sidecars. From that point, any request with `x-tt-routing-label: anujvarma` targeting the `users` service will match no labeled cluster and fall through to the `users` default. No manual cleanup and no stale routing rules. The system converges automatically.

This self-healing property is a direct consequence of the reconciliation loop model: `schaaf` doesn't react to events, it continuously rebuilds ground truth. A service disappearing is indistinguishable from a service that never existed. Both result in a routing table without that cluster.
