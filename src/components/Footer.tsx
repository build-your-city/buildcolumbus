import { Link } from "@tanstack/react-router";
import Container from "./Container";
import Wordmark from "./Wordmark";

export type FooterLink = { label: string; to?: string; href?: string };
export type FooterColumn = { heading: string; links: FooterLink[] };

type FooterProps = {
	wordmark: { top: string; bottom: string };
	tagline: string;
	/** Three link columns shown after the wordmark column. */
	columns: FooterColumn[];
};

const linkClass =
	"font-sans text-base font-medium text-slate no-underline transition-colors hover:text-paper";

/**
 * Site footer: Ink background, wordmark and tagline, then link columns.
 * Links with `to` use the router; links with `href` are external.
 */
export default function Footer({ wordmark, tagline, columns }: FooterProps) {
	return (
		<footer className="border-t border-white/8 bg-ink-deep text-paper">
			<Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10 md:py-24">
				<div>
					<Wordmark
						top={wordmark.top}
						bottom={wordmark.bottom}
						tone="paper"
						className="text-[40px]"
					/>
					<p className="mt-5 max-w-xs font-sans text-base font-medium leading-[1.55] text-slate">
						{tagline}
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
											target={
												link.href?.startsWith("http") ? "_blank" : undefined
											}
											rel={
												link.href?.startsWith("http")
													? "noopener noreferrer"
													: undefined
											}
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
