import resumeData from "../data/resumeData";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const d = resumeData;
  return (
    <div className="contact-page">
      <h2>Get in Touch</h2>
      <p className="contact-intro">
        I'm always open to discussing platform engineering, AI-driven
        development, or new opportunities. Feel free to reach out through any of
        the channels below.
      </p>
      <div className="contact-grid">
        <a href={`mailto:${d.email}`} className="contact-card">
          <Mail size={24} />
          <h3>Email</h3>
          <span>{d.email}</span>
        </a>
        <a
          href={`https://${d.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <Linkedin size={24} />
          <h3>LinkedIn</h3>
          <span>Connect with me</span>
        </a>
        <a
          href={`https://${d.github}`}
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <Github size={24} />
          <h3>GitHub</h3>
          <span>View my work</span>
        </a>
        <div className="contact-card">
          <Phone size={24} />
          <h3>Phone</h3>
          <span>{d.phone}</span>
        </div>
        <div className="contact-card">
          <MapPin size={24} />
          <h3>Location</h3>
          <span>{d.location}</span>
        </div>
      </div>
    </div>
  );
}
