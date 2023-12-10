import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        fileName: "manifest.json",
        name: "My PWA",
        short_name: "PWA",
        description: "My Progressive Web App",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icons/vite.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        // Use the 'generateSW' strategy to cache all assets during the build process
        swDest: "dist/sw.js", // Output path for the generated service worker
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,json, webp, webm}"],
      },
    }),
  ],
});
