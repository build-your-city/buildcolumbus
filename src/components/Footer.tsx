import { Link } from "@tanstack/react-router";
import { city } from "../config/city";
import Container from "./Container";
import Wordmark from "./Wordmark";

type FooterLink = { label: string; to?: string; href?: string };

const columns: { heading: string; links: FooterLink[] }[] = [
	{
		heading: "Community",
		links: [
			{ label: "Meetup", to: "/meetup" },
			{ label: "Serve", to: "/serve" },
			{ label: "Hack", to: "/hack" },
			{ label: "Donate", href: city.links.donate },
		],
	},
	{
		heading: "Connect",
		links: [
			{ label: "Meetup", href: city.links.meetup },
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

const linkClass =
	"font-sans text-base font-medium text-slate no-underline transition-colors hover:text-paper";

export default function Footer() {
	return (
		<footer className="bg-ink text-paper">
			<Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10 md:py-24">
				<div>
					<Wordmark
						top="Build"
						bottom={city.name}
						tone="paper"
						className="text-[26px]"
					/>
					<p className="mt-5 max-w-xs font-sans text-base font-medium leading-[1.55] text-slate">
						Part of Build Your City. Use your skills. Serve your city.
					</p>
				</div>

				{columns.map((col) => (
					<nav key={col.heading} aria-label={col.heading}>
						<p className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-paper">
							{col.heading}
						</p>
						<ul className="flex flex-col gap-3">
							{col.links.map((link) => (
								<li key={`${col.heading}-${link.label}`}>
									{link.to ? (
										<Link to={link.to} className={linkClass}>
											{link.label}
										</Link>
									) : (
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className={linkClass}
										>
											{link.label}
										</a>
									)}
								</li>
							))}
						</ul>
					</nav>
				))}
			</Container>
		</footer>
	);
}
