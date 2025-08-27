import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
import path from "path";
import dotenv from "dotenv";

const env = process.env.NODE_ENV;
console.log("🚀 ~ env:", env);

const envPath = `./.env.${
  process.env.NODE_ENV !== "production" ? "staging" : "production"
}`;
console.log("🚀 ~ envPath:", envPath);
dotenv.config({ path: envPath });

// Prepare an object for DefinePlugin with all env variables (same as rspack)
const envVariables = Object.keys(process.env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
  return acc;
}, {} as Record<string, string>);

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), react(), tailwindcss(), svgLoader()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
    },
  },
  define: {
    // Define all environment variables as process.env (same pattern as rspack)
    ...envVariables,
  },
});
