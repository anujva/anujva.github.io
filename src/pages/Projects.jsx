import { FolderOpen } from "lucide-react";
import "./Placeholder.css";

export default function Projects() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <FolderOpen size={48} className="placeholder-icon" />
        <h2>Projects</h2>
        <p>
          Open-source contributions, side projects, and tools I've built.
        </p>
        <span className="coming-soon">Coming Soon</span>
      </div>
    </div>
  );
}
