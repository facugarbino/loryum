"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Github, GithubIcon, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

  const getAvatarUrl = (): string => {
    return user?.user_metadata?.avatar_url;
  };

  return user ? (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        {getAvatarUrl() && (
          <img
            src={getAvatarUrl()}
            width={24}
            height={24}
            alt="GitHub Avatar"
            style={{ borderRadius: 50 }}
          />
        )}
        {user?.user_metadata?.user_name}
      </div>
      <button title="Sign out">
        <LogOut onClick={handleSignOut} />
      </button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button onClick={handleSignIn}>
        <Image src={"/github.svg"} width={20} height={20} alt={"GitHub logo"} />
        Sign in with GitHub
      </Button>
    </div>
  );
}
