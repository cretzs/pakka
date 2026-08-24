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
        <p>
          I come from financial crime and regulatory compliance: second line of
          defence work, where the question is not whether a control exists on
          paper but whether someone can still be held to account when it fails.
          The central question here is what happens to risk, accountability and
          human judgment when organizations increasingly delegate cognitive work
          to AI.
        </p>
        <p>
          I am not writing as an AI expert. I am writing as someone who has
          watched existing risk and governance disciplines meet a technology
          that does not fit their current categories, and who thinks those
          disciplines still have to evolve rather than be replaced.
        </p>
      </div>
    </article>
  );
}
