"use server";

import { mockPost } from "@/mocks";
import { ApiPage } from "@/models/api-page";
import { Post } from "@/models/post";
import { createClient } from "@/utils/supabase/server";

const POST_PROJECTION = `
      id,
      content,
      date:created_at,
      images:post_images(
        url:image_url
      ),
      user:users (
        id,
        name:full_name,
        username,
        avatarUrl:avatar_url
      )
    `;

// Gets the posts from the database, until the date that has been provided
// in case a new post is published while the user is scrolling.
export const getPosts = async (
  page: number,
  until?: number
): Promise<ApiPage<Post>> => {
  const supabase = await createClient();

  if (!until) {
    until = Date.now();
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select(POST_PROJECTION)
    .is("parent_id", null)
    .lte("created_at", new Date(until).toISOString())
    .order("created_at", { ascending: false });

  console.log(posts);
  console.log(error);

  return {
    data: posts as unknown as Post[],
    page: 1,
    until: until,
  };
};

export const getPost = async (id: string): Promise<Post> => {
  const supabase = await createClient();

  return { ...mockPost, id: id };
};

export const getCommentsForPost = async (
  postId: string,
  until?: number
): Promise<ApiPage<Post>> => {
  const supabase = await createClient();

  return {
    data: [mockPost],
    page: 1,
    until: Date.now(),
  };
};
