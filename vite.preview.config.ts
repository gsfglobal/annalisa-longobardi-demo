// Build dell'anteprima a pagina singola (hash routing) dagli stessi componenti del sito Next.js.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const r = (p: string) => path.resolve(__dirname, p);
export default defineConfig({
  root: r("preview"),
  base: "./",
  publicDir: r("public"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "next/link", replacement: r("preview/shims/link.tsx") },
      { find: "next/image", replacement: r("preview/shims/image.tsx") },
      { find: "next/navigation", replacement: r("preview/shims/navigation.ts") },
      { find: "@", replacement: r(".") },
    ],
  },
  define: { "process.env.NEXT_PUBLIC_BASE": JSON.stringify("."), "process.env.NEXT_PUBLIC_MODEL_EXT": JSON.stringify(".json") },
  css: { postcss: { plugins: [] } },
  build: { outDir: r("preview-dist"), emptyOutDir: true, assetsInlineLimit: 0 },
});
