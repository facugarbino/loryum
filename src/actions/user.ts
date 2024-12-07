"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export const getLoggedUser = async (): Promise<User | null> => {
  const supabase = await createClient();

  return (await supabase.auth.getUser()).data.user;
};

export const getUserById = async (
  id: string
): Promise<{ name: string; postsAmount: number } | null> => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("users")
    .select("name:full_name, posts(count)")
    .eq("id", id)
    .single();

  const { count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", id)
    .is("parent_id", null);

  return { name: data?.name, postsAmount: count || 0 };
};
