import Eyebrow from "./Eyebrow";

type SectionHeadingProps = {
	eyebrow?: string;
	children: React.ReactNode;
	/** Render as the page's h1 (72px) instead of a section h2 (56px). */
	as?: "h1" | "h2";
	/** Inherit the surrounding text color (used on the dark band). */
	tone?: "ink" | "paper";
	className?: string;
};

/**
 * Eyebrow plus heading, the opener for every section. Page titles are 44px
 * on mobile and 72px on desktop; section headings 36px and 56px.
 */
export default function SectionHeading({
	eyebrow,
	children,
	as = "h2",
	tone = "ink",
	className = "",
}: SectionHeadingProps) {
	const Tag = as;
	const size =
		as === "h1" ? "text-[44px] sm:text-[72px]" : "text-[36px] sm:text-[56px]";
	const color = tone === "ink" ? "text-ink" : "text-paper";
	return (
		<div className={className}>
			{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
			<Tag
				className={`${eyebrow ? "mt-4" : ""} font-display ${size} font-extrabold leading-none tracking-[-0.025em] ${color}`}
			>
				{children}
			</Tag>
		</div>
	);
}
