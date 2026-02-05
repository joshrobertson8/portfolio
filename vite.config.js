import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "/portfolio/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        about: resolve(rootDir, "about.html"),
        experience: resolve(rootDir, "experience.html"),
        projects: resolve(rootDir, "projects.html"),
        contact: resolve(rootDir, "contact.html"),
      },
    },
  },
});
