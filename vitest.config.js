import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: [{ find: /^baystate$/, replacement: "../src/index.ts" }],
  },
  test: {
    name: "baystate",
    // Keeping globals to true triggers React Testing Library's auto cleanup
    // https://vitest.dev/guide/migration.html
    globals: true,
    environment: "jsdom",
    dir: "tests",
    reporters: "basic",
    coverage: {
      reporter: ["text", "json", "html", "text-summary"],
      reportsDirectory: "./coverage/",
    },
  },
});
