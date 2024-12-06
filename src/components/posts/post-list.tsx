"use client";
import { useEffect, useState } from "react";
import { Post } from "@/models/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiPage } from "@/models/api-page";
import { getPosts } from "@/actions/posts";
import PostComponent from "./post-component";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

export default function PostList({
  firstPage,
  noPostMessage,
}: {
  firstPage: ApiPage<Post>;
  noPostMessage: string;
}) {
  const [posts, setPosts] = useState<Post[]>(firstPage.data);
  const [hasMore, setHasMore] = useState<boolean>(firstPage.data.length < 10);
  const [page, setPage] = useState<number>(1);
  const [until, setUntil] = useState<number>(firstPage.until);
  const [showNoMore, setShowNoMore] = useState<boolean>(false);

  useEffect(() => {
    //Page 1 is given from the props, only fetch from 2 in advance
    if (page > 1) {
      getPosts(page, until).then(processPage);
    }
  }, [page]);

  const processPage = (apiPage: ApiPage<Post>) => {
    const newPosts = apiPage.data;

    if (newPosts.length === 0) {
      setTimeout(() => {
        setHasMore(false);
        setShowNoMore(true);
      }, 500);
    }

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setUntil(apiPage.until);
  };

  return (
    <div className="flex justify-center w-full max-w-3xl m-auto">
      {posts.length === 0 ? (
        <p>{noPostMessage}</p>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={
            <div className="flex flex-col items-center p-4">
              <Spinner />
            </div>
          }
        >
          {posts.map((post) => (
            <Link key={post.id} href={`posts/${post.id}`}>
              <PostComponent post={post} />
            </Link>
          ))}
          {showNoMore && (
            <div className="flex flex-col items-center p-4">
              You've reached to the end.
            </div>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}
