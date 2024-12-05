"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export const getLoggedUser = async (): Promise<User | null> => {
  const supabase = await createClient();

  return (await supabase.auth.getUser()).data.user;
};

// Stores user preferred theme in the database
export const updateTheme = async (theme: string) => {
  const supabase = await createClient();

  await supabase.auth.updateUser({
    data: {
      theme: theme,
    },
  });
};
