"use client";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "./sign-in-button";
import Profile from "./profile";
import { useUser } from "@/context/user-context";
import ThemeSelector from "./theme-selector";

export default function Header() {
  const user = useUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 sticky top-0 bg-[hsl(var(--background))] z-10">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <Link href={"/"}>
          <div className="flex gap-5 items-center font-semibold">
            <Image src={"/logo.png"} alt="Loryum logo" width={30} height={30} />
            Loryum
          </div>
        </Link>
        <div className="flex gap-2">
          {user ? <Profile /> : <SignInButton />}
          <ThemeSelector />
        </div>
      </div>
    </nav>
  );
}
