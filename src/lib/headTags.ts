/**
 * Head tags for a site, in two parts:
 *
 * - Site-wide tags (theme color, share image, icons, manifest) that are the
 *   same on every page: `headTags()`, injected into index.html by each
 *   site's vite.config.ts.
 * - Page tags (title, description, canonical link, and the share title,
 *   description, and URL) that differ per page: built from a `PageMeta`.
 *   `pageMetaHtml()` writes them into each page's static HTML at build time
 *   so social crawlers, which don't run JavaScript, see the right card for
 *   every page. `pageHead()` returns the same tags for a TanStack route's
 *   `head()`, so they stay right while someone navigates in the browser.
 */

export type SiteMeta = {
	/** Site name, used as the home page title and og:site_name. */
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

/** One page's title, description, and path, e.g. "/meetup". */
export type PageMeta = {
	path: string;
	/** "Page | Site" for inner pages; the site name alone for the home page. */
	title: string;
	description: string;
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

/** Tags that are the same on every page of a site. */
export function headTags(site: SiteMeta): HeadTag[] {
	const image = `${site.url}${site.ogImage}`;
	return [
		meta({ name: "theme-color", content: site.themeColor }),

		meta({ property: "og:type", content: "website" }),
		meta({ property: "og:site_name", content: site.name }),
		meta({ property: "og:image", content: image }),
		meta({ property: "og:image:width", content: "1200" }),
		meta({ property: "og:image:height", content: "630" }),

		meta({ name: "twitter:card", content: "summary_large_image" }),
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

/** The page's full URL, e.g. "https://buildcolumbus.org/meetup". */
const pageUrl = (site: SiteMeta, page: PageMeta) => `${site.url}${page.path}`;

/** Name/content and property/content pairs for one page. */
function pageMetaTags(site: SiteMeta, page: PageMeta) {
	return [
		{ name: "description", content: page.description },
		{ property: "og:title", content: page.title },
		{ property: "og:description", content: page.description },
		{ property: "og:url", content: pageUrl(site, page) },
		{ name: "twitter:title", content: page.title },
		{ name: "twitter:description", content: page.description },
	];
}

/** A route's head() for one page: title, meta tags, and canonical link. */
export function pageHead(site: SiteMeta, page: PageMeta) {
	return {
		meta: [{ title: page.title }, ...pageMetaTags(site, page)],
		links: [{ rel: "canonical", href: pageUrl(site, page) }],
	};
}

/** Marks the block pageMetaHtml() writes, so a build step can swap it. */
export const PAGE_META_START = "<!-- page-meta -->";
export const PAGE_META_END = "<!-- /page-meta -->";

const escapeHtml = (s: string) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

/**
 * The page tags as static HTML, between PAGE_META_START and PAGE_META_END.
 * Each tag carries `data-page-meta` so a site that also renders them with
 * HeadContent can remove the static copies on startup and avoid duplicates.
 */
export function pageMetaHtml(site: SiteMeta, page: PageMeta): string {
	const attrs = (o: { [key: string]: string | undefined }) =>
		Object.entries(o)
			.filter((e): e is [string, string] => e[1] !== undefined)
			.map(([k, v]) => `${k}="${escapeHtml(v)}"`)
			.join(" ");
	const lines = [
		`<title data-page-meta>${escapeHtml(page.title)}</title>`,
		...pageMetaTags(site, page).map((t) => `<meta ${attrs(t)} data-page-meta>`),
		`<link rel="canonical" href="${escapeHtml(pageUrl(site, page))}" data-page-meta>`,
	];
	return [PAGE_META_START, ...lines, PAGE_META_END]
		.map((l) => `    ${l}`)
		.join("\n");
}

/** Swaps the page-meta block in a built HTML file for another page's. */
export function withPageMeta(
	html: string,
	site: SiteMeta,
	page: PageMeta,
): string {
	const start = html.indexOf(PAGE_META_START);
	const end = html.indexOf(PAGE_META_END);
	if (start === -1 || end === -1) {
		throw new Error("withPageMeta: no page-meta block in the HTML");
	}
	const lineStart = html.lastIndexOf("\n", start) + 1;
	return (
		html.slice(0, lineStart) +
		pageMetaHtml(site, page) +
		html.slice(end + PAGE_META_END.length)
	);
}
