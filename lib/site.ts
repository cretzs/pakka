export const site = {
  name: "Pakkā",
  title: "Pakkā",
  description: "Notes on AI, risk, governance and human judgment",
};

export const categories = [
  { slug: "governance", label: "AI Governance" },
  { slug: "risk", label: "AI Risk" },
  { slug: "financial-crime", label: "Financial Crime" },
  { slug: "regulation", label: "Regulation" },
  { slug: "second-line", label: "Second Line of Defence" },
  { slug: "oversight", label: "Human Oversight" },
  { slug: "agentic", label: "Agentic AI" },
  { slug: "society", label: "Society & Philosophy" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function categoryLabel(slug: CategorySlug) {
  return categories.find((category) => category.slug === slug)?.label ?? slug;
}

export function isCategorySlug(value: unknown): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}

export function siteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}
