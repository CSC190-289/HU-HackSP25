// / <reference types="vitest"/>
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "src/__tests__/setup.ts",
  //   browser: {
  //     enabled: true,
  //     provider: "playwright",
  //     instances: [{ browser: "chromium" }],
  //   },
  // },
})
