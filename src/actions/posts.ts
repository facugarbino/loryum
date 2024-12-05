"use server";

import { mockPost } from "@/mocks";
import { ApiPage } from "@/models/api-page";
import { Post } from "@/models/post";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";

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
