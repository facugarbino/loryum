"use server";

import { mockPost } from "@/mocks";
import { ApiPage } from "@/models/api-page";
import { Post } from "@/models/post";
import { createClient } from "@/utils/supabase/server";
import { getLoggedUser } from "./user";
import { randomUUID } from "crypto";

const PAGE_SIZE = 5;

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
      ),
      comments:posts!parent_id(
        count()
      )
    `;

const calculateRange = (page: number) => {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  return { from, to };
};

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
  const { from, to } = calculateRange(page);

  const { data: posts, error } = await supabase
    .from("posts")
    .select(POST_PROJECTION)
    .is("parent_id", null)
    .lte("created_at", new Date(until).toISOString())
    .order("created_at", { ascending: false })
    .range(from, to);

  return {
    data: posts?.map((p) => ({
      ...p,
      comments: p.comments[0].count,
    })) as unknown as Post[],
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
    until: Date.now(),
  };
};

export const submitPost = async (content: string, images: File[]) => {
  const supabase = await createClient();
  const user = await getLoggedUser();

  let imagesUrls: string[] = [];
  if (images) {
    // Upload all images to buckets and return urls
    imagesUrls = (
      await Promise.all(
        images.slice(0, 4).map(async (i) => {
          const { data, error } = await supabase.storage
            .from("post_images")
            .upload(randomUUID() + "." + i.name.split(".").at(-1), i, {
              cacheControl: "3600",
              upsert: false,
            });

          return data?.path;
        })
      )
    ).filter((path) => path !== undefined);
  }

  const { data } = await supabase
    .from("posts")
    .insert({
      user_id: user?.id,
      content: content.trim(),
    })
    .select()
    .single();

  const { error } = await supabase.from("post_images").insert(
    imagesUrls.map((url) => ({
      post_id: data.id,
      image_url: url,
    }))
  );
};
