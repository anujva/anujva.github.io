#!/usr/bin/env node

/**
 * Build script: compiles markdown posts from posts/ into a SQLite database (public/blog.db).
 *
 * Each .md file uses YAML-style frontmatter:
 *   ---
 *   title: Post Title
 *   slug: post-slug
 *   excerpt: Short description
 *   tags: tag1, tag2
 *   published_at: 2025-01-15
 *   ---
 *   Markdown content...
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import initSqlJs from "sql.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname, "../posts");
const OUTPUT_PATH = path.resolve(__dirname, "../public/blog.db");

/**
 * Minimal frontmatter parser — no dependencies.
 * Returns { data: {key: value, ...}, content: string }
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Invalid frontmatter format");
  }
  const data = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    data[key] = value;
  }
  return { data, content: match[2].trim() };
}

async function main() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE posts (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT    NOT NULL,
      slug       TEXT    NOT NULL UNIQUE,
      excerpt    TEXT    NOT NULL DEFAULT '',
      content    TEXT    NOT NULL,
      tags       TEXT    NOT NULL DEFAULT '',
      published_at TEXT  NOT NULL
    );
    CREATE INDEX idx_posts_slug ON posts(slug);
    CREATE INDEX idx_posts_published ON posts(published_at DESC);
  `);

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  console.log(`Found ${files.length} post(s) in ${POSTS_DIR}`);

  const insert = db.prepare(
    `INSERT INTO posts (title, slug, excerpt, content, tags, published_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = parseFrontmatter(raw);

    if (!data.title || !data.slug || !data.published_at) {
      console.warn(`  Skipping ${file}: missing required frontmatter fields`);
      continue;
    }

    insert.run([
      data.title,
      data.slug,
      data.excerpt || "",
      content,
      data.tags || "",
      data.published_at,
    ]);
    console.log(`  + ${data.slug}`);
  }

  insert.free();

  // Write the database to disk
  const buffer = db.export();
  const uint8 = new Uint8Array(buffer);
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, uint8);

  db.close();
  console.log(`\nWrote ${OUTPUT_PATH} (${uint8.byteLength} bytes)`);
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
