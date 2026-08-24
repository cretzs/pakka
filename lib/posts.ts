import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isCategorySlug, type CategorySlug } from "@/lib/site";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: CategorySlug;
  featured: boolean;
  tags: string[];
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

export function getPosts(category?: CategorySlug): Post[] {
  ensureContentDir();

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));

  const posts = files
    .map((file) => getPost(file.replace(/\.md$/, "")))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!category) return posts;
  return posts.filter((post) => post.category === category);
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    const { data, content } = matter(raw);
    const category = isCategorySlug(data.category) ? data.category : "governance";

    const tags = Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [];

    return {
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      date: typeof data.date === "string" ? data.date : new Date().toISOString().slice(0, 10),
      category,
      featured: data.featured === true,
      tags,
      content,
    };
  } catch {
    return null;
  }
}

export const HOME_PAGE_SIZE = 9;

export function formatArchiveDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return `${parsed.getUTCFullYear()} ${MONTHS[parsed.getUTCMonth()]} ${parsed.getUTCDate()}`;
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getRelated(post: Post, limit = 3) {
  const same = getPosts(post.category).filter((other) => other.slug !== post.slug);
  const pool = same.length > 0 ? same : getPosts().filter((other) => other.slug !== post.slug);
  return pool.slice(0, limit);
}

export function getNeighbors(post: Post) {
  const posts = getPosts();
  const index = posts.findIndex((other) => other.slug === post.slug);

  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function essayPath(slug: string) {
  return `/essays/${slug}`;
}
