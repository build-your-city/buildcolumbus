import type { ReactNode } from "react";
import { type FocalPhoto, focalClass } from "./focal";

/** focal: the point kept in view when the photo is cropped. */
export type SplitPhoto = FocalPhoto & {
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
	/**
	 * How the photo looks when stacked under the text (below 56rem).
	 * "strip" (heroes): a 16:10 crop, capped at 70% of the screen height on
	 * short screens so a hero never fills a landscape phone. "full" (content
	 * photos that must not be cropped, like the Hack recap): the whole 4:3
	 * photo, no height cap. Both are framed at the photo's focal point, and
	 * side by side both are 4:3.
	 */
	stackedPhoto?: "strip" | "full";
};

/**
 * Text on one side and a photo on the other: 45% text and 55% photo with a
 * 56px gap, the photo at 4:3, cropped to fit. Both columns start at the top,
 * so a hero's heading and photo sit at the same height on every page and the
 * photo sets the block's height (hero text is written to fit within it). That needs the block to be at least 56rem (896px) wide, or the
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
			? `aspect-[4/3] ${focalClass[focalPoint]}`
			: `aspect-[16/10] @max-4xl:short:max-h-[70dvh] @4xl:aspect-[4/3] ${focalClass[focalPoint]}`;
	return (
		<div className="@container">
			<div
				className={`grid grid-cols-1 gap-8 @4xl:items-start @4xl:gap-14 ${columns}`}
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
