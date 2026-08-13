import type { Metadata } from "next";
import { Libre_Franklin, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const franklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-franklin",
});

export const metadata: Metadata = {
  title: {
    default: "Telos",
    template: "%s · Telos",
  },
  description: "Notes on technology and regulation.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${franklin.variable}`}>
      <body>
        <SiteHeader />
        <div className="site">
          <main>{children}</main>
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
