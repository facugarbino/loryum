import PostList from "@/components/posts/post-list";
import { getPostsByUser } from "@/actions/posts";
import PostCreator from "@/components/posts/post-creator";
import { getLoggedUser, getUserById } from "@/actions/user";
import { redirect } from "next/navigation";
import { PostsProvider } from "@/context/posts-context";

export default async function UserProfile({
  params,
}: {
  params?: Promise<{ id?: string }>;
}) {
  let name = "";
  let user;
  let self = !params;
  let id;
  if (params) {
    id = (await params).id;
    if (id) {
      user = await getUserById(id);
      name = user?.name || "";
    }
  } else {
    const loggedUser = await getLoggedUser();
    if (loggedUser != null) {
      user = await getUserById(loggedUser.id);
      id = loggedUser.id;
    }
  }

  if (!id) {
    redirect("/");
  }

  if (!user) {
    return <p>Error 404</p>;
  }

  const posts = await getPostsByUser(1, id);

  return (
    <PostsProvider posts={posts.data}>
      <main className="w-full flex-1 flex flex-col gap-6 px-4 items-center">
        {self ? (
          <PostCreator placeholder="Post your thoughts..." />
        ) : (
          <div>Posts from {name}</div>
        )}
        <PostList userId={id} firstPage={posts} noPostMessage="No posts" />
      </main>
    </PostsProvider>
  );
}
