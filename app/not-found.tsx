import Link from "next/link";

export default function NotFound() {
  return (
    <article className="article">
      <h1 className="article-title">Not found</h1>
      <p>That page is not here.</p>
      <p>
        <Link href="/">Back to Pakkā</Link>
      </p>
    </article>
  );
}
