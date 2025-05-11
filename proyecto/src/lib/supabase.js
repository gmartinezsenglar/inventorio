import { createClient } from "@supabase/supabase-js";

// Crear un cliente de Supabase para el lado del cliente
const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Patrón singleton para evitar múltiples instancias
let supabaseInstance = null;

export const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

// Cliente para uso en el servidor (para operaciones que requieren más privilegios)
export const getServerSupabase = () => {
  const supabaseUrl =
    process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey =
    process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient(supabaseUrl, supabaseServiceKey);
};
