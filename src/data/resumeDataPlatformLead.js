const resumeDataPlatformLead = {
  name: "Anuj Varma",
  title: "Engineering Leader — Full-Stack Platform Delivery",
  location: "Mumbai Metropolitan Area",
  // obfuscated: base64(reverse(plaintext)) — see src/utils/obfuscate.js
  phone: "MTE3Ny0wNDYtNTI5",
  email: "bW9jLmxpYW1nQGF2anVuYQ==",
  linkedin: "linkedin.com/in/anuj-varma-6b625520",
  github: "github.com/anujva",

  summary:
    "Engineering leader with 15+ years delivering full-stack platforms end-to-end — from frontend applications to backend services to production infrastructure. Started career at Infosys on the Telstra Digital Transformation project, then co-founded a startup building a crowdsourced recommendation platform for local deals. Career spans enterprise digital transformation (Telstra at Infosys), security analytics platforms (Securonix SIEM), financial services (American Express CLP), industrial IoT (GE Predix), and marketplace infrastructure (Thumbtack).\n\nRebuilt Thumbtack's SRE team from 1 remaining engineer to 8+, owning the hiring pipeline, interview loop design, team charter, and multi-cloud platform roadmap — reporting to the Director of Engineering and collaborating closely with the SVP of Engineering. Hands-on across the stack: React and Grails frontends, Golang and Java backends, Kafka streaming pipelines, and AWS/GCP infrastructure-as-code.\n\nLed compliance initiatives across PCI-DSS, SOC2, and CCPA: implemented audit logging systems, configured AWS CloudTrail across 5 accounts, coordinated cross-team data deletion pipelines spanning AWS and BigQuery on GCP, and provided technical evidence during auditor engagements — awarded PCI Champion 2023. Built and shipped an application-layer firewall overnight to stop a credential-stuffing attack that AWS WAF and Shield could not block. Most recently delivering AI-powered developer platforms with full-stack ownership from LLM orchestration to React frontend to Slack integration.",

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
        "Leading platform engineering for Wissen's product platform: multi-account AWS landing zone vended through OpenTofu, immutable infrastructure with Packer-built golden AMIs, and HashiCorp Nomad for workload orchestration.",
      ],
    },
    {
      title: "Staff Engineer & Team Lead, Developer Experience",
      company: "Thumbtack",
      location: "Remote",
      date: "2024 - March 2026",
      bullets: [
        "Delivered an AI-powered platform across Slack and web UI for cross-codebase Q&A, automated code reviews, and change request creation — full-stack ownership from LLM orchestration and RAG indexing to React frontend and Slack integration.",
        "Rolled out 6 agentic coding tools (GitHub Copilot Agents, Claude Code, OpenCode, and others) across 100+ engineers. Designed the evaluation framework, led vendor selection, and hit 96% developer adoption in the first rollout cycle.",
        "Built a cross-tool shim layer that translates engineering best practices into configuration for all agentic tools uniformly — single authoring surface, consistent enforcement across the fleet.",
        "Shipped an isolated cloud development environment platform with a self-service frontend: engineers spin up PostgreSQL instances, get shareable demo URLs, and tear down with one click. Cut environment setup from days to minutes; feature demo frequency went up 40%.",
      ],
    },
    {
      title: "Staff Engineer / SRE Team Lead",
      company: "Thumbtack",
      location: "Remote",
      date: "2020 - 2024",
      bullets: [
        "Rebuilt Thumbtack's SRE team from 1 remaining engineer to 8+. Designed the interview loops, defined the team charter and multi-cloud platform roadmap, and led hiring over 5 years — reporting to Director and collaborating closely with the SVP of Engineering.",
        "Led PCI-DSS compliance across Thumbtack's infrastructure: implemented audit logging for Linux servers, configured AWS CloudTrail across 5 AWS accounts, answered auditor questionnaires with technical evidence, and hardened infrastructure to meet controls. Awarded PCI Champion 2023.",
        "Built and shipped 'BadBotBlocker' — an application-layer firewall on top of Nginx reverse proxy infrastructure — overnight during an active credential-stuffing attack that was evading AWS WAF and Shield. Stopped the attack within hours.",
        "Delivered zero-downtime migration of Thumbtack's most critical data store from self-hosted EC2 PostgreSQL to Aurora. Coordinated bidirectional replication through AWS DMS and upgraded client libraries across PHP, Golang, Python, and Scala services.",
        "Built a custom Envoy control plane (go-control-plane + ECS sidecars) powering Cloud Development Environments with full request isolation via routing labels — zero duplicate infrastructure, zero application code changes.",
        "Owned multi-cloud infrastructure across AWS and GCP with Terraform and Puppet. Cut costs 35% and brought disaster recovery response time from hours to minutes.",
        "Supported SOC2 compliance by maintaining audit trails, enforcing least-privilege IAM policies, and providing technical evidence during audit cycles.",
        "Led CCPA (California Consumer Privacy Act) compliance effort — coordinated with the Data Services team to build the system to purge user records from online systems in AWS through to the data lake in BigQuery on GCP, all within 30 days of a deletion request.",
      ],
    },
    {
      title: "Senior Software Engineer, Online Services",
      company: "Thumbtack",
      location: "San Francisco, CA",
      date: "2018 - 2020",
      bullets: [
        "Led full-stack microservices migration of the Users service from the PHP monolith to Golang — designed the API surface, built the backend, and coordinated frontend integration across consumer and pro experiences.",
        "Built Golang service frameworks with built-in middleware (auth, rate limiting, observability) adopted across Thumbtack's 40+ microservice fleet.",
        "Delivered Thumbtack's real-time streaming infrastructure end-to-end: Kafka Connect on self-managed ECS capturing CDC events from Aurora WAL, writing to BigQuery in real time for analytics and compliance audit trails.",
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
        "Delivered edge-to-cloud platform features end-to-end: Chef-based bootstrapping of dockerized microservices on edge VMs, MQTT-secured communication to cloud, and real-time CDC ingestion from SQL Server.",
        "Improved initial data ingestion for 25GB datasets from 8-12 hours to under 1 hour by implementing compression and byte serialization — directly enabling faster onboarding of industrial customers.",
        "Built resiliency into the Efficiency Analyzer Application using circuit breaker patterns (Netflix Hystrix), preventing cascading failures across the GE Predix platform.",
        "Introduced feature flag-driven trunk-based development using FF4J, enabling the team to ship to production continuously without long-lived branches.",
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
        "Delivered full-stack features on the Securonix SIEM platform: Grails backend with JavaScript/jQuery frontend for security analytics dashboards used by enterprise SOC teams to detect and investigate threats.",
        "Built the Log Simulator — a full-stack application with a configuration frontend and statistical simulation backend that generated realistic log streams mimicking compliance systems (DLP, IAM, endpoint protection) at configurable rates. Used company-wide to test the SIEM platform against simulated security scenarios including data exfiltration and insider threats.",
        "Integrated SAML SSO for federated identity across customer deployments. Implemented WebSocket-based real-time updates for security dashboards.",
        "Implemented clustering algorithms for beaconing detection — identifying command-and-control communication patterns for threat hunting.",
        "Built a framework for programmatic Spark job submissions in fully kerberized YARN clusters, enabling distributed security analytics at scale.",
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
        "Built the platform using Python (Django), PHP (Drupal), and Android — handling full-stack development, database design, and API integrations.",
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
        "Developed Java/J2EE applications for the Telstra Digital Transformation project — an Australian enterprise client modernizing their customer-facing web platforms.",
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