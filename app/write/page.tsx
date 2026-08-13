import { WriteForm } from "./write-form";

export const metadata = {
  title: "Write",
};

export default function WritePage() {
  return (
    <article className="entry">
      <h1 className="entry-title">New post</h1>
      <p>
        Write it as a brief: what happened, what it means, then stop. Posts are
        saved as Markdown in <code>content/</code> and show up in the feed.
      </p>
      <WriteForm />
    </article>
  );
}
