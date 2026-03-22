import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  base: "./",
  css: {
    devSourcemap: true, //aktiverar sourcemap
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        om: resolve(__dirname, "om.html"),
        bonus: resolve(__dirname, "bonus.html"),
      },
    },
  },
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
      jpeg: {
        quality: 75,
      },
      webp: {
        quality: 70,
      },
      avif: {
        quality: 60,
      },
    }),
  ],
});
