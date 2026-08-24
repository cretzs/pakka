import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import {
  essayPath,
  getNeighbors,
  getPost,
  getPosts,
  getRelated,
  readingTime,
} from "@/lib/posts";
import { categoryLabel } from "@/lib/site";

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/essays/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };

  const description = post.subtitle || post.title;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function EssayPage({
  params,
}: PageProps<"/essays/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const minutes = readingTime(post.content);
  const related = getRelated(post);
  const { newer, older } = getNeighbors(post);

  return (
    <article className="article">
      <h1 className="article-title">{post.title}</h1>
      {post.subtitle ? <p className="article-dek">{post.subtitle}</p> : null}
      <p className="article-meta">
        <time dateTime={post.date}>{post.date}</time>
        {" · "}
        {categoryLabel(post.category)}
        {" · "}
        {minutes} min read
      </p>
      <div className="article-entry">
        <Markdown content={post.content} />
      </div>
      {related.length > 0 ? (
        <section className="essay-related">
          <p className="section-label">Related</p>
          <ul>
            {related.map((other) => (
              <li key={other.slug}>
                <Link href={essayPath(other.slug)}>{other.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <nav className="essay-nav" aria-label="Essay sequence">
        {older ? (
          <Link href={essayPath(older.slug)}>← {older.title}</Link>
        ) : (
          <span />
        )}
        {newer ? <Link href={essayPath(newer.slug)}>{newer.title} →</Link> : <span />}
      </nav>
    </article>
  );
}
