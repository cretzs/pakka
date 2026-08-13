import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-head">
      <div className="wrap">
        <p className="site-name">
          <Link href="/">Telos</Link>
        </p>
      </div>
    </header>
  );
}
