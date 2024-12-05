"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import Image from "next/image";
import { useUser } from "@/context/user-context";
import { useState } from "react";
import { signInWithGithub } from "@/utils/auth";

export default function SignInButton() {
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

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleSignIn} disabled={loading}>
        <Image src={"/github.svg"} width={20} height={20} alt={"GitHub logo"} />
        Sign in with GitHub
      </Button>
    </div>
  );
}
