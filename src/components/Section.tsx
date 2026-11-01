import type { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
	children: ReactNode;
	/**
	 * "auto" sections alternate White and Paper down the page on their own,
	 * starting with a White hero (see `section[data-band]` in styles.css).
	 * "dark" is the one Ink call-to-action band a page may have; it sits
	 * outside the alternation, so the bands around it still alternate.
	 */
	tone?: "auto" | "dark";
	/** The page's first section, directly under the header. */
	hero?: boolean;
	/**
	 * "center" puts everything in one narrow, centered column: heading,
	 * text, and button. Used for call-to-action bands.
	 */
	align?: "left" | "center";
	className?: string;
	id?: string;
};

/**
 * A page section: 72px vertical padding on desktop and 48px on mobile, with a
 * 1px Line border on top to separate it from the section above. The hero has
 * no border and a shorter bottom so the first section follows closely.
 */
export default function Section({
	children,
	tone = "auto",
	hero = false,
	align = "left",
	className = "",
	id,
}: SectionProps) {
	const color = tone === "dark" ? "bg-ink text-paper" : "text-ink";
	const border = hero ? "" : "border-t border-line";
	const padding = hero ? "pt-12 pb-10 sm:pt-18 sm:pb-14" : "py-12 sm:py-18";
	return (
		<section
			id={id}
			data-band={tone === "auto" ? "" : undefined}
			className={`${color} ${border} ${className}`}
		>
			<Container className={padding}>
				{align === "center" ? (
					<div className="mx-auto max-w-[40rem] text-center">{children}</div>
				) : (
					children
				)}
			</Container>
		</section>
	);
}
