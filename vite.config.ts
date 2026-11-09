import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { spawnSync } from "node:child_process";

// Plugin Vite : exécute scripts/fetch-bachtrack.mjs avant chaque build / dev
function fetchExternalDataPlugin() {
  let ran = false;
  const run = () => {
    if (ran) return;
    ran = true;
    for (const script of [
      "scripts/export-site-data.mjs",
      "scripts/fetch-bachtrack.mjs",
      "scripts/fetch-substack.mjs",
    ]) {
      const res = spawnSync("node", [script], { stdio: "inherit" });
      if (res.status !== 0) {
        console.warn(`[vite] ${script} terminé avec code`, res.status);
      }
    }
  };
  return {
    name: "fetch-external-data",
    buildStart() {
      run();
    },
    configureServer() {
      run();
    },
  };
}

// https://vitejs.dev/config/
// BASE_PATH : "/" sur double-diese.fr, "/double-diese-site/" sur l'adresse provisoire GitHub Pages
export default defineConfig(() => ({
  base: process.env.BASE_PATH || "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    fetchExternalDataPlugin(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
