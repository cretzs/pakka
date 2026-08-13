import Link from "next/link";
import { formatDate, getPosts } from "@/lib/posts";

export function SiteFooter() {
  const recent = getPosts().slice(0, 3);
  const year = new Date().getFullYear();

  return (
    <footer className="site-foot">
      <div className="wrap">
        {recent.length > 0 ? (
          <div className="foot-recent">
            <p className="foot-label">Recent</p>
            <ul>
              {recent.map((post) => (
                <li key={post.slug}>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  <time dateTime={post.date}>{formatDate(post.date, "full")}</time>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <hr className="foot-rule" />
        <p className="foot-copy">
          © {year} | <a href="/feed.xml">RSS</a>
        </p>
      </div>
    </footer>
  );
}
