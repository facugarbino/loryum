import PostList from "@/components/posts/post-list";
import { getPosts } from "@/actions/posts";
import { Suspense } from "react";

export default async function Index() {
  const posts = await getPosts(1);

  return (
    <>
      <main className="w-full flex-1 flex flex-col gap-6 px-4">
        <PostList firstPage={posts} />
      </main>
    </>
  );
}
