"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User | null;
}

export default function AuthButton({ user }: Props) {
  const { toast } = useToast();

  const handleSignIn = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      toast({
        title: "An error occured",
      });
    }

    return redirect("/");
  };

  const handleSignOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={handleSignOut}>
        <button>Sign out</button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <button onClick={handleSignIn}>Sign in with GitHub</button>
    </div>
  );
}
