import type { PageMeta, SiteMeta } from "@/lib/headTags";

/**
 * Site-level metadata: the title, description, canonical URL, social
 * preview image, and theme color. Plain data with no image imports so the
 * Vite config can import it at build time to stamp tags into index.html.
 */
export const site: SiteMeta = {
	name: "Build Columbus",
	url: "https://buildcolumbus.org",
	description:
		"Builders in Columbus using their skills to help local nonprofits. Developers, designers, content creators, and more. All are welcome.",
	ogImage: "/og-columbus.png?v=2",
	themeColor: "#141A2A",
};

/**
 * Every page on the site, with its title and description. Route head()s,
 * the per-page static HTML that social crawlers read, the Netlify rewrites,
 * and sitemap.xml are all built from this list (see vite.config.ts), so
 * adding a page means adding it here. Inner pages are titled
 * "Page | Build Columbus"; the home page is just "Build Columbus".
 */
export const pages = {
	home: { path: "/", title: site.name, description: site.description },
	meetup: {
		path: "/meetup",
		title: `Meetup | ${site.name}`,
		description:
			"Once a month on a Saturday afternoon, we get together at Improving in Columbus to learn from each other, work on projects, and share what we're building.",
	},
	serve: {
		path: "/serve",
		title: `Serve | ${site.name}`,
		description:
			"Local nonprofits do important work, often with limited resources. Serve is how we pitch in.",
	},
	hack: {
		path: "/hack",
		title: `Hack | ${site.name}`,
		description:
			"Once a year, we spend a day working on real problems in our city. Any skill is welcome. No code required.",
	},
	about: {
		path: "/about",
		title: `About | ${site.name}`,
		description:
			"Builders using their skills to serve Columbus nonprofits since 2024.",
	},
} satisfies Record<string, PageMeta>;
