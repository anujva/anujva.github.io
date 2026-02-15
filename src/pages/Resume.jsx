import { useRef } from "react";
import resumeData from "../data/resumeData";
import { Download } from "lucide-react";
import "./Resume.css";

export default function Resume() {
  const resumeRef = useRef(null);
  const d = resumeData;

  const handleDownload = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: "Anuj_Varma_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="resume-page">
      <div className="resume-toolbar">
        <h2>Resume</h2>
        <button className="download-btn" onClick={handleDownload}>
          <Download size={16} />
          Download PDF
        </button>
      </div>

      <div className="resume-paper" ref={resumeRef}>
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
                <span>{d.phone}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <span>{d.email}</span>
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
