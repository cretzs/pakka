import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TellshieldLoader } from "@/components/tellshield";
import { site, siteUrl } from "@/lib/site";
import { themeBootScript, themeColors } from "@/lib/theme";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
};

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
    <html lang="en" className={etBook.variable} suppressHydrationWarning>
      <body className={etBook.className}>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <TellshieldLoader />
        <div className="site">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
