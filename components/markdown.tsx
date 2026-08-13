import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

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
};

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
