import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Build config for the parent site, build-your-city.org. It is a separate
 * single-page app under sites/build-your-city/ that reuses the components
 * in src/. Run with `npm run dev:byc` / `npm run build:byc`; the build lands
 * in dist-byc/ so Netlify can deploy it as its own site.
 */
export default defineConfig({
	root: fileURLToPath(new URL("./sites/build-your-city", import.meta.url)),
	plugins: [viteReact(), tailwindcss()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		outDir: fileURLToPath(new URL("./dist-byc", import.meta.url)),
		emptyOutDir: true,
	},
});
