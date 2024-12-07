import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = Cypress.env("SUPABASE_URL") as string;
const supabaseKey = Cypress.env("SUPABASE_KEY") as string;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
  },
});
