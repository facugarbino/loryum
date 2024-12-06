"use client";
import { useParams } from "next/navigation";
import { getPost, getPosts } from "@/actions/posts";
import PostComponent from "@/components/posts/post-component";
import { useEffect, useState } from "react";
import { Post } from "@/models/post";
import { Spinner } from "@/components/ui/spinner";
import Error from "next/error";

export default function PostView() {
  const postId = useParams().id as string;
  const [post, setPost] = useState<Post | null>();

  useEffect(() => {
    getPost(postId).then((post) => {
      setPost(post);
    });
  }, []);

  if (post === null) {
    return <Error statusCode={404} />;
  }

  return <>{!post ? <Spinner /> : <PostComponent post={post} />}</>;
}
