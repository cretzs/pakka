import Link from "next/link";
import { Markdown } from "@/components/markdown";
import { formatDate, getPosts, type Post } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();

  if (posts.length === 0) {
    return (
      <p className="empty">
        Nothing here yet. <Link href="/write">Write the first post</Link>.
      </p>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <Entry key={post.slug} post={post} />
      ))}
    </div>
  );
}

function Entry({ post }: { post: Post }) {
  return (
    <article className="entry" id={post.slug}>
      <h2 className="entry-title">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <time className="title-date" dateTime={post.date}>
        {formatDate(post.date, "full")}
      </time>
      <Markdown content={post.content} />
    </article>
  );
}
