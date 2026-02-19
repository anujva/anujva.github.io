const resumeDataSecurity = {
  name: "Anuj Varma",
  title: "Staff Software Engineer - Security & Infrastructure",
  location: "Seattle, WA",
  // obfuscated: base64(reverse(plaintext)) — see src/utils/obfuscate.js
  phone: "MTE3Ny0wNDYtNTI5",
  email: "bW9jLmxpYW1nQGF2anVuYQ==",
  linkedin: "linkedin.com/in/anuj-varma-6b625520",
  github: "github.com/anujva",

  summary:
    "Staff Engineer with 15+ years of experience building secure distributed systems and cloud infrastructure. Promoted to Staff as SRE Tech Lead owning Thumbtack's AWS and GCP infrastructure with a focus on security posture: mTLS service mesh, WAF/Shield-protected API layers, least-privilege IAM, VPC network segmentation, and PrivateLink connectivity. Background includes SIEM security analytics at Securonix, infrastructure hardening with Terraform, and securing container orchestration across ECS, EKS, and Kubernetes.",

  skills: {
    "Security & Networking": [
      "mTLS / Service Mesh",
      "AWS WAF",
      "AWS Shield",
      "AWS IAM",
      "AWS PrivateLink",
      "VPC / Security Groups",
      "SAML SSO",
      "SIEM",
      "Kerberos",
      "Network Segmentation",
    ],
    "Infrastructure & DevOps": [
      "AWS",
      "GCP",
      "Terraform",
      "Docker",
      "ECS",
      "EKS",
      "Envoy",
      "Jenkins",
      "Chef",
      "Puppet",
    ],
    "Programming Languages": [
      "Golang",
      "Java",
      "Python",
      "Scala",
      "JavaScript",
      "C++",
      "Groovy",
    ],
    "Frameworks & Tools": [
      "go-control-plane",
      "Spring",
      "Spark",
      "Kafka Connect",
      "Airflow",
      "React",
    ],
    "Databases & Messaging": [
      "PostgreSQL",
      "Aurora",
      "Elasticsearch",
      "Kafka",
      "BigQuery",
      "DynamoDB",
      "Cassandra",
    ],
  },

  experience: [
    {
      title: "Staff Engineer, Developer Experience",
      company: "Thumbtack",
      location: "Remote",
      date: "2024 - Present",
      bullets: [
        "Rolled out 6 agentic coding tools across engineering with security guardrails: scoped permissions, secret-filtering shim layers, and sandboxed execution environments.",
        "Built an isolated cloud dev environment where engineers spin up resources like PostgreSQL with one click. Enforced per-environment IAM boundaries so dev resources cannot reach production data.",
        "Built a cross-tool shim layer that enforces engineering security practices (secret scanning, dependency policies) uniformly across all agentic coding tools.",
      ],
    },
    {
      title: "Staff Engineer / SRE Tech Lead",
      company: "Thumbtack",
      location: "Remote",
      date: "2020 - 2024",
      bullets: [
        "Built Thumbtack's service mesh using Envoy and go-control-plane, enabling mTLS for all inter-service communication. Services authenticate each other cryptographically, eliminating plaintext traffic within the cluster.",
        "Configured AWS WAF and AWS Shield to protect Thumbtack's API layer -- HTTP/REST endpoints and GraphQL -- blocking injection attacks, rate-limit abuse, and DDoS attempts before they reach application code.",
        "Designed and implemented AWS VPC architecture with strict security group rules enforcing least-privilege network access. ECS services run with tightly scoped IAM task roles limiting access to only the AWS resources each service requires.",
        "Created and maintained AWS IAM profiles in Terraform for both machine roles (service accounts, CI/CD pipelines) and human roles across engineering, data, and business departments. Enforced least-privilege and MFA policies.",
        "Set up AWS PrivateLink for secure, private connectivity to third-party cloud providers (no traffic over the public internet) and configured VPC Endpoint Services for controlled inbound access from partners into Thumbtack's infrastructure.",
        "Led zero-downtime migration of Thumbtack's most critical data store from self-hosted EC2 PostgreSQL to Aurora with encrypted storage and in-transit TLS. Coordinated bidirectional replication through AWS DMS without exposing data outside the VPC.",
        "Set up multi-cloud infrastructure across AWS and GCP with Terraform and Puppet, enforcing consistent security policies across both clouds. Cut costs 35% while bringing disaster recovery from hours to minutes.",
      ],
    },
    {
      title: "Senior Software Engineer, Online Services",
      company: "Thumbtack",
      location: "San Francisco, CA",
      date: "2018 - 2020",
      bullets: [
        "Architected service mesh using Envoy so engineers could spin up network-isolated instances of their microservices in dev/staging, enforcing the same mTLS and access policies as production.",
        "Led the microservices migration of the Users service from the PHP monolith to Golang, establishing service-level authentication and authorization boundaries.",
        "Built Golang service frameworks with built-in security middleware (auth token validation, request signing, rate limiting) adopted across Thumbtack's microservice fleet.",
        "Built Thumbtack's real-time streaming infrastructure on self-managed ECS with Kafka Connect, securing CDC event pipelines with encrypted connections from Aurora WAL to BigQuery.",
        "Migrated a high QPS service (5k+ TCP calls/sec) with near-zero downtime (<50ms). Connection security maintained throughout with no fallback to unencrypted channels.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "GE Digital",
      location: "San Ramon, CA",
      date: "2016 - 2018",
      bullets: [
        "Developed bootstrapping installation scripts in Chef deploying dockerized microservices to edge VMs, with communication secured through MQTT with TLS and certificate-based device authentication.",
        "Designed edge-to-cloud real-time ingestion for CDC datasets from SQL Server with encrypted transit and access-controlled cloud endpoints.",
        "Built resiliency in Efficiency Analyzer Application using the circuit breaker pattern with Netflix Hystrix, preventing cascading failures from compromising service availability.",
      ],
    },
    {
      title: "Software Engineer",
      company: "American Express",
      location: "New York",
      date: "2016",
      bullets: [
        "Built a Spring Web Application for customer service representatives to service loan account requests, working within American Express's strict financial security and compliance requirements.",
        "Contributed to the breakdown of monolithic architecture into microservices, establishing service boundaries aligned with PCI-DSS data isolation requirements.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Securonix Solutions",
      location: "Dallas, TX",
      date: "2014 - 2016",
      bullets: [
        "Integrated SAML SSO into the security analytics platform, enabling federated identity and single sign-on across customer deployments.",
        "Implemented clustering algorithm to identify beaconing behavior of network endpoints, detecting command-and-control communication patterns for threat hunting.",
        "Designed and developed a Grails application for simulating real-time log feeds of different SIEM solutions (Splunk, ArcSight, QRadar) for security analyst training and product testing.",
        "Created a framework in Java for programmatic Spark job submissions in YARN cluster mode in fully kerberized environments, maintaining secure authentication chains for distributed security analytics workloads.",
        "Implemented WebSocket capability for low-latency updates on security dashboards, enabling real-time threat visibility.",
      ],
    },
  ],

  education: [
    {
      degree: "M.Sc. in Electrical Engineering - Audio/Video Processing",
      school: "University of Southern California",
      date: "2012 - 2013",
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

export default resumeDataSecurity;
