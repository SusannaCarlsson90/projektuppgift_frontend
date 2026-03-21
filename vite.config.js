import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  base: "./", //Fick tips om att denna rad säkrar koden och att bilder osv syns
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
