"use client";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext<User | null>(null);

interface Props {
  children: React.ReactNode;
  user: User | null;
}

export const UserProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(props.user);

  useEffect(() => {
    const supabase = createClient();
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    loadUser();
    // Reload user on sign-in, sign-out, token-refreshed, etc.
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      loadUser();
    }).data.subscription;

    return () => {
      // Unsubscribe on unmount
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
