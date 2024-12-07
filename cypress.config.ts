import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

// Load variables from .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // Add other plugins or event listeners here if needed
      return config;
    },
  },
});
