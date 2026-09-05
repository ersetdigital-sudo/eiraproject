import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // During build/prerender, return a dummy that won't crash
    return null as any;
  }

  client = createClient(url, key);
  return client;
}

// Lazy proxy — only calls getSupabase() when actually used at runtime
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabase();
    if (!client) throw new Error("Supabase not configured — check env vars");
    return (client as any)[prop];
  },
});
