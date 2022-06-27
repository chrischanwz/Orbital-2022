import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bpzhczzxtaplbwfdrhex.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwemhjenp4dGFwbGJ3ZmRyaGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ4NjczMTQsImV4cCI6MTk3MDQ0MzMxNH0.d27t7-ZEqU7HfY_TLBDYx18NQmKqcgknY3hNotWPFFY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
