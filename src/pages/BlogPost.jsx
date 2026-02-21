import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { marked } from "marked";
import { getPostBySlug } from "../lib/blogDb";
import "./BlogPost.css";

// Configure marked for safe, clean output
marked.setOptions({
  gfm: true,
  breaks: false,
});

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getPostBySlug(slug);
        if (!cancelled) {
          setPost(result);
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
  }, [slug]);

  if (loading) {
    return (
      <div className="blogpost-page">
        <div className="blogpost-loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogpost-page">
        <div className="blogpost-error">
          <p>Failed to load post: {error}</p>
          <Link to="/blog" className="blogpost-back">
            <ArrowLeft size={16} /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blogpost-page">
        <div className="blogpost-not-found">
          <h2>Post not found</h2>
          <p>
            No post matches &ldquo;{slug}&rdquo;.
          </p>
          <Link to="/blog" className="blogpost-back">
            <ArrowLeft size={16} /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const htmlContent = marked.parse(post.content);
  const tagList = post.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="blogpost-page">
      <nav className="blogpost-nav">
        <Link to="/blog" className="blogpost-back">
          <ArrowLeft size={16} /> All posts
        </Link>
      </nav>

      <article className="blogpost-article">
        <header className="blogpost-header">
          <h1>{post.title}</h1>
          <div className="blogpost-meta">
            <span className="blogpost-date">
              <Calendar size={14} />
              <time>
                {new Date(
                  post.published_at + "T00:00:00"
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            {tagList.length > 0 && (
              <div className="blogpost-tags">
                {tagList.map((tag) => (
                  <span key={tag} className="blogpost-tag">
                    <Tag size={11} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div
          className="blogpost-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
