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

  const c = cookies();
  return createServerClient(url, key, {
    cookies: {
      get: (n) => c.get(n)?.value,
      set: (n, v, o: CookieOptions) => c.set({ name: n, value: v, ...o }),
      remove: (n, o: CookieOptions) => c.set({ name: "", value: "", ...o })
    }
  });
}
