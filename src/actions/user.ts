"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export const getLoggedUser = async (): Promise<User | null> => {
  const supabase = await createClient();

  return (await supabase.auth.getUser()).data.user;
};

export const getUserById = async (
  id: string
): Promise<{ name: string } | null> => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("users")
    .select("name:full_name")
    .eq("id", id)
    .single();

  return data;
};
