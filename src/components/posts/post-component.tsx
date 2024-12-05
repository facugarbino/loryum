import { Post } from "@/models/post";

export default function PostComponent({ post }: { post: Post }) {
  return <div>{post.text}</div>;
}
