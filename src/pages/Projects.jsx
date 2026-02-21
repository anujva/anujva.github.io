import { GitMerge, ExternalLink } from "lucide-react";
import "./Projects.css";

const contributions = [
  {
    repo: "moby/moby",
    title: "Wait for run goroutine to exit before Close",
    description:
      "Fixed a race condition in Docker's RingLogger where Close() could be called while the run() goroutine was still writing to the underlying logging driver. Added a sync.WaitGroup to ensure the goroutine exits before Close() proceeds, preventing panics in downstream log drivers like fluentd.",
    tags: ["Go", "Concurrency", "Docker", "Logging"],
    pr: "https://github.com/moby/moby/pull/42320",
    merged: "May 2021",
    milestone: "Docker 23.0.0",
  },
  {
    repo: "fluent/fluent-logger-golang",
    title: "Fix panic on writing to closed channel",
    description:
      "Added defensive channel-close detection in the Fluentd Go logger to prevent panics when the Docker daemon calls Log() after Close(). Introduced a sync.RWMutex guard around the pending channel with a closed flag, and added tests to verify the fix.",
    tags: ["Go", "Concurrency", "Fluentd", "Logging"],
    pr: "https://github.com/fluent/fluent-logger-golang/pull/93",
    merged: "May 2021",
  },
];

export default function Projects() {
  return (
    <div className="projects-page">
      <div className="projects-header">
        <h2>Projects</h2>
        <p>
          Open-source contributions, side projects, and tools I've built.
        </p>
      </div>

      <div className="projects-section">
        <h3>Open-Source Contributions</h3>
        <div className="project-grid">
          {contributions.map((c) => (
            <div className="project-card" key={c.pr}>
              <div className="project-card-top">
                <div className="project-card-title">
                  <span className="project-card-icon">
                    <GitMerge size={18} />
                  </span>
                  <div>
                    <h4>{c.title}</h4>
                    <span className="project-card-repo">{c.repo}</span>
                  </div>
                </div>
                <a
                  href={c.pr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-link"
                  aria-label={`View pull request on GitHub`}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <p className="project-card-desc">{c.description}</p>
              <div className="project-card-tags">
                {c.tags.map((tag) => (
                  <span className="project-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="project-card-meta">
                Merged {c.merged}
                {c.milestone ? ` \u00B7 ${c.milestone}` : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
