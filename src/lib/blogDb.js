import initSqlJs from "sql.js";

let dbInstance = null;
let dbPromise = null;

/**
 * Initialise (or return cached) in-browser SQLite database.
 * Loads the WASM binary from /sql-wasm.wasm and the blog data from /blog.db.
 */
function getDb() {
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    const SQL = await initSqlJs({
      locateFile: (file) => `/${file}`,
    });

    const response = await fetch("/blog.db");
    if (!response.ok) {
      throw new Error(`Failed to fetch blog.db: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    dbInstance = new SQL.Database(new Uint8Array(buffer));
    return dbInstance;
  })();

  // Reset on failure so the next call retries
  dbPromise.catch(() => {
    dbPromise = null;
  });

  return dbPromise;
}

/**
 * Run a query and return rows as plain objects.
 */
async function query(sql, params = []) {
  const db = await getDb();
  const stmt = db.prepare(sql);
  stmt.bind(params);

  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

/* ── Public API ─────────────────────────────────────────────── */

export async function getAllPosts() {
  return query(
    `SELECT id, title, slug, excerpt, tags, published_at
     FROM posts
     ORDER BY published_at DESC`
  );
}

export async function getPostBySlug(slug) {
  const rows = await query(
    `SELECT id, title, slug, excerpt, content, tags, published_at
     FROM posts
     WHERE slug = ?`,
    [slug]
  );
  return rows[0] || null;
}

export async function getPostsByTag(tag) {
  // tags is stored as comma-separated, e.g. "distributed-systems, engineering"
  return query(
    `SELECT id, title, slug, excerpt, tags, published_at
     FROM posts
     WHERE ',' || REPLACE(tags, ' ', '') || ',' LIKE '%,' || ? || ',%'
     ORDER BY published_at DESC`,
    [tag]
  );
}

export async function getAllTags() {
  const rows = await query(`SELECT tags FROM posts`);
  const tagSet = new Set();
  for (const row of rows) {
    for (const t of row.tags.split(",")) {
      const trimmed = t.trim();
      if (trimmed) tagSet.add(trimmed);
    }
  }
  return [...tagSet].sort();
}
