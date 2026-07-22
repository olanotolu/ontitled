import { defineConfig } from "vitest/config";
import path from "node:path";

process.env.SETTINGS_BACKEND = "json";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
