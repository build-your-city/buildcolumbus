import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer, { type FooterColumn } from "@/components/Footer";
import Header from "@/components/Header";
import { city } from "../config/city";
import { site } from "../config/site";

export const Route = createRootRoute({
	component: RootLayout,
	// Site-wide defaults; each page overrides title and description in its
	// own head(). HeadContent keeps one tag per name.
	head: () => ({
		meta: [
			{ title: site.name },
			{ name: "description", content: site.description },
		],
	}),
});

const wordmark = { top: "Build", bottom: city.name };

const nav = [
	{ to: "/meetup", label: city.programs.meetup },
	{ to: "/serve", label: city.programs.serve },
	{ to: "/hack", label: city.programs.hack },
	{ to: "/about", label: "About" },
];

const footerColumns: FooterColumn[] = [
	{
		heading: "Community",
		links: [
			{ label: city.programs.meetup, to: "/meetup" },
			{ label: city.programs.serve, to: "/serve" },
			{ label: city.programs.hack, to: "/hack" },
			{ label: "Donate", href: city.links.donate },
		],
	},
	{
		heading: "Connect",
		links: [
			{ label: "Discord", href: city.links.discord },
			{ label: "Instagram", href: city.links.instagram },
			{ label: "LinkedIn", href: city.links.linkedin },
			{ label: "Facebook", href: city.links.facebook },
		],
	},
	{
		heading: "Contact",
		links: [
			{ label: city.email, href: `mailto:${city.email}` },
			{
				label: city.links.parent.replace(/^https?:\/\//, ""),
				href: city.links.parent,
			},
		],
	},
];

function RootLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<HeadContent />
			<Header
				wordmark={wordmark}
				nav={nav}
				cta={{ label: "Join on Meetup.com", href: city.links.meetup }}
			/>
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer
				wordmark={wordmark}
				tagline="Part of Build Your City. Use your skills. Serve your city."
				columns={footerColumns}
			/>
			{import.meta.env.DEV && (
				<TanStackRouterDevtools position="bottom-right" />
			)}
		</div>
	);
}
