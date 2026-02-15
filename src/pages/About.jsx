import resumeData from "../data/resumeData";
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowRight,
} from "lucide-react";
import "./About.css";

export default function About() {
  const d = resumeData;
  return (
    <div className="about-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">{d.name}</h1>
          <h2 className="hero-title">{d.title}</h2>
          <p className="hero-summary">{d.summary}</p>
          <div className="hero-links">
            <a href={`mailto:${d.email}`} className="hero-btn primary">
              <Mail size={16} /> Get in Touch
            </a>
            <a href="#/resume" className="hero-btn secondary">
              View Resume <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <div className="hero-card">
            <div className="hero-stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">5</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">96%</span>
              <span className="stat-label">AI Tool Adoption</span>
            </div>
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
    </div>
  );
}
