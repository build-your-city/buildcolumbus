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
		"A community of builders in Columbus using their skills to help local nonprofits. Developers, designers, content creators, and more. All are welcome.",
	ogImage: "/og-columbus.png",
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
			"Once a month on a Saturday afternoon, we get together at Improving downtown. Sometimes there's a talk or a workshop. Other times we work on our own projects and share what we're making.",
	},
	serve: {
		path: "/serve",
		title: `Serve | ${site.name}`,
		description:
			"Local nonprofits do important work, often with very little help. Serve is how we pitch in.",
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
			"Build Columbus is a community of builders who use their skills to help local nonprofits. We meet once a month, volunteer with local nonprofits, and hold a hackathon once a year.",
	},
} satisfies Record<string, PageMeta>;
