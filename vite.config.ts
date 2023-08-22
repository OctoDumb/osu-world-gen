import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), paths()],
  server: {
    proxy: {
      '^/map/.*': {
        target: 'http://localhost:7890',
        changeOrigin: true,
      },
    },
  },
})
