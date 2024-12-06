"use client";
import * as React from "react";

import { Post } from "@/models/post";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function PostComponent({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-6 border p-5">
      <div className="flex items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.user.avatarUrl} />
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-4">
            <p className="text-base">{post.user.name}</p>
            <p className="text-sm text-foreground/50">2d</p>
          </div>
          <p className="text-sm text-foreground/50">{post.user.username}</p>
        </div>
      </div>
      {post.content}
    </div>
  );
}
