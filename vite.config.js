import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        fileName: "manifest.json",
        name: "Dimengerti",
        short_name: "Dimengerti",
        description: "Dimengerti PWA",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icons/logo.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        // Use the 'generateSW' strategy to cache all assets during the build process
        swDest: "dist/sw.js", // Output path for the generated service worker
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,json,webp,webm}"],
      },
    }),
  ],
});
