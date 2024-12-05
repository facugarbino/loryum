"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/utils/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/user-context";

export default function Profile() {
  const user = useUser()!;

  const handleSignOut = async () => {
    signOut();
  };

  const getUserInitials = (): string => {
    const name = user.user_metadata.full_name;
    if (name) {
      const names: string[] = name.split(" ");
      return names
        .map((n) => n[0])
        .join("")
        .substring(0, 3);
    }
    return user.user_metadata.user_name[0];
  };

  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user.user_metadata.avatar_url}
            alt="Your GitHub avatar"
          />
          <AvatarFallback>{getUserInitials()}</AvatarFallback>
        </Avatar>
        {user.user_metadata.user_name}
      </div>
      <button title="Sign out">
        <LogOut onClick={handleSignOut} />
      </button>
    </div>
  );
}
