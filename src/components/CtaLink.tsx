import { Link } from "@tanstack/react-router";

type CtaLinkProps = {
	/** External URL, mailto:, or in-page #anchor. Use `to` for router routes. */
	href?: string;
	/** Internal route path, e.g. "/serve". */
	to?: string;
	/**
	 * primary: Build Blue fill, white text; darker blue on hover.
	 * secondary: transparent with a 2px border; fills on hover.
	 * ink: Ink fill, white text (header only).
	 */
	variant?: "primary" | "secondary" | "ink";
	/** Set on a dark (Ink) band so the secondary variant uses Paper. */
	onDark?: boolean;
	children: React.ReactNode;
	className?: string;
};

const base =
	"inline-block border-2 px-7 py-[16px] text-center font-sans text-base font-semibold leading-tight no-underline transition-colors duration-150";

const variants = {
	primary:
		"border-blue-deep bg-blue-deep text-white hover:border-blue-hover hover:bg-blue-hover",
	secondary: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
	secondaryOnDark:
		"border-paper bg-transparent text-paper hover:bg-paper hover:text-ink",
	ink: "border-ink bg-ink text-white hover:border-blue-deep hover:bg-blue-deep",
};

/**
 * The site-wide button-styled link. Renders a router Link when given `to`,
 * otherwise an anchor. Only http(s) URLs open in a new tab; mailto: and
 * #anchor links stay in the current one. Every variant keeps a visible
 * fill or border on hover, on Paper, White, and Ink backgrounds alike.
 */
export default function CtaLink({
	href = "#",
	to,
	variant = "primary",
	onDark = false,
	children,
	className = "",
}: CtaLinkProps) {
	const look =
		variant === "secondary" && onDark
			? variants.secondaryOnDark
			: variants[variant];
	const classes = `${base} ${look} ${className}`;

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
