const resumeData = {
  name: "Anuj Varma",
  title: "Staff Software Engineer",
  location: "Seattle, WA",
  // obfuscated: base64(reverse(plaintext)) — see src/utils/obfuscate.js
  phone: "MTE3Ny0wNDYtNTI5",
  email: "bW9jLmxpYW1nQGF2anVuYQ==",
  linkedin: "linkedin.com/in/anuj-varma-6b625520",
  github: "github.com/anujva",

  summary:
    "Staff Engineer, 15+ years building distributed systems and platform infrastructure. Got promoted to Staff as SRE Tech Lead owning Thumbtack's AWS and GCP infrastructure, then moved over to lead AI-driven developer productivity. I've spent most of my career on cloud infrastructure, service meshes, container orchestration frameworks like ECS, EKS, Kubernetes and Nomad, real-time data pipelines, and more recently agentic AI tooling.",

  skills: {
    "Programming Languages": [
      "Golang",
      "Java",
      "Python",
      "Scala",
      "JavaScript",
      "C++",
      "Groovy",
      "R",
      "Perl",
    ],
    "Frameworks & Tools": [
      "Spring",
      "Spark",
      "Akka",
      "React",
      "Envoy",
      "Kafka Connect",
      "Airflow",
      "MapReduce",
    ],
    "Databases & Messaging": [
      "PostgreSQL",
      "Aurora",
      "Elasticsearch",
      "InfluxDB",
      "Kafka",
      "BigQuery",
      "MySQL",
      "MongoDB",
      "Cassandra",
      "DynamoDB",
    ],
    "Infrastructure & DevOps": [
      "AWS",
      "GCP",
      "Jenkins",
      "Docker",
      "Terraform",
      "ECS",
      "Chef",
      "Puppet",
      "Microservices",
      "Service Mesh",
    ],
  },

  experience: [
    {
      title: "Staff Engineer, Developer Experience",
      company: "Thumbtack",
      location: "Remote",
      date: "2024 - Present",
      bullets: [
        "Rolled out 6 agentic coding tools (GitHub Copilot Agents, Roo Code, Claude Code, OpenCode, Augment, Codex) across Thumbtack engineering. Hit 96%+ developer adoption in the first rollout.",
        "Built a cross-tool shim layer that translates engineering best practices (skills and scripts) once and applies them across all agentic tools, so we don't have to configure each tool separately.",
        "Built an AI Slack bot for cross-codebase Q&A, change request creation, and automated code reviews.",
        "Teaching AI-driven development internally and building a course on building AI systems at Thumbtack.",
        "Built an isolated cloud dev environment where engineers spin up resources like PostgreSQL with one click and get shareable demo URLs. Cut environment setup from days to minutes; feature demo frequency went up 40%.",
      ],
    },
    {
      title: "Staff Engineer / SRE Tech Lead",
      company: "Thumbtack",
      location: "Remote",
      date: "2020 - 2024",
      bullets: [
        "Led zero-downtime migration of Thumbtack's most critical data store from self-hosted EC2 PostgreSQL to Aurora. Set up bidirectional replication through AWS DMS, coordinated the cutover, and upgraded client libraries across PHP, Golang, Python, and Scala services without dropping requests.",
        "Replaced the legacy sqoop-based pipeline that shipped PostgreSQL tables to BigQuery. Moved it to Aurora FastClones orchestrated through Airflow -- spin up a clone, read the data, ship it to BigQuery, tear the clone down. Production databases took zero load.",
        "Refactored and upgraded the service mesh: built a new Envoy control plane with go-control-plane and ran sidecar Envoy containers alongside ECS and EC2 workloads.",
        "Set up multi-cloud infrastructure across AWS and GCP with Terraform and Puppet. Cut costs 35% and brought disaster recovery response time from hours to minutes.",
      ],
    },
    {
      title: "Senior Software Engineer, Online Services",
      company: "Thumbtack",
      location: "San Francisco, CA",
      date: "2018 - 2020",
      bullets: [
        "Led the microservices migration of the Users service from the PHP monolith to Golang, then extended its APIs to cover a much broader set of functionality.",
        "Built Golang service frameworks adopted across Thumbtack's microservice fleet.",
        "Built Thumbtack's real-time streaming infrastructure: Kafka Connect on self-managed ECS capturing CDC events via WAL from Aurora, with kafka-connect-bigquery writing events to BigQuery in real time.",
        "Architected service mesh using Envoy so engineers could spin up network-isolated instances of their microservices in dev/staging without running the full 40+ service stack.",
        "Dropped latency on a critical findUsers API from 500+ms to 30ms p99. Overall application responsiveness improved 15%, and user engagement went up 22%.",
        "Wrote a load testing tool in Go that cut test implementation time by 70% and surfaced bottlenecks that led to 40% higher system throughput.",
        "Migrated a high QPS service (5k+ TCP calls/sec) with near-zero downtime (<50ms). 99.999% of user sessions stayed intact.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "GE Digital",
      location: "San Ramon, CA",
      date: "2016 - 2018",
      bullets: [
        "Developed bootstrapping installation script in Chef deploying dockerized microservices to run at the edge in a VM, controlled by cloud applications through MQTT.",
        "Designed and implemented edge-to-cloud real-time ingestion service for CDC datasets generated by SQL Server.",
        "Improved initial ingestion time for 25GB datasets from 8-12 hours to under 1 hour by implementing compression and byte serialization using Smile encoder/decoder.",
        "Built resiliency in Efficiency Analyzer Application using the circuit breaker pattern with Netflix Hystrix API.",
        "Created a demo application using FF4J and introduced the team to trunk-based development with feature flags.",
      ],
    },
    {
      title: "Software Engineer",
      company: "American Express",
      location: "New York",
      date: "2016",
      bullets: [
        "Built a Spring Web Application for customer service representatives to service loan account requests.",
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
        "Implemented WebSocket capability for low-latency updates on dynamic UI components (dashboards, graphs, charts).",
        "Integrated SAML SSO into the application for single sign-on across customer deployments.",
        "Designed and developed Grails application for simulating real-time log feeds of different SIEM logging solutions.",
        "Implemented clustering algorithm to identify beaconing behavior of network endpoints for security monitoring.",
        "Created a framework in Java for programmatic Spark job submissions in YARN cluster mode in fully kerberized environments.",
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

export default resumeData;
