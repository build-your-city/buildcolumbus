import type { SiteMeta } from "@/lib/headTags";

/**
 * Site-level metadata: the title, description, canonical URL, social
 * preview image, and theme color. Plain data with no image imports so the
 * Vite config can import it at build time to stamp tags into index.html.
 */
export const site: SiteMeta = {
	name: "Build Columbus",
	url: "https://buildcolumbus.org",
	description:
		"A community of builders in Columbus using their skills to help local nonprofits. Developers, designers, content creators, and more. All are welcome.",
	ogImage: "/og-columbus.png",
	themeColor: "#141A2A",
};
