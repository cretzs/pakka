import Link from "next/link";

export default function NotFound() {
  return (
    <article className="entry">
      <h1 className="entry-title">Not found</h1>
      <p>That post is not here.</p>
      <p>
        <Link href="/">Back to Telos</Link>
      </p>
    </article>
  );
}
