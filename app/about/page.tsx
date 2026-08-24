import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "about",
  description: site.description,
};

export default function AboutPage() {
  return (
    <article className="article">
      <h1 className="article-title">about</h1>
      <div className="article-entry prose">
        <p>
          Pakkā is a notebook on AI, risk, governance and human judgment.
        </p>
      </div>
    </article>
  );
}
