import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

if (supabaseUrl === "https://placeholder-project.supabase.co") {
  console.warn("Using placeholder Supabase URL. Please define NEXT_PUBLIC_SUPABASE_URL in your environment.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
