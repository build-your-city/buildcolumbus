import type { ReactNode } from "react";

type SplitBlockProps = {
	/** The photo (or placeholder) side. */
	media: ReactNode;
	/** The text side. */
	children: ReactNode;
	/** Which side the photo sits on at desktop. Alternate down the page. */
	mediaSide?: "left" | "right";
};

/**
 * Two equal columns, photo on one side and text on the other, 56px gap.
 * On mobile the photo goes under the text.
 */
export default function SplitBlock({
	media,
	children,
	mediaSide = "right",
}: SplitBlockProps) {
	const mediaOrder = mediaSide === "left" ? "md:order-first" : "";
	return (
		<div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
			<div>{children}</div>
			<div className={mediaOrder}>{media}</div>
		</div>
	);
}
