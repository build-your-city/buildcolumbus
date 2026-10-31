import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { headTags } from "../../src/lib/headTags";
import { site } from "./config/site";

/**
 * Build config for buildcolumbus.org. The site lives in this folder and
 * imports the shared library from the repo's src/ via the "@" alias.
 * Run with `npm run dev:columbus` / `npm run build:columbus`; the build
 * lands in dist/columbus/.
 */
const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
	root: here("."),
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: here("./routes"),
			generatedRouteTree: here("./routeTree.gen.ts"),
		}),
		viteReact(),
		tailwindcss(),
		{
			// Stamp the site's social preview and icon tags into index.html so
			// crawlers that don't run JavaScript still see them. The description
			// is left to the routes, which set one per page through HeadContent.
			name: "site-head-tags",
			transformIndexHtml: () => headTags(site, { description: false }),
		},
	],
	resolve: {
		alias: {
			"@": here("../../src"),
		},
	},
	build: {
		outDir: here("../../dist/columbus"),
		emptyOutDir: true,
	},
});
