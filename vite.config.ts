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
    exclude: ["@sqlite.org/sqlite-wasm", "medfetch", "fhirpath", "effect"]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        fiddle: resolve(__dirname, "fiddle/index.html")
      },
      external: ["@sqlite.org/sqlite-wasm", "medfetch", "fhirpath", "effect"]
    }
  }
});
