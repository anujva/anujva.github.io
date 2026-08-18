const resumeDataPlatformLead = {
  name: "Anuj Varma",
  title: "Engineering Leader, Full-Stack Platform Delivery",
  location: "Mumbai Metropolitan Area",
  // obfuscated: base64(reverse(plaintext)). See src/utils/obfuscate.js
  phone: "MTE3Ny0wNDYtNTI5",
  email: "bW9jLmxpYW1nQGF2anVuYQ==",
  linkedin: "linkedin.com/in/anuj-varma-6b625520",
  github: "github.com/anujva",

  summary:
    "Engineering leader with 15+ years building full-stack platforms: the frontend applications, the backend services behind them, and the production infrastructure they run on. Started career at Infosys on the Telstra Digital Transformation project, then co-founded a startup building a crowdsourced recommendation platform for local deals. Since then I've worked in enterprise digital transformation (Telstra at Infosys), security analytics (Securonix SIEM), financial services (American Express CLP), industrial IoT (GE Predix), and marketplace infrastructure (Thumbtack).\n\nRebuilt Thumbtack's SRE team from 1 remaining engineer to 8+. I owned the hiring pipeline, the interview loop design, the team charter, and the multi-cloud platform roadmap, reported to the Director of Engineering, and worked closely with the SVP of Engineering. I stayed hands-on through all of it: React and Grails frontends, Golang and Java backends, Kafka streaming pipelines, and AWS/GCP infrastructure-as-code.\n\nLed compliance work across PCI-DSS, SOC2, and CCPA: built audit logging systems, configured AWS CloudTrail across 5 accounts, coordinated cross-team data deletion pipelines spanning AWS and BigQuery on GCP, and walked auditors through the technical evidence. Awarded PCI Champion 2023. Wrote and shipped an application-layer firewall overnight to stop a credential-stuffing attack that AWS WAF and Shield could not block. Most recently I've been building AI-powered developer platforms, again on the whole stack: LLM orchestration, the React frontend, the Slack integration.",

  skills: {
    "Leadership & Delivery": [
      "Team Building (1→8+ hires)",
      "Hiring Pipeline Design",
      "Platform Roadmap Ownership",
      "Cross-Functional Execution",
      "Stakeholder Management",
      "Incident Response Leadership",
    ],
    "Compliance & Governance": [
      "PCI-DSS",
      "SOC2",
      "CCPA",
      "AWS CloudTrail",
      "Audit Logging",
      "Data Governance",
      "WAF / Bot Mitigation",
      "Network Segmentation",
      "IAM Least-Privilege",
    ],
    "Full-Stack Engineering": [
      "React",
      "Grails / Groovy",
      "Golang",
      "Java",
      "Python",
      "JavaScript",
      "Spring",
      "Node.js",
    ],
    "Platform & Infrastructure": [
      "AWS",
      "GCP",
      "Terraform",
      "Docker",
      "ECS",
      "Kafka",
      "PostgreSQL / Aurora",
      "Envoy / Service Mesh",
      "Airflow",
      "Elasticsearch",
    ],
  },

  experience: [
    {
      title: "Executive Director",
      company: "Wissen Technology",
      location: "Mumbai Metropolitan Area",
      date: "2026 - Present",
      bullets: [
        "Leading Platform Engineering for Wissen's product platform: multi-account AWS landing zone vended through OpenTofu, immutable infrastructure with Packer-built golden AMIs, and HashiCorp Nomad for workload orchestration.",
        "Built a Go CLI that renders a single wissen.yaml manifest into Nomad jobs, Consul intentions, and CI deploy workflows. Every internal service deploys through it, no hand-written HCL.",
        "Rolled out a Consul service mesh in phases: default-deny ACLs, mTLS, Connect sidecars for east-west traffic, and public ingress through an API gateway at the edge.",
        "Stood up self-hosted Forgejo CI on ephemeral VM-per-job runners managed by scaler and reaper Lambdas. The whole platform runs under a $500/month AWS budget.",
        "Deployed Airflow 3 as four mesh-connected Nomad workloads, OpenObserve observability fed by node-level OpenTelemetry collectors, and internal Go products (engagement tracker, lead-capture tool with Bedrock briefings, interview console) behind passkey auth.",
      ],
    },
    {
      title: "Staff Engineer & Team Lead, Developer Experience",
      company: "Thumbtack",
      location: "Remote",
      date: "2024 - March 2026",
      bullets: [
        "Delivered an AI platform in Slack and the web UI for cross-codebase Q&A, automated code reviews, and change request creation. I built the whole thing: LLM orchestration, RAG indexing, the React frontend, and the Slack integration.",
        "Rolled out 6 agentic coding tools (GitHub Copilot Agents, Claude Code, OpenCode, and others) across 100+ engineers. Designed the evaluation framework, led vendor selection, and hit 96% developer adoption in the first rollout cycle.",
        "Built a cross-tool shim layer that turns engineering best practices into configuration for every agentic tool, so a practice gets written once instead of once per tool.",
        "Shipped an isolated cloud development environment platform with a self-service frontend: engineers spin up PostgreSQL instances, get shareable demo URLs, and tear the whole thing down with one click. Cut environment setup from days to minutes; feature demo frequency went up 40%.",
      ],
    },
    {
      title: "Staff Engineer / SRE Team Lead",
      company: "Thumbtack",
      location: "Remote",
      date: "2020 - 2024",
      bullets: [
        "Rebuilt Thumbtack's SRE team from 1 remaining engineer to 8+. Designed the interview loops, defined the team charter and the multi-cloud platform roadmap, and led hiring over 5 years. Reported to the Director of Engineering and worked closely with the SVP of Engineering.",
        "Led PCI-DSS compliance across Thumbtack's infrastructure: built audit logging for Linux servers, configured AWS CloudTrail across 5 AWS accounts, answered auditor questionnaires with technical evidence, and hardened infrastructure to meet the controls. Awarded PCI Champion 2023.",
        "Built and shipped 'BadBotBlocker', an application-layer firewall on top of Nginx reverse proxy infrastructure, overnight during an active credential-stuffing attack that was evading AWS WAF and Shield. Stopped the attack within hours.",
        "Delivered zero-downtime migration of Thumbtack's most critical data store from self-hosted EC2 PostgreSQL to Aurora. Coordinated bidirectional replication through AWS DMS and upgraded client libraries across PHP, Golang, Python, and Scala services.",
        "Built a custom Envoy control plane (go-control-plane + ECS sidecars) powering Cloud Development Environments, where routing labels give each engineer full request isolation. It needed no duplicate infrastructure and no changes to application code.",
        "Owned multi-cloud infrastructure across AWS and GCP with Terraform and Puppet. Cut costs 35% and brought disaster recovery response time from hours to minutes.",
        "Supported SOC2 compliance: maintained the audit trails, kept IAM policies least-privilege, and produced technical evidence during audit cycles.",
        "Led the CCPA (California Consumer Privacy Act) compliance effort. Worked with the Data Services team to build the system that purges user records from the online systems in AWS through to the data lake in BigQuery on GCP, all within 30 days of a deletion request.",
      ],
    },
    {
      title: "Senior Software Engineer, Online Services",
      company: "Thumbtack",
      location: "San Francisco, CA",
      date: "2018 - 2020",
      bullets: [
        "Led full-stack microservices migration of the Users service from the PHP monolith to Golang. Designed the API surface, built the backend, and coordinated frontend integration across consumer and pro experiences.",
        "Built Golang service frameworks with built-in middleware (auth, rate limiting, observability) adopted across Thumbtack's 40+ microservice fleet.",
        "Built Thumbtack's real-time streaming infrastructure: Kafka Connect on self-managed ECS captures CDC events from the Aurora WAL and writes them to BigQuery in real time for analytics and compliance audit trails.",
        "Dropped latency on a critical findUsers API from 500+ms to 30ms p99. Application responsiveness improved 15%, user engagement went up 22%.",
        "Wrote a load testing tool in Go that cut test implementation time by 70% and surfaced bottlenecks leading to 40% higher system throughput.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "GE Digital",
      location: "San Ramon, CA",
      date: "2016 - 2018",
      bullets: [
        "Delivered edge-to-cloud platform features: Chef-based bootstrapping of dockerized microservices on edge VMs, MQTT-secured communication back to the cloud, and real-time CDC ingestion from SQL Server.",
        "Improved initial data ingestion for 25GB datasets from 8-12 hours to under 1 hour with compression and byte serialization, which meant industrial customers got onboarded faster.",
        "Built resiliency into the Efficiency Analyzer Application using circuit breaker patterns (Netflix Hystrix), so a single failure did not cascade across the GE Predix platform.",
        "Introduced feature-flag-driven trunk-based development with FF4J. The team could ship to production continuously instead of maintaining long-lived branches.",
      ],
    },
    {
      title: "Software Engineer",
      company: "American Express",
      location: "New York",
      date: "2016",
      hideInPrint: true,
      bullets: [
        "Built a Spring Web Application for customer service representatives to service loan account requests as part of the Commercial Lending Platform (CLP) effort.",
        "Added feature of logging to MongoDB for custom logger built on top of Apache Log4J.",
        "Contributed to the breakdown of monolithic architecture into microservices for cloud deployability and scalability.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Securonix Solutions",
      location: "Dallas, TX",
      date: "2014 - 2016",
      bullets: [
        "Built full-stack features on the Securonix SIEM platform: a Grails backend with a JavaScript/jQuery frontend for the security analytics dashboards enterprise SOC teams used to detect and investigate threats.",
        "Built the Log Simulator, a full-stack application with a configuration frontend and a statistical simulation backend that generated realistic log streams from compliance systems (DLP, IAM, endpoint protection) at configurable rates. Teams across the company used it to test the SIEM platform against scenarios like data exfiltration and insider threats.",
        "Integrated SAML SSO for federated identity across customer deployments, and added WebSocket-based real-time updates to the security dashboards.",
        "Implemented clustering algorithms for beaconing detection, which surfaced the command-and-control communication patterns threat hunters chase.",
        "Built a framework for programmatic Spark job submissions in fully kerberized YARN clusters, so security analytics could run distributed at scale.",
      ],
    },
    {
      title: "Director",
      company: "Sketch Lounge Web Services Pvt. Ltd.",
      location: "India",
      date: "Apr 2010 - Aug 2011",
      hideInPrint: true,
      bullets: [
        "Co-founded and led a web services startup developing a crowdsourced recommendation engine for local deals on big-ticket purchases.",
        "Built the platform using Python (Django), PHP (Drupal), and Android, handling full-stack development, database design, and API integrations.",
        "Managed a small team, overseeing code reviews, sprint planning, and product delivery.",
        "Handled client relationships, vendor negotiations, and go-to-market strategy.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Infosys Technologies Pvt. Ltd.",
      location: "Pune, India",
      date: "Sep 2008 - Apr 2010",
      hideInPrint: true,
      bullets: [
        "Trained in Java and .NET at Infosys Mysore campus, then posted to the Pune delivery center.",
        "Developed Java/J2EE applications for the Telstra Digital Transformation project, an Australian enterprise client modernizing their customer-facing web platforms.",
        "Deployed applications on JBoss Web Server and Tomcat application servers, working with onshore and offshore teams following structured delivery methodology.",
      ],
    },
  ],

  education: [
    {
      degree: "M.Sc. in Electrical Engineering",
      school: "University of Southern California",
      date: "2012 - 2013",
      details: "Specialization: Audio/Video Processing | Research Assistant, Tower Labs",
    },
    {
      degree: "B.Eng. in Electronics & Communication Engineering",
      school: "Manipal Institute of Technology",
      date: "2004 - 2008",
    },
  ],

  languages: [
    { name: "English", level: "Native" },
    { name: "Hindi", level: "Native" },
  ],
};

export default resumeDataPlatformLead;