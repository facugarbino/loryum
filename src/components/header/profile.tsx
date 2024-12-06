"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/utils/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/user-context";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import Link from "next/link";

export default function Profile() {
  const user = useUser()!;

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
      <Menubar className="border-transparent hover:bg-transparent">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.user_metadata.avatar_url}
                  alt="Your GitHub avatar"
                />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              {user.user_metadata.user_name}
            </Button>
          </MenubarTrigger>
          <MenubarContent className="w-full">
            <Link href={"/profile"}>
              <MenubarItem className="cursor-pointer">Profile</MenubarItem>
            </Link>
            <MenubarSeparator />
            <MenubarItem
              onSelect={signOut}
              className="flex gap-2 cursor-pointer"
              style={{ color: "#b23b3b" }}
            >
              <LogOut />
              <Label className="cursor-pointer">Sign Out</Label>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
