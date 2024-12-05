import PostList from "@/components/posts/post-list";
import { getPosts } from "@/actions/posts";

export default async function Index() {
  const posts = await getPosts(1);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Home</h2>
        <PostList firstPage={posts} />
      </main>
    </>
  );
}
