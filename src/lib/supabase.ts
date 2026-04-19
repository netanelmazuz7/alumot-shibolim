/**
 * קליינט Supabase לגישה מהשרת בלבד.
 * משתמש ב-service_role key שעוקף RLS - לעולם לא להשתמש בקליינט (browser).
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const globalKey = "__alumat_supabase_client__" as const;
declare global {
  // eslint-disable-next-line no-var
  var __alumat_supabase_client__: SupabaseClient | undefined;
}

function build(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function supabase(): SupabaseClient {
  return (globalThis[globalKey] ??= build());
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
