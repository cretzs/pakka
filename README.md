# Pakkā

Notes on AI, risk, governance and human judgment. Drop Markdown files in `content/`.

## Write

Add a `.md` file in `content/`:

```md
---
title: Your title
date: "2026-08-13"
---

Your post. Markdown works.
```

The filename becomes the URL (`content/my-post.md` → `/essays/my-post`).

To keep an essay unpublished while you work on it, add `published: false` to its front matter. You can commit and push that file. It will not appear on the site. Remove that line to publish it.

## Run

```bash
npm install
npm run dev
```
