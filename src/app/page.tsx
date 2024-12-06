import PostList from "@/components/posts/post-list";
import { getPosts } from "@/actions/posts";
import PostCreator from "@/components/posts/post-creator";
import { getLoggedUser } from "@/actions/user";

export default async function Index() {
  const posts = await getPosts(1);
  const user = await getLoggedUser();

  return (
    <>
      <main className="w-full flex-1 flex flex-col gap-6 px-4 items-center">
        {user ? (
          <PostCreator placeholder={"Post your thoughts..."} />
        ) : (
          <p>Log in to post</p>
        )}
        <PostList firstPage={posts} noPostMessage={"Be the first to post"} />
      </main>
    </>
  );
}
