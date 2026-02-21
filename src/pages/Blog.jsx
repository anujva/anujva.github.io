import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Tag, Database } from "lucide-react";
import { getAllPosts, getAllTags } from "../lib/blogDb";
import "./Blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [allPosts, allTags] = await Promise.all([
          getAllPosts(),
          getAllTags(),
        ]);
        if (!cancelled) {
          setPosts(allPosts);
          setTags(allTags);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPosts = activeTag
    ? posts.filter((p) =>
        p.tags
          .split(",")
          .map((t) => t.trim())
          .includes(activeTag)
      )
    : posts;

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-loading">
          <Database size={24} className="blog-loading-icon" />
          <span>Loading posts from SQLite...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="blog-error">
          <p>Failed to load blog database: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h2>Blog</h2>
        <p>
          Posts about distributed systems, AI-driven development, platform
          engineering, and lessons learned from building infrastructure at scale.
        </p>
        <div className="blog-meta-line">
          <Database size={14} />
          <span>
            {posts.length} post{posts.length !== 1 ? "s" : ""} &middot; powered
            by SQLite + WebAssembly
          </span>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="blog-tags">
          <button
            className={`blog-tag ${activeTag === null ? "active" : ""}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`blog-tag ${activeTag === tag ? "active" : ""}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="blog-list">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="blog-card"
          >
            <div className="blog-card-top">
              <BookOpen size={18} className="blog-card-icon" />
              <div className="blog-card-date">
                <Calendar size={13} />
                <time>
                  {new Date(post.published_at + "T00:00:00").toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </time>
              </div>
            </div>
            <h3>{post.title}</h3>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <div className="blog-card-tags">
              {post.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span key={tag} className="blog-card-tag">
                    <Tag size={11} />
                    {tag}
                  </span>
                ))}
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="blog-empty">
          <p>No posts found for tag &ldquo;{activeTag}&rdquo;.</p>
        </div>
      )}
    </div>
  );
}
