import type { SiteMeta } from "@/lib/headTags";

/**
 * Site-level metadata for build-your-city.org. Plain data so the Vite
 * config can import it at build time to stamp tags into index.html.
 */
export const site: SiteMeta = {
	name: "Build Your City",
	url: "https://build-your-city.org",
	description:
		"A network of communities where builders use their skills to help local nonprofits.",
	ogImage: "/og-build-your-city.png",
	themeColor: "#141A2A",
};
