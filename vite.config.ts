import path from "node:path"
import react from "@vitejs/plugin-react"
import UnoCSS from "unocss/vite"
import vike from "vike/plugin"
import { defineConfig } from "vite"

import "dotenv/config"

export default defineConfig({
  base: "/statetrain/",
  plugins: [
    UnoCSS(),
    react(),
    vike({
      // https://vike.dev/prerender
      prerender: true,
      trailingSlash: true,
    }),
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime", "react", "react-dom"],
  },
  server: {
    port: 5247,
  },
  preview: {
    port: 4248,
  },
  ssr: {
    noExternal: ["tailwind-styled-components"],
  },
  resolve: {
    alias: {
      "#tone": path.resolve(__dirname, "./tone/"),
      "#pages": path.resolve(__dirname, "./pages/"),
      "#components": path.resolve(__dirname, "./components/"),
      "#lib": path.resolve(__dirname, "./lib/"),
      "#src": path.resolve(__dirname, "./src/"),
      "#root": __dirname,
      $public: path.resolve(__dirname, "./public"),
    },
  },
})
