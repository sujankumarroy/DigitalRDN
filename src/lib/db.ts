import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase keys not found.");
}

let cached = global.supabase;

if (!cached) {
  cached = global.supabase = { client: null };
}

const connectDb = async () => {
  if (cached.client) {
    console.log("cached supabase connected");
    return cached.client;
  }

  try {
    cached.client = createClient(supabaseUrl, supabaseKey);
    console.log("supabase connected");
  } catch (error) {
    throw error;
  }

  return cached.client;
};

export default connectDb;
