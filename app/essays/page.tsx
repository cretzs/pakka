import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "essays",
};

export default function EssaysIndex() {
  return (
    <PostList
      posts={getPosts()}
      variant="archive"
      empty={<p className="empty">No essays yet.</p>}
    />
  );
}
