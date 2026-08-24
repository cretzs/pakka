import type { ReactNode } from "react";
import Link from "next/link";
import { Markdown } from "@/components/markdown";
import { essayPath, formatArchiveDate, type Post } from "@/lib/posts";

export function PostList({
  posts,
  empty,
  variant = "full",
}: {
  posts: Post[];
  empty?: ReactNode;
  variant?: "full" | "archive";
}) {
  if (posts.length === 0) {
    return <>{empty}</>;
  }

  if (variant === "archive") {
    return (
      <div className="archive">
        {posts.map((post) => (
          <p key={post.slug} className="archive-item">
            <Link href={essayPath(post.slug)}>{post.title}</Link> (
            <time dateTime={post.date}>{formatArchiveDate(post.date)}</time>)
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="archive">
      {posts.map((post) => (
        <article key={post.slug} className="article">
          <h2 className="article-title">
            <Link href={essayPath(post.slug)}>{post.title}</Link>
          </h2>
          <p className="article-date">
            <time dateTime={post.date}>{post.date}</time>
          </p>
          <div className="article-entry">
            <Markdown content={post.content} />
          </div>
        </article>
      ))}
    </div>
  );
}
