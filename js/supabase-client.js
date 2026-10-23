
import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

// Reemplazar estos valores con los de tu proyecto Supabase.
const SUPABASE_URL = "https://TU-PROYECTO.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "TU_CLAVE_PUBLICA";

const isConfigured =
  !SUPABASE_URL.includes("TU-PROYECTO") &&
  !SUPABASE_PUBLISHABLE_KEY.includes("TU_CLAVE_PUBLICA");

export const supabase = isConfigured
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const isSupabaseConfigured = isConfigured;
