import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const etBook = localFont({
  src: [
    {
      path: "./fonts/et-book-roman.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/et-book-italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/et-book-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-et-book",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={etBook.variable}>
      <body className={etBook.className}>
        <div className="site">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
