import { createClient } from "@supabase/supabase-js";

import "./config.js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
console.log("App is connected to Supabase");

export default supabase;
