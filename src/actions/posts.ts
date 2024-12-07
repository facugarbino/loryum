"use server";

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

export const getPosts = async (
  page: number,
  until?: number
): Promise<ApiPage<Post>> => {
  return getPostsFromSupabase(page, until);
};

export const getPostsByUser = async (
  page: number,
  userId: string,
  until?: number
): Promise<ApiPage<Post>> => {
  return getPostsFromSupabase(page, until, null, userId);
};

export const getComments = async (
  postId: string,
  page: number,
  until?: number
): Promise<ApiPage<Post>> => {
  return getPostsFromSupabase(page, until, postId);
};

// Gets the posts from the database, until the date that has been provided
// in case a new post is published while the user is scrolling.
// If parentId is provided, it return the comments related to the main post
const getPostsFromSupabase = async (
  page: number,
  until?: number,
  parentId: string | null = null,
  userId: string | null = null
): Promise<ApiPage<Post>> => {
  const supabase = await createClient();

  if (!until) {
    until = Date.now();
  }
  const { from, to } = calculateRange(page);

  const query = supabase
    .from("posts")
    .select(POST_PROJECTION)
    .lte("created_at", new Date(until).toISOString())
    .order("created_at", { ascending: false })
    .range(from, to);

  if (parentId === null) {
    query.is("parent_id", parentId);
  } else {
    query.eq("parent_id", parentId);
  }
  if (userId !== null) {
    query.eq("user_id", userId);
  }

  const { data: posts, error } = await query;

  if (error) {
    console.error(error);
  }

  return {
    //@ts-ignore
    data: posts?.map((p) => ({
      ...p,
      //@ts-ignore
      comments: p.comments[0].count,
    })),
    until: until,
  };
};

export const getPost = async (id: string): Promise<Post | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(POST_PROJECTION)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  if (data == null) {
    return null;
  }

  //@ts-ignore
  return { ...data, comments: data.comments[0].count };
};

export const submitPost = async (
  content: string,
  images: File[],
  postId?: string
) => {
  content = content.trim();
  if (!content) {
    return;
  }

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
          if (error) {
            console.error(error);
          }

          return data?.path;
        })
      )
    ).filter((path) => path !== undefined);
  }

  let { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: user?.id,
      content: content,
      parent_id: postId || null,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  const post_images_response = await supabase.from("post_images").insert(
    imagesUrls.map((url) => ({
      post_id: data.id,
      image_url: url,
    }))
  );

  error = post_images_response.error;

  if (error) {
    console.error(error);
  }
};
