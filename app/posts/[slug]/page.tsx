import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { formatDate, getPost, getPosts } from "@/lib/posts";

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function PostPage({
  params,
}: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="entry">
      <h1 className="entry-title">{post.title}</h1>
      <time className="title-date" dateTime={post.date}>
        {formatDate(post.date, "full")}
      </time>
      <Markdown content={post.content} />
    </article>
  );
}
