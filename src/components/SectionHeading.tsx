import type { ReactNode } from "react";
import { bodyText } from "./text";

type SectionHeadingProps = {
	children: ReactNode;
	/**
	 * Render as the page's h1 (72px) instead of a section h2 (56px). "h3" is
	 * for a section that belongs to the one before it (the Hack recap parts):
	 * the h2 look, one level down in the outline.
	 */
	as?: "h1" | "h2" | "h3";
	/** Inherit the surrounding text color (used on the dark band). */
	tone?: "ink" | "paper";
	/**
	 * "center" for sections whose content is a centered or symmetric group
	 * (cards, steps, logos). Heroes and photo blocks stay left.
	 */
	align?: "left" | "center";
	/** One short line under the heading. Narrower when centered. */
	intro?: ReactNode;
	className?: string;
};

/**
 * The heading that opens every section, with an optional intro line. Page
 * titles are 44px on mobile and 72px on desktop; section headings 36px and
 * 56px.
 */
export default function SectionHeading({
	children,
	as = "h2",
	tone = "ink",
	align = "left",
	intro,
	className = "",
}: SectionHeadingProps) {
	const Tag = as;
	const size =
		as === "h1" ? "text-[44px] sm:text-[72px]" : "text-[36px] sm:text-[56px]";
	const color = tone === "ink" ? "text-ink" : "text-paper";
	const centered = align === "center";
	return (
		<div className={`${centered ? "text-center" : ""} ${className}`}>
			<Tag
				className={`font-display ${size} font-extrabold leading-none tracking-[-0.025em] ${color}`}
			>
				{children}
			</Tag>
			{intro && (
				<p
					className={`mt-6 ${bodyText} ${color} ${centered ? "mx-auto max-w-[36rem] text-balance" : ""}`}
				>
					{intro}
				</p>
			)}
		</div>
	);
}
