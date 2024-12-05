"use server";

import { mockPost } from "@/mocks";
import { ApiPage } from "@/models/api-page";
import { Post } from "@/models/post";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";

// Gets the posts from the database, if a token is provided it will paginate consider the post shown as first,
// in case a new post is published while the user is scrolling.
export const getPosts = async (
  page: number,
  token?: string
): Promise<ApiPage<Post>> => {
  const supabase = await createClient();

  return {
    data: [mockPost],
    page: 1,
    count: 10,
    token: randomUUID(),
  };
};

export const getPost = async (id: string): Promise<Post> => {
  const supabase = await createClient();

  return { ...mockPost, id: id };
};

export const getCommentsForPost = async (
  postId: string,
  token?: string
): Promise<ApiPage<Post>> => {
  const supabase = await createClient();

  return {
    data: [mockPost],
    page: 1,
    count: 5,
    token: randomUUID(),
  };
};
