import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-head">
      <h1 className="headline">
        <Link href="/">{site.name}</Link>
      </h1>
      <div className="mast">
        <nav className="navlinks" aria-label="Sections">
          <Link href="/essays">essays</Link>
          <Link href="/about">about</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
