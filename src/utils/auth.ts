"use client";

import { createClient } from "./supabase/client";

const supabase = createClient();

export const signInWithGithub = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
