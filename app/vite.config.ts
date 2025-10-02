import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
import path from "path";
import dotenv from "dotenv";
import { visualizer } from "rollup-plugin-visualizer";

const env = process.env.NODE_ENV;
console.log("🚀 ~ env:", env);

const envPath = `./.env${
  process.env.NODE_ENV !== "production" ? ".staging" : ""
}`;
dotenv.config({ path: envPath });

// Prepare an object for DefinePlugin with all env variables (same as rspack)
const envVariables = Object.keys(process.env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
  return acc;
}, {} as Record<string, string>);

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    react(),
    tailwindcss(),
    svgLoader(),
    // Add bundle analyzer in analyze mode
    mode === "analyze" &&
      visualizer({
        filename: "dist/bundle-analysis.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  assetsInclude: ["**/*.lottie"],
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
  build: {
    // Increase chunk size warning limit (optional - helps reduce noise)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunks to split large dependencies
        manualChunks: {
          // React ecosystem
          "react-vendor": ["react", "react-dom"],
          "react-pdf": ["@react-pdf/renderer"],

          // Vue ecosystem
          "vue-vendor": ["vue", "vue-router", "pinia"],
          primevue: ["primevue", "@primevue/themes"],

          // Utilities and other libraries
          utils: ["axios"],
          "ui-components": ["vue3-toastify", "vue3-google-login"],
        },
      },
    },
  },
}));
