import "server-only";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const HAS_SUPABASE = process.env.FEATURE_SUPABASE === "true";

export function supabaseServer(): SupabaseClient | null {
  if (!HAS_SUPABASE) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const store = cookies();
  return createServerClient(url, key, {
    cookies: {
      get(name: string) { return store.get(name)?.value; },
      set(name: string, value: string, options: CookieOptions) {
        store.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        store.set({ name: "", value: "", ...options });
      },
    },
  });
}
