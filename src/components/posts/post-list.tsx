"use client";
import { useEffect, useState } from "react";
import { Post } from "@/models/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiPage } from "@/models/api-page";
import { getPosts } from "@/actions/posts";
import PostComponent from "./post-component";

export default function PostList({ firstPage }: { firstPage: ApiPage<Post> }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    processPage(firstPage);
  }, []);

  useEffect(() => {
    //Page 1 is given from the props, only fetch from 2 in advance
    if (page > 1) {
      getPosts(page, token);
    }
  }, [page]);

  const processPage = (apiPage: ApiPage<Post>) => {
    const newPosts = apiPage.data;

    if (posts.length === 0) {
      setHasMore(false);
    }

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setToken(apiPage.token);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
