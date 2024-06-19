import { createClient } from "@supabase/supabase-js";

import "./config.js";

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);
console.log("App is connected to Supabase");

export default supabase;
