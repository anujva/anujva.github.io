import { BookOpen } from "lucide-react";
import "./Placeholder.css";

export default function Blog() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <BookOpen size={48} className="placeholder-icon" />
        <h2>Blog</h2>
        <p>
          Posts about distributed systems, AI-driven development, platform
          engineering, and lessons learned from building infrastructure at scale.
        </p>
        <span className="coming-soon">Coming Soon</span>
      </div>
    </div>
  );
}
