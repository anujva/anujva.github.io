const resumeDataSecurity = {
  name: "Anuj Varma",
  title: "Engineering Leader, Security & Infrastructure",
  location: "Mumbai Metropolitan Area",
  // obfuscated: base64(reverse(plaintext)). See src/utils/obfuscate.js
  phone: "MTE3Ny0wNDYtNTI5",
  email: "bW9jLmxpYW1nQGF2anVuYQ==",
  linkedin: "linkedin.com/in/anuj-varma-6b625520",
  github: "github.com/anujva",

  summary:
    "Engineering leader with 15+ years building secure distributed systems and cloud infrastructure, currently Executive Director at Wissen Technology leading Platform Engineering. Started career at Infosys on the Telstra Digital Transformation project, then co-founded a startup building a crowdsourced recommendation platform for local deals. Got promoted to Staff as SRE Tech Lead owning Thumbtack's AWS and GCP infrastructure, which is where most of the security work sat: mTLS across the service mesh, WAF and Shield in front of the API layer, least-privilege IAM, VPC segmentation, and PrivateLink for partner connectivity. Earlier in my career I worked on SIEM security analytics at Securonix. Since then I've hardened infrastructure with Terraform and secured container orchestration on ECS, EKS, and Kubernetes.",

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
      title: "Executive Director",
      company: "Wissen Technology",
      location: "Mumbai Metropolitan Area",
      date: "2026 - Present",
      bullets: [
        "Leading Platform Engineering for Wissen's product platform: multi-account AWS landing zone vended through OpenTofu, immutable infrastructure with Packer-built golden AMIs, and HashiCorp Nomad for workload orchestration.",
        "Rolled out a Consul service mesh with default-deny ACLs and mTLS: services need explicit intentions to talk, and nothing on the east-west path is plaintext.",
        "Hardened the self-hosted git forge: SSH only through an SSM tunnel (no public port 22), credentials rotated via Secrets Manager, CI on ephemeral per-job VMs so no build state survives a job.",
        "Built the platform SDK to resolve secrets at deploy time (never in rendered config) and reject unpinned image tags; standardized invite-only passkey auth across internal apps.",
      ],
    },
    {
      title: "Staff Engineer, Developer Experience",
      company: "Thumbtack",
      location: "Remote",
      date: "2024 - March 2026",
      bullets: [
        "Rolled out 6 agentic coding tools across engineering, each behind the same guardrails: scoped permissions, secret-filtering shim layers, and sandboxed execution.",
        "Built an isolated cloud dev environment where engineers spin up resources like PostgreSQL with one click. Per-environment IAM boundaries keep dev resources away from production data.",
        "Built a cross-tool shim layer that applies our security practices (secret scanning, dependency policies) the same way across every agentic coding tool.",
      ],
    },
    {
      title: "Staff Engineer / SRE Tech Lead",
      company: "Thumbtack",
      location: "Remote",
      date: "2020 - 2024",
      bullets: [
        "Built Thumbtack's service mesh with Envoy and go-control-plane, which put mTLS on all inter-service communication. Services authenticate each other cryptographically, so no plaintext traffic moves inside the cluster.",
        "Configured AWS WAF and AWS Shield in front of Thumbtack's API layer, covering both the HTTP/REST endpoints and GraphQL. Injection attempts, rate-limit abuse, and DDoS traffic get blocked before they reach application code.",
        "Designed and implemented the AWS VPC architecture, with security group rules that keep network access least-privilege. ECS services run under scoped IAM task roles that reach only the AWS resources each one actually needs.",
        "Created and maintained AWS IAM profiles in Terraform for both machine roles (service accounts, CI/CD pipelines) and human roles across engineering, data, and business departments. Enforced least-privilege and MFA policies.",
        "Set up AWS PrivateLink for private connectivity to third-party cloud providers, so none of that traffic crossed the public internet. Configured VPC Endpoint Services for controlled inbound access from partners into Thumbtack's infrastructure.",
        "Led zero-downtime migration of Thumbtack's most critical data store from self-hosted EC2 PostgreSQL to Aurora, with encrypted storage and TLS in transit. Coordinated bidirectional replication through AWS DMS, and the data never left the VPC.",
        "Set up multi-cloud infrastructure across AWS and GCP with Terraform and Puppet, applying the same security policies on both. Cut costs 35% and brought disaster recovery from hours to minutes.",
      ],
    },
    {
      title: "Senior Software Engineer, Online Services",
      company: "Thumbtack",
      location: "San Francisco, CA",
      date: "2018 - 2020",
      bullets: [
        "Architected service mesh using Envoy so engineers could spin up network-isolated instances of their microservices in dev/staging, under the same mTLS and access policies as production.",
        "Led the microservices migration of the Users service from the PHP monolith to Golang, and drew the service-level authentication and authorization boundaries in the process.",
        "Built Golang service frameworks with security middleware baked in (auth token validation, request signing, rate limiting), adopted across Thumbtack's microservice fleet.",
        "Built Thumbtack's real-time streaming infrastructure on self-managed ECS with Kafka Connect. CDC events travel over encrypted connections from the Aurora WAL to BigQuery.",
        "Migrated a high QPS service (5k+ TCP calls/sec) with near-zero downtime (<50ms), and no connection fell back to an unencrypted channel during the cutover.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "GE Digital",
      location: "San Ramon, CA",
      date: "2016 - 2018",
      bullets: [
        "Wrote Chef bootstrapping scripts that deployed dockerized microservices to edge VMs. Those VMs talked to the cloud over MQTT with TLS and certificate-based device authentication.",
        "Designed edge-to-cloud real-time ingestion for CDC datasets from SQL Server, with encrypted transit and access-controlled cloud endpoints.",
        "Built resiliency into the Efficiency Analyzer Application using the circuit breaker pattern with Netflix Hystrix, so one failing dependency could not take the service down with it.",
      ],
    },
    {
      title: "Software Engineer",
      company: "American Express",
      location: "New York",
      date: "2016",
      bullets: [
        "Built a Spring Web Application for customer service representatives to service loan account requests, under American Express's financial security and compliance requirements.",
        "Contributed to the breakdown of monolithic architecture into microservices, establishing service boundaries aligned with PCI-DSS data isolation requirements.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Securonix Solutions",
      location: "Dallas, TX",
      date: "2014 - 2016",
      bullets: [
        "Integrated SAML SSO into the security analytics platform so customers could use federated identity and single sign-on across their deployments.",
        "Implemented a clustering algorithm that flagged beaconing behavior on network endpoints, the pattern threat hunters look for in command-and-control traffic.",
        "Designed and developed a Grails application that simulated real-time log feeds from different SIEM solutions (Splunk, ArcSight, QRadar) for security analyst training and product testing.",
        "Created a framework in Java for programmatic Spark job submissions in YARN cluster mode in fully kerberized environments, so distributed analytics jobs kept a valid authentication chain.",
        "Implemented WebSocket updates so security dashboards refreshed with low latency.",
      ],
    },
    {
      title: "Director",
      company: "Sketch Lounge Web Services Pvt. Ltd.",
      location: "India",
      date: "Apr 2010 - Aug 2011",
      hideInPrint: true,
      bullets: [
        "Led development of a crowdsourced recommendation engine for local deals, where shoppers compared prices and read recommendations from real buyers before big-ticket purchases.",
        "Architected and built the web platform using Python (Django) and PHP (Drupal), handling backend development, database design, and API integrations.",
        "Developed Android mobile applications to extend the platform to mobile users.",
        "Managed a small team of developers, overseeing code reviews, sprint planning, and product delivery.",
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
        "Deployed applications on JBoss Web Server and Tomcat in production, and set up the access controls around those deployments.",
        "Collaborated with offshore and onshore teams following Infosys's structured delivery methodology.",
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

export default resumeDataSecurity;