import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import path from "path";

const config: UserConfig = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@store": path.resolve(__dirname, "./src/stores/store.ts"),
      "@src": path.resolve(__dirname, "./src/"),
    },
  },
  server: {
    port: 8000,
  },
};

export default config;
