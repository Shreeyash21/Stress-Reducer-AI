"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import type { User } from "@/types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAppStore();

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If env vars are missing or still placeholders, skip Supabase init
    if (
      !supabaseUrl ||
      !supabaseKey ||
      supabaseUrl === "your_supabase_project_url" ||
      supabaseKey === "your_supabase_anon_key" ||
      !supabaseUrl.startsWith("http")
    ) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user as unknown as User);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user as unknown as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
