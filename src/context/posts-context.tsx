"use client";
import { Post } from "@/models/post";
import React, { createContext, useState, useContext, useEffect } from "react";

const PostsContext = createContext<{
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}>({ posts: [], setPosts: () => {} });

interface Props {
  children: React.ReactNode;

  posts: Post[];
}

export const PostsProvider = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>(props.posts);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {props.children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};
