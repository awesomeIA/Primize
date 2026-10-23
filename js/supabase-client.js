import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

// Configuración pública de tu proyecto Supabase.
const SUPABASE_URL = "https://vbjctoctukyraoqsrjem.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6iCy4hY7bsQBOIz1jHkX-A_3uYTBUXr";

export const isSupabaseConfigured =
  SUPABASE_URL.trim() !== "" &&
  SUPABASE_PUBLISHABLE_KEY.trim() !== "";

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
