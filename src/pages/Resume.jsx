import { useState } from "react";
import generalData from "../data/resumeData";
import securityData from "../data/resumeDataSecurity";
import { decode } from "../utils/obfuscate";
import { Download } from "lucide-react";
import "./Resume.css";

const variants = [
  { key: "general", label: "General", data: generalData },
  { key: "security", label: "Security", data: securityData },
];

export default function Resume() {
  const [activeKey, setActiveKey] = useState("general");

  const active = variants.find((v) => v.key === activeKey);
  const d = active.data;
  const email = decode(d.email);
  const phone = decode(d.phone);

  const handleDownload = () => window.print();

  return (
    <div className="resume-page">
      <div className="resume-toolbar">
        <h2>Resume</h2>
        <div className="toolbar-actions">
          <div className="variant-toggle">
            {variants.map((v) => (
              <button
                key={v.key}
                className={`variant-btn ${activeKey === v.key ? "active" : ""}`}
                onClick={() => setActiveKey(v.key)}
              >
                {v.label}
              </button>
            ))}
          </div>
          <button className="download-btn" onClick={handleDownload}>
            <Download size={16} />
            Save as PDF
          </button>
        </div>
      </div>

      <div className="resume-paper">
        {/* Sidebar */}
        <aside className="resume-sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-name">{d.name}</h1>
            <p className="sidebar-title">{d.title}</p>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-heading">Contact</h3>
            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <span>{phone}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <span>{email}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">LinkedIn</span>
                <span>{d.linkedin}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location</span>
                <span>{d.location}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-heading">Skills</h3>
            {Object.entries(d.skills).map(([category, skills]) => (
              <div key={category} className="skill-group">
                <h4 className="skill-category-title">{category}</h4>
                <div className="skill-tags">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-heading">Languages</h3>
            {d.languages.map((lang) => (
              <div key={lang.name} className="language-item">
                <span className="language-name">{lang.name}</span>
                <span className="language-level">{lang.level}</span>
              </div>
            ))}
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-heading">Education</h3>
            {d.education.map((edu, i) => (
              <div key={i} className="edu-item-sidebar">
                <p className="edu-degree-sidebar">{edu.degree}</p>
                <p className="edu-school-sidebar">{edu.school}</p>
                <p className="edu-date-sidebar">{edu.date}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="resume-main">
          <div className="main-section">
            <h2 className="section-title">
              <span className="section-icon">&#9654;</span>
              Profile
            </h2>
            <p className="profile-text">{d.summary}</p>
          </div>

          <div className="main-section">
            <h2 className="section-title">
              <span className="section-icon">&#9654;</span>
              Work History
            </h2>
            {d.experience.map((job, i) => (
              <div key={i} className="job-entry">
                <div className="job-header">
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">
                      {job.company} &mdash; {job.location}
                    </p>
                  </div>
                  <span className="job-date">{job.date}</span>
                </div>
                <ul className="job-bullets">
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
