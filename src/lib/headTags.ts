/**
 * Static head tags for a site: description, Open Graph and Twitter cards,
 * favicons, and the web manifest. Each site's vite.config.ts injects these
 * into index.html at build time, so social crawlers (which don't run
 * JavaScript) see them. Per-page titles and descriptions are set by each
 * route's `head()` and rendered by TanStack's HeadContent.
 */

export type SiteMeta = {
	/** Site name, used as the default title and og:site_name. */
	name: string;
	/** Canonical origin with no trailing slash, e.g. "https://buildcolumbus.org". */
	url: string;
	/** Default description for the site. */
	description: string;
	/** Path to the 1200x630 preview image inside public/, e.g. "/og.png". */
	ogImage: string;
	/** Browser UI color, e.g. "#141A2A". */
	themeColor: string;
};

/** A Vite HtmlTagDescriptor, declared here so this file has no Vite import. */
export type HeadTag = {
	tag: string;
	attrs: Record<string, string>;
	injectTo: "head";
};

const meta = (attrs: Record<string, string>): HeadTag => ({
	tag: "meta",
	attrs,
	injectTo: "head",
});
const link = (attrs: Record<string, string>): HeadTag => ({
	tag: "link",
	attrs,
	injectTo: "head",
});

type Options = {
	/**
	 * Include a static <meta name="description">. A site whose routes set
	 * their own description through HeadContent passes false so the page
	 * ends up with exactly one description tag.
	 */
	description?: boolean;
};

export function headTags(
	site: SiteMeta,
	{ description = true }: Options = {},
): HeadTag[] {
	const image = `${site.url}${site.ogImage}`;
	const url = `${site.url}/`;
	return [
		...(description
			? [meta({ name: "description", content: site.description })]
			: []),
		meta({ name: "theme-color", content: site.themeColor }),

		meta({ property: "og:type", content: "website" }),
		meta({ property: "og:site_name", content: site.name }),
		meta({ property: "og:title", content: site.name }),
		meta({ property: "og:description", content: site.description }),
		meta({ property: "og:url", content: url }),
		meta({ property: "og:image", content: image }),
		meta({ property: "og:image:width", content: "1200" }),
		meta({ property: "og:image:height", content: "630" }),

		meta({ name: "twitter:card", content: "summary_large_image" }),
		meta({ name: "twitter:title", content: site.name }),
		meta({ name: "twitter:description", content: site.description }),
		meta({ name: "twitter:image", content: image }),

		link({ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }),
		link({
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			href: "/favicon-32.png",
		}),
		link({ rel: "apple-touch-icon", href: "/favicon-180.png" }),
		link({ rel: "manifest", href: "/manifest.json" }),
	];
}
