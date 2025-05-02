import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const { VITE_APP_BASE } = process.env;

export default defineConfig({
  base: VITE_APP_BASE ?? "/",
  plugins: [react()],
  // declare assets
  publicDir: "src/assets",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3004", // Backend server
        changeOrigin: true, // Ensure the request appears to come from the frontend server
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove '/api' prefix
      },
    },
  },
});
