import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, "/");
          const itemChunkMatch = normalizedId.match(/\/src\/content\/items\/items-(\d{4})-(\d{4})\.json$/);
          const portraitPromptMatch = normalizedId.match(/\/docs\/assets\/character-prompts\/characters-(\d{4})-(\d{4})\.json$/);
          const characterBatchMatch = normalizedId.match(/\/src\/content\/characters\/characterIdentityCatalogCastBatch(\d{2})\.ts$/);

          if (normalizedId.includes("/node_modules/react/") || normalizedId.includes("/node_modules/react-dom/")) {
            return "react-vendor";
          }

          if (
            normalizedId.includes("/node_modules/lucide-react/") ||
            normalizedId.includes("/node_modules/react-toastify/")
          ) {
            return "ui-vendor";
          }

          if (itemChunkMatch) {
            return `items-data-${itemChunkMatch[1]}`;
          }

          if (normalizedId.includes("/src/content/characters/characterRuntimeProfiles.data.json")) {
            return "characters-data";
          }

          if (
            normalizedId.includes("/src/content/market/marketplaces.json") ||
            normalizedId.includes("/src/content/market/professions.json") ||
            normalizedId.includes("/src/content/world/kingdoms.json") ||
            normalizedId.includes("/src/content/market/stock/")
          ) {
            return "world-data";
          }

          if (portraitPromptMatch) {
            const start = Number.parseInt(portraitPromptMatch[1], 10);
            const bucket = Math.floor((start - 1) / 120) + 1;
            return `portrait-prompts-${String(bucket).padStart(2, "0")}`;
          }

          if (characterBatchMatch) {
            return `character-identity-${characterBatchMatch[1]}`;
          }

          if (
            normalizedId.includes("/src/game/trade/item-static-description.ts") ||
            normalizedId.includes("/src/content/items/item-written-descriptions")
          ) {
            return "item-description-data";
          }

          if (
            normalizedId.includes("/src/content/quests/") ||
            normalizedId.includes("/src/game/quests/quest-") ||
            normalizedId.includes("/src/game/quests/quests.ts") ||
            normalizedId.includes("/src/game/quests/contracts.ts")
          ) {
            return "quest-data";
          }

          return undefined;
        },
      },
    },
  },
});
