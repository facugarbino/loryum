"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signInWithGithub } from "@/utils/auth";
import { Github, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

export default function SignInButton() {
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

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleSignIn} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : <Github />}
        Sign in with GitHub
      </Button>
    </div>
  );
}
