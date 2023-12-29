import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname } from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(__dirname, "../.env") });

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
});
