import type { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
	children: ReactNode;
	/** "dark" is the one Ink band a page may have. */
	tone?: "paper" | "dark";
	/** Drop the top border, e.g. for the first section under the header. */
	noBorder?: boolean;
	className?: string;
	id?: string;
};

/**
 * A page section: 88px vertical padding on desktop, 1px Line border on top
 * to separate it from the section above.
 */
export default function Section({
	children,
	tone = "paper",
	noBorder = false,
	className = "",
	id,
}: SectionProps) {
	const tones = {
		paper: "bg-paper text-ink",
		dark: "bg-ink text-paper",
	};
	const border = noBorder ? "" : "border-t border-line";
	return (
		<section id={id} className={`${tones[tone]} ${border} ${className}`}>
			<Container className="py-14 md:py-22">{children}</Container>
		</section>
	);
}
