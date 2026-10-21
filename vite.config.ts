import react from "@vitejs/plugin-react";
// @ts-expect-error - vite-plugin-eslint has incomplete type definitions
import eslint from "vite-plugin-eslint";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite";

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/",
  plugins: [react(), eslint(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Regrouper React et ses dépendances
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Si vous avez des libs lourdes, les isoler
          // 'charts': ['recharts', 'd3'],
          'ui': ['lucide-react', 'mui/material', '@mui/joy', '@mui/icons-material'],
        },
      },
    },
      // Optimisations générales
    chunkSizeWarningLimit: 1000, // Warn si chunk > 1MB
    sourcemap: false, // Désactiver en prod pour gagner du poids
    
    // Minification
    minify: 'terser',
  },
  server: {
    port: 8080,
    strictPort: false,
    host: "0.0.0.0",
    hmr: {
      host: "localhost",
      port: 8080,
      protocol: "http",
    },
  },
  test: {
  projects: [
    {
      extends: true,
      test: {
        name: "unit",
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
        include: ["src/**/*.{test,spec}.{ts,tsx}"],
        exclude: ["src/**/*.stories.{ts,tsx}"],
      },
    },
    {
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, ".storybook"),
        }),
      ],
      test: {
        name: "storybook",
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(),
          instances: [{ browser: "chromium" }],
        },
      },
    },
  ],
},
});
