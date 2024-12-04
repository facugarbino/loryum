"use client";
import { createClient } from "@/utils/supabase/client";
import { Subscription, User } from "@supabase/supabase-js";
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext<User | null>(null);

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription>();

  useEffect(() => {
    const supabase = createClient();
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    // Reload user on sign-in, sign-out, token-refreshed, etc.
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      loadUser();
    }).data.subscription;

    return () => {
      // Unsubscribe on unmount
      subscription?.unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
