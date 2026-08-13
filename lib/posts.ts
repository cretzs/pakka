import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Category = "tech" | "regulations";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: Category;
  excerpt: string;
  tags: string[];
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

const CATEGORIES: Category[] = ["tech", "regulations"];

function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

function isCategory(value: unknown): value is Category {
  return value === "tech" || value === "regulations";
}

export function getPosts(category?: Category): Post[] {
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
    const category = isCategory(data.category) ? data.category : "tech";

    const tags = Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [];

    return {
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      date: typeof data.date === "string" ? data.date : new Date().toISOString().slice(0, 10),
      category,
      excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
      tags,
      content,
    };
  } catch {
    return null;
  }
}

export function getPreview(content: string, paragraphs = 3) {
  const cleaned = content.replace(/^#{1,6}\s+/gm, "").trim();
  const parts = cleaned.split(/\n\s*\n/).filter(Boolean);
  return parts.slice(0, paragraphs).join("\n\n");
}

export function slugify(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return base || "untitled";
}

export function uniqueSlug(title: string) {
  ensureContentDir();
  const base = slugify(title);
  let slug = base;
  let n = 2;

  while (fs.existsSync(path.join(CONTENT_DIR, `${slug}.md`))) {
    slug = `${base}-${n}`;
    n += 1;
  }

  return slug;
}

export function savePost(input: {
  title: string;
  category: Category;
  excerpt: string;
  content: string;
}) {
  ensureContentDir();

  const slug = uniqueSlug(input.title);
  const date = new Date().toISOString().slice(0, 10);
  const markdown = matter.stringify(input.content.trim() + "\n", {
    title: input.title.trim(),
    date,
    category: input.category,
    excerpt: input.excerpt.trim(),
  });

  fs.writeFileSync(path.join(CONTENT_DIR, `${slug}.md`), markdown, "utf8");
  return slug;
}

export function isValidCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category);
}

export function formatDate(date: string, style: "short" | "long" | "full" = "short") {
  return new Intl.DateTimeFormat("en", {
    weekday: style === "full" ? "long" : undefined,
    year: "numeric",
    month: style === "short" ? "short" : "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function categoryLabel(category: Category) {
  return category === "tech" ? "Tech" : "Regulations";
}
