import type { ReactNode } from "react";

/**
 * Where the photo is anchored when it is cropped, as a CSS object-position.
 * Each value maps to a Tailwind class below so the styles are generated at
 * build time; add a value to both places to use a new focal point.
 */
export type Focal = keyof typeof focalClass;

const focalClass = {
	"50% 50%": "object-center",
	"50% 55%": "object-[50%_55%]",
	"50% 60%": "object-[50%_60%]",
	"0% 50%": "object-[0%_50%]",
};

/** The same focal points, applied only side by side (see stackedPhoto). */
const focalClassSideBySide: Record<Focal, string> = {
	"50% 50%": "@4xl:object-center",
	"50% 55%": "@4xl:object-[50%_55%]",
	"50% 60%": "@4xl:object-[50%_60%]",
	"0% 50%": "@4xl:object-[0%_50%]",
};

export type SplitPhoto = {
	src: string;
	alt: string;
	/** Set on the hero photo so the browser fetches it first. */
	priority?: boolean;
	/** Focal point kept in view when the photo is cropped. Default "50% 50%". */
	focal?: Focal;
};

type SplitBlockProps = {
	photo: SplitPhoto;
	/** The text side. */
	children: ReactNode;
	/** Which side the photo sits on at desktop. Alternate down the page. */
	photoSide?: "left" | "right";
	/**
	 * How the photo looks when stacked under the text (below 56rem).
	 * "strip" (heroes): a 16:10 crop, capped at 70% of the screen height on
	 * short screens so a hero never fills a landscape phone. "full" (content
	 * photos that must not be cropped, like the Hack recap): the whole 4:3
	 * photo, no height cap, framed toward the top. Side by side, both are 4:3
	 * at the photo's focal point.
	 */
	stackedPhoto?: "strip" | "full";
};

/**
 * Text on one side and a photo on the other: 45% text and 55% photo with a
 * 56px gap, the photo at 4:3, cropped to fit and vertically centered against
 * the text. That needs the block to be at least 56rem (896px) wide, or the
 * text column gets too narrow for a big heading, so the switch follows the
 * block's own width (a container query), not the screen's. Narrower than
 * that (phones, landscape phones, tablets), the photo goes under the text,
 * shaped by `stackedPhoto`.
 */
export default function SplitBlock({
	photo,
	children,
	photoSide = "right",
	stackedPhoto = "strip",
}: SplitBlockProps) {
	const columns =
		photoSide === "left"
			? "@4xl:grid-cols-[55fr_45fr]"
			: "@4xl:grid-cols-[45fr_55fr]";
	const order = photoSide === "left" ? "@4xl:order-first" : "";
	const focalPoint = photo.focal ?? "50% 50%";
	const shape =
		stackedPhoto === "full"
			? `aspect-[4/3] object-[50%_15%] ${focalClassSideBySide[focalPoint]}`
			: `aspect-[16/10] @max-4xl:short:max-h-[70dvh] @4xl:aspect-[4/3] ${focalClass[focalPoint]}`;
	return (
		<div className="@container">
			<div
				className={`grid grid-cols-1 gap-8 @4xl:items-center @4xl:gap-14 ${columns}`}
			>
				<div>{children}</div>
				<img
					src={photo.src}
					alt={photo.alt}
					className={`w-full object-cover ${shape} ${order}`}
					fetchPriority={photo.priority ? "high" : undefined}
					loading={photo.priority ? undefined : "lazy"}
				/>
			</div>
		</div>
	);
}
