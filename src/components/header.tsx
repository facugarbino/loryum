import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOutAction}>
        <button>
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <button>
        Sign in with GitHub
      </button>
    </div>
  );
}
