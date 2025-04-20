import { dirname, resolve } from "node:path";
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  worker: {
    format: "es"
  },
  optimizeDeps: {
    exclude: ["medfetch", "@sqlite.org/sqlite-wasm"]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        fiddle: resolve(__dirname, "fiddle.html")
      },
      external: ["medfetch", "@sqlite.org/sqlite-wasm"]
    }
  }
});
