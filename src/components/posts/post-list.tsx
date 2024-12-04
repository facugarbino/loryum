"use client";
import { useEffect, useState } from "react";
import { Post } from "@/models/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiPage } from "@/models/api-page";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page: number) => {
    fetch(`/api/posts?page=${page}`)
      .then((r) => r.json())
      .then((r: ApiPage<Post>) => {
        const newPosts = r.data;

        if (posts.length === 0) {
          setHasMore(false);
        }

        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      });
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
          <div key={post.id}>
            <h3>{post.text}</h3>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
