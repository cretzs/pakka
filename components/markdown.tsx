import { isValidElement, type ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/headings";

function textFromNode(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (isValidElement(node)) {
    const children = (node.props as { children?: ReactNode }).children;
    return textFromNode(children);
  }
  return "";
}

const components: Components = {
  a({ href, children }) {
    const external = Boolean(href?.startsWith("http"));
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  h2({ children }) {
    const text = textFromNode(children);
    return <h2 id={slugifyHeading(text)}>{children}</h2>;
  },
  h3({ children }) {
    const text = textFromNode(children);
    return <h3 id={slugifyHeading(text)}>{children}</h3>;
  },
};

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
