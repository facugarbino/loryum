"use client";

import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/context/user-context";
import { useState } from "react";
import { signInWithGithub, signOut } from "@/utils/auth";

export default function AuthButton() {
  const user = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await signInWithGithub();

    if (error) {
      console.error(error);
      toast({
        title: "An error occured",
      });
    }
  };

  const handleSignOut = async () => {
    signOut();
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
      <Button onClick={handleSignIn} disabled={loading}>
        <Image src={"/github.svg"} width={20} height={20} alt={"GitHub logo"} />
        Sign in with GitHub
      </Button>
    </div>
  );
}
