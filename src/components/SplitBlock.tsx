import type { ReactNode } from "react";

export type SplitPhoto = {
	src: string;
	alt: string;
	/** Set on the hero photo so the browser fetches it first. */
	priority?: boolean;
};

type SplitBlockProps = {
	photo: SplitPhoto;
	/** The text side. */
	children: ReactNode;
	/** Which side the photo sits on at desktop. Alternate down the page. */
	photoSide?: "left" | "right";
};

/**
 * Two equal columns, text on one side and a photo on the other, 56px gap.
 * The photo fills its column: full width, as tall as the text column (at
 * least 480px), cropped to fit. On mobile the photo goes under the text at
 * 16:10, also cropped to fit.
 */
export default function SplitBlock({
	photo,
	children,
	photoSide = "right",
}: SplitBlockProps) {
	const order = photoSide === "left" ? "md:order-first" : "";
	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14">
			<div className="md:self-center">{children}</div>
			<div
				className={`relative aspect-[16/10] md:aspect-auto md:min-h-[480px] ${order}`}
			>
				<img
					src={photo.src}
					alt={photo.alt}
					className="absolute inset-0 h-full w-full object-cover object-center"
					fetchPriority={photo.priority ? "high" : undefined}
					loading={photo.priority ? undefined : "lazy"}
				/>
			</div>
		</div>
	);
}
