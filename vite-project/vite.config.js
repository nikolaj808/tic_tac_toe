import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        room: resolve(__dirname, "room/index.html"),
        about: resolve(__dirname, "about/index.html"),
      },
    },
  },
});
