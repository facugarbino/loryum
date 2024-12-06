"use client";
import * as React from "react";

import { Post } from "@/models/post";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageSquare } from "lucide-react";
import PostImages from "./post-images";
import { calculateRelativeTime } from "@/utils/utils";
import { MaybeLink } from "../MaybeLink";
import Link from "next/link";

export default function PostComponent({
  post,
  fullPage,
  showComments,
  redirectToPost,
}: {
  post: Post;
  fullPage?: boolean;
  showComments?: boolean;
  redirectToPost?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 border p-5">
      <Link
        href={`/profile/${post.user.id}`}
        className="flex items-center space-x-4 max-w-fit"
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.user.avatarUrl} />
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-4">
            <p className="text-base">{post.user.name}</p>
            <p className="text-sm text-foreground/50">
              {calculateRelativeTime(post.date)}
            </p>
          </div>
          <p className="text-sm text-foreground/50">{post.user.username}</p>
        </div>
      </Link>

      {post.content}
      <PostImages images={post.images.map((i) => i.url)} fullPage={fullPage} />
      {showComments && (
        <MaybeLink
          href={`/posts/${post.id}`}
          condition={!!redirectToPost}
          className="flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          <p className="text-xs">{post.comments}</p>
        </MaybeLink>
      )}
    </div>
  );
}
