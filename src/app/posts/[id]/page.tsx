import { getComments, getPost, getPosts } from "@/actions/posts";
import PostComponent from "@/components/posts/post-component";
import PostCreator from "@/components/posts/post-creator";
import PostList from "@/components/posts/post-list";
import { Spinner } from "@/components/ui/spinner";

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
    <div className="space-y-2">
      <PostComponent post={post} fullPage={true} />
      <PostCreator placeholder={"Add your comment..."} postId={id} />
      <PostList postId={id} firstPage={comments} noPostMessage="No comments" />
    </div>
  );
}
