import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "./Container";
import CtaLink from "./CtaLink";
import Wordmark from "./Wordmark";

export type NavItem = { to: string; label: string };

type HeaderProps = {
	/** Two-line wordmark, e.g. { top: "Build", bottom: "Columbus" }. */
	wordmark: { top: string; bottom: string };
	/** Router links shown in the nav, in order. */
	nav: NavItem[];
	/** The Ink button at the end of the nav. */
	cta: { label: string; href: string };
};

const navLink =
	"font-sans text-base font-semibold text-paper no-underline decoration-blue decoration-2 underline-offset-8 transition-colors hover:text-blue [&.active]:underline";

/**
 * Site header for a city site: wordmark, router nav, and one button. On
 * mobile the nav collapses behind a menu button.
 */
export default function Header({ wordmark, nav, cta }: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Close the mobile menu on Escape.
	useEffect(() => {
		if (!isOpen) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isOpen]);

	return (
		<header className="border-b border-white/8 bg-ink-deep text-paper">
			<Container className="flex items-center justify-between py-6">
				<Link to="/" className="no-underline">
					<Wordmark
						top={wordmark.top}
						bottom={wordmark.bottom}
						tone="paper"
						className="text-[28px] md:text-[34px]"
					/>
				</Link>

				{/* Desktop navigation */}
				<nav aria-label="Primary" className="hidden md:flex items-center gap-8">
					{nav.map((item) => (
						<Link key={item.to} to={item.to} className={navLink}>
							{item.label}
						</Link>
					))}
					<CtaLink href={cta.href} className="ml-2">
						{cta.label}
					</CtaLink>
				</nav>

				{/* Mobile menu button */}
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden p-2 -mr-2 text-paper"
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
					aria-controls="mobile-nav"
				>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</Container>

			{/* Mobile navigation */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: single header per page; id is the aria-controls target */}
			<nav
				id="mobile-nav"
				aria-label="Mobile"
				className={`md:hidden border-t border-white/8 ${isOpen ? "block" : "hidden"}`}
			>
				<Container className="flex flex-col gap-1 py-4">
					{nav.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							onClick={() => setIsOpen(false)}
							className={`${navLink} py-3`}
						>
							{item.label}
						</Link>
					))}
					<CtaLink href={cta.href} className="mt-3">
						{cta.label}
					</CtaLink>
				</Container>
			</nav>
		</header>
	);
}
