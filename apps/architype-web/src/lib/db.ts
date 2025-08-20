import type { PostgrestError } from "@supabase/supabase-js";
import { supabaseServer } from "./supabaseServer";

type Row = Record<string, unknown>;
type Q = Promise<{ data: Row[] | null; error: PostgrestError | null }>;

const noop = {
  from: () => ({
    select: (): Q => Promise.resolve({ data: [], error: null }),
    insert: (): Q => Promise.resolve({ data: [], error: null }),
    update: (): Q => Promise.resolve({ data: [], error: null }),
    delete: (): Q => Promise.resolve({ data: [], error: null }),
    order: () => ({ select: (): Q => Promise.resolve({ data: [], error: null }) }),
  }),
};

export function db() {
  return supabaseServer() ?? (noop as any);
}
export const dbEnabled = !!supabaseServer();
import type { PostgrestError } from "@supabase/supabase-js";
import { supabaseServer } from "./supabaseServer";

type Row = Record<string, unknown>;
type Q = Promise<{ data: Row[] | null; error: PostgrestError | null }>;

const noop = {
  from: () => ({
    select: (): Q => Promise.resolve({ data: [], error: null }),
    insert: (): Q => Promise.resolve({ data: [], error: null }),
    update: (): Q => Promise.resolve({ data: [], error: null }),
    delete: (): Q => Promise.resolve({ data: [], error: null }),
    order: () => ({ select: (): Q => Promise.resolve({ data: [], error: null }) }),
  }),
};

export function db() {
  return supabaseServer() ?? (noop as any);
}
export const dbEnabled = !!supabaseServer();
