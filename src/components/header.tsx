import Link from "next/link";
import Image from "next/image";
import AuthButton from "./auth-button";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <Link href={"/"}>
          <div className="flex gap-5 items-center font-semibold">
            <Image src={"/logo.png"} alt="Loryum logo" width={30} height={30} />
            Loryum
          </div>
        </Link>
        <AuthButton user={user} />
      </div>
    </nav>
  );
}
