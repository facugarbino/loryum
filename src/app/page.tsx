import PostList from "@/components/posts/post-list";
import { getPosts } from "@/actions/posts";
import PostCreator from "@/components/posts/post-creator";
import { PostsProvider } from "@/context/posts-context";

export default async function Index() {
  const posts = await getPosts(1);

  return (
    <PostsProvider posts={posts.data}>
      <main className="w-full flex-1 flex flex-col gap-6 px-4 items-center">
        <PostCreator placeholder={"Post your thoughts..."} />
        <PostList firstPage={posts} noPostMessage={"Be the first to post"} />
      </main>
    </PostsProvider>
  );
}
