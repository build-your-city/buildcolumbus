import { Link } from "@tanstack/react-router";

type CtaLinkProps = {
	/** External URL, mailto:, or in-page #anchor. Use `to` for router routes. */
	href?: string;
	/** Internal route path, e.g. "/serve". */
	to?: string;
	/**
	 * primary: Build Blue fill, white text.
	 * secondary: transparent, 2px Ink border.
	 * ink: Ink fill, white text (header only).
	 */
	variant?: "primary" | "secondary" | "ink";
	children: React.ReactNode;
	className?: string;
};

const base =
	"inline-block border-2 px-7 py-[16px] text-center font-sans text-base font-semibold leading-tight no-underline transition-colors duration-150";

const variants = {
	primary:
		"border-blue-deep bg-blue-deep text-white hover:bg-ink hover:border-ink",
	secondary: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
	ink: "border-ink bg-ink text-white hover:bg-blue-deep hover:border-blue-deep",
};

/**
 * The site-wide button-styled link. Renders a router Link when given `to`,
 * otherwise an anchor. Only http(s) URLs open in a new tab; mailto: and
 * #anchor links stay in the current one.
 */
export default function CtaLink({
	href = "#",
	to,
	variant = "primary",
	children,
	className = "",
}: CtaLinkProps) {
	const classes = `${base} ${variants[variant]} ${className}`;

	if (to) {
		return (
			<Link to={to} className={classes}>
				{children}
			</Link>
		);
	}

	const external = /^https?:\/\//.test(href);

	return (
		<a
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			className={classes}
		>
			{children}
		</a>
	);
}
