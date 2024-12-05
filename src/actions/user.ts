"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export const getLoggedUser = async (): Promise<User | null> => {
  const supabase = await createClient();

  return (await supabase.auth.getUser()).data.user;
};
