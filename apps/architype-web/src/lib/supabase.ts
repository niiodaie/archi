import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { HAS_SUPABASE } from "@/src/config/features";

export function supabaseServer():
  SupabaseClient | null {
  if (!HAS_SUPABASE) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const store = cookies();
  return createServerClient(url, key, {
    cookies: {
      get: (n) => store.get(n)?.value,
      set: (n, v, o: CookieOptions) => store.set({ name: n, value: v, ...o }),
      remove: (n, o: CookieOptions) => store.set({ name: n, value: "", ...o }),
    },
  });
}
