import { getComments, getPost, getPosts } from "@/actions/posts";
import PostComponent from "@/components/posts/post-component";
import PostCreator from "@/components/posts/post-creator";
import PostList from "@/components/posts/post-list";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, StepBack } from "lucide-react";
import Link from "next/link";

export default async function PostView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  const comments = await getComments(id, 1);

  if (post === null) {
    return <p>Error 404</p>;
  }

  return !post ? (
    <Spinner />
  ) : (
    <main className="space-y-4">
      <Link className="flex gap-2" href={"/"}>
        <ArrowLeft /> Back
      </Link>
      <PostComponent post={post} fullPage={true} />
      <div className="w-full flex-1 flex flex-col gap-6 px-4 items-center">
        <PostCreator placeholder={"Add your comment..."} postId={id} />
        <PostList
          postId={id}
          firstPage={comments}
          noPostMessage="No comments"
        />
      </div>
    </main>
  );
}
