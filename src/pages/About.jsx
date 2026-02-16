import resumeData from "../data/resumeData";
import { decode } from "../utils/obfuscate";
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import "./About.css";

export default function About() {
  const d = resumeData;
  const email = decode(d.email);
  return (
    <div className="about-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">{d.name}</h1>
          <h2 className="hero-title">{d.title}</h2>
          <p className="hero-summary">{d.summary}</p>
          <div className="hero-links">
            <a href={`mailto:${email}`} className="hero-btn primary">
              <Mail size={16} /> Get in Touch
            </a>
            <a href="#/resume" className="hero-btn secondary">
              View Resume <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <div className="hero-highlights">
            <h4>Career Highlights</h4>
            <ul className="highlights-list">
              <li>Drove 96% adoption of AI coding tools across Thumbtack engineering</li>
              <li>Led zero-downtime migration from EC2 PostgreSQL to Aurora</li>
              <li>Built real-time streaming infra with Kafka Connect and BigQuery</li>
              <li>Dropped a critical API from 500ms to 30ms p99</li>
              <li>15+ years across infrastructure, SRE, and developer experience</li>
            </ul>
          </div>
          <div className="hero-details">
            <div className="detail-item">
              <MapPin size={16} />
              <span>{d.location}</span>
            </div>
            <div className="detail-item">
              <Linkedin size={16} />
              <a
                href={`https://${d.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="detail-item">
              <Github size={16} />
              <a
                href={`https://${d.github}`}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights">
        <h3>What I Do</h3>
        <div className="highlight-grid">
          <div className="highlight-card">
            <div className="highlight-icon">AI</div>
            <h4>AI-Driven Developer Experience</h4>
            <p>
              Leading the integration of agentic AI tools into the software
              development lifecycle, achieving near-universal adoption.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">SRE</div>
            <h4>Platform & Reliability Engineering</h4>
            <p>
              Architecting resilient cloud infrastructure across AWS and GCP,
              with expertise in service mesh, data pipelines, and zero-downtime
              migrations.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">DX</div>
            <h4>Developer Productivity</h4>
            <p>
              Building tools and environments that let engineers focus on
              shipping -- from cloud dev environments to cross-tool automation.
            </p>
          </div>
        </div>
      </section>

      <section className="highlights">
        <h3>Mentoring & Leadership</h3>
        <div className="highlight-grid highlight-grid-2">
          <div className="highlight-card">
            <div className="highlight-icon">M</div>
            <h4>Engineering Mentorship</h4>
            <p>
              Mentored engineers through Thumbtack's formal mentoring program
              across levels -- coached an L7 engineer on technical infrastructure
              while still at L6, and later mentored an L6 engineer after
              promotion to L7. Mentees have since leveled up to Senior Software
              Engineering positions and moved into management.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">TL</div>
            <h4>Team Building</h4>
            <p>
              Led recruiting and restaffing as Tech Lead after a company
              restructuring. Helped rebuild the team and onboard new engineers.
            </p>
          </div>
        </div>
      </section>

      <section className="highlights">
        <h3>Open Source & Side Projects</h3>
        <div className="highlight-grid highlight-grid-2">
          <div className="highlight-card">
            <div className="highlight-icon">🐳</div>
            <h4>
              moby/moby{" "}
              <a
                href="https://github.com/moby/moby/pull/42320"
                target="_blank"
                rel="noreferrer"
                className="oss-link"
              >
                <ExternalLink size={14} />
              </a>
            </h4>
            <p>
              Fixed a race condition in Docker's fluentd logging driver where
              Close() could fire while the run() goroutine was still writing,
              causing a panic. Added sync.WaitGroup coordination to guarantee
              the goroutine exits before the underlying logger shuts down.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">🔐</div>
            <h4>
              okta-aws-cli-assume-role{" "}
              <a
                href="https://github.com/oktadev/okta-aws-cli-assume-role/pull/387"
                target="_blank"
                rel="noreferrer"
                className="oss-link"
              >
                <ExternalLink size={14} />
              </a>
            </h4>
            <p>
              Fixed SMS authentication in the Okta AWS CLI tool. The first SMS
              verify response omits the session token, which broke the auth
              flow. Added a check for the token before reading it.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">📋</div>
            <h4>
              geek-life{" "}
              <a
                href="https://github.com/anujva/geek-life"
                target="_blank"
                rel="noreferrer"
                className="oss-link"
              >
                <ExternalLink size={14} />
              </a>
            </h4>
            <p>
              Extended a TUI task manager with Jira and Linear integration --
              two-way epic/task sync, search, vim-style keybindings (gg,
              Shift+G), project description panes, and browser shortcuts to
              open tickets directly. 35 commits over 18 months.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">📝</div>
            <h4>
              previm{" "}
              <a
                href="https://github.com/anujva/previm"
                target="_blank"
                rel="noreferrer"
                className="oss-link"
              >
                <ExternalLink size={14} />
              </a>
            </h4>
            <p>
              Added vimwiki support to previm, a vim plugin for previewing
              markdown files in the browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
