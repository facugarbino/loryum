import PostList from "@/components/posts/post-list";
import { getPostsByUser } from "@/actions/posts";
import PostCreator from "@/components/posts/post-creator";
import { getLoggedUser, getUserById } from "@/actions/user";
import { redirect } from "next/navigation";
import { PostsProvider } from "@/context/posts-context";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function UserProfile({
  params,
}: {
  params?: Promise<{ id?: string }>;
}) {
  let user;
  let id;
  if (params) {
    id = (await params).id;
    if (id) {
      user = await getUserById(id);
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

  const name = user?.name || "";
  const posts = await getPostsByUser(1, id);

  return (
    <PostsProvider posts={posts.data}>
      <main className="w-full flex-1 flex flex-col gap-6 px-4 items-center">
        <div className="gap-2 w-full max-w-3xl">
          <div className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeft />
            </Link>
            <div>{name}</div>
          </div>
          <p className="mx-8 text-sm text-foreground/50">
            {user.postsAmount} posts
          </p>
        </div>
        <PostList userId={id} firstPage={posts} noPostMessage="No posts" />
      </main>
    </PostsProvider>
  );
}
