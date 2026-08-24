import { PostList } from "@/components/post-list";
import { HOME_PAGE_SIZE, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getPosts().slice(0, HOME_PAGE_SIZE);

  return (
    <>
      <div className="dek">
        <p className="dek-sub">{site.description}</p>
      </div>

      <PostList posts={posts} empty={<p className="empty">Nothing here yet.</p>} />
    </>
  );
}
