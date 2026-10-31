import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { headTags } from "../../src/lib/headTags";
import { site } from "./site";

/**
 * Build config for the parent site, build-your-city.org. A single-page app
 * in this folder that imports the shared library from the repo's src/ via
 * the "@" alias. Run with `npm run dev:byc` / `npm run build:byc`; the
 * build lands in dist/build-your-city/.
 */
const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
	root: here("."),
	plugins: [
		viteReact(),
		tailwindcss(),
		{
			// Stamp the site's description, social preview, and icon tags into
			// index.html so crawlers that don't run JavaScript still see them.
			name: "site-head-tags",
			transformIndexHtml: () => headTags(site),
		},
	],
	resolve: {
		alias: {
			"@": here("../../src"),
		},
	},
	build: {
		outDir: here("../../dist/build-your-city"),
		emptyOutDir: true,
	},
});
