"use client";

import { useActionState } from "react";
import { createPost } from "./actions";

export function WriteForm() {
  const [state, action, pending] = useActionState(createPost, null);

  return (
    <form action={action} className="write-form">
      <label>
        <span>Title</span>
        <input required name="title" type="text" placeholder="What is this about?" />
      </label>

      <label>
        <span>Category</span>
        <select name="category" defaultValue="tech">
          <option value="tech">Tech</option>
          <option value="regulations">Regulations</option>
        </select>
      </label>

      <label>
        <span>Excerpt</span>
        <input
          name="excerpt"
          type="text"
          placeholder="One sentence, if you want one"
        />
      </label>

      <label>
        <span>Body (Markdown is fine)</span>
        <textarea
          required
          name="content"
          rows={16}
          placeholder={"Start writing.\n\n## A heading\n\nThen a paragraph."}
        />
      </label>

      {state?.error ? <p className="form-error">{state.error}</p> : null}

      <button type="submit" disabled={pending}>
        {pending ? "Publishing…" : "Publish"}
      </button>
    </form>
  );
}
