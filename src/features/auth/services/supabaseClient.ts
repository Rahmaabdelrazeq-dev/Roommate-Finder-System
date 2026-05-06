import { createClient } from '@supabase/supabase-js';

// Accessing environment variables via Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safety check to ensure variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Environment variables are missing! Check your .env file location.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);