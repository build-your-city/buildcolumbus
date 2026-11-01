import type { ReactNode } from "react";
import PhotoPlaceholder from "./PhotoPlaceholder";

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
};

export type SplitPhoto = {
	src: string;
	alt: string;
	/** Set on the hero photo so the browser fetches it first. */
	priority?: boolean;
	/** Focal point kept in view when the photo is cropped. Default "50% 50%". */
	focal?: Focal;
};

/** A gray placeholder box in the photo slot until a photo is supplied. */
export type SplitPlaceholder = {
	/** Caption shown under "PHOTO PLACEHOLDER", e.g. "First meetup, 2024". */
	placeholder: string;
};

type SplitBlockProps = {
	photo: SplitPhoto | SplitPlaceholder;
	/** The text side. */
	children: ReactNode;
	/** Which side the photo sits on at desktop. Alternate down the page. */
	photoSide?: "left" | "right";
};

const photoShape = "aspect-[16/10] w-full md:aspect-[4/3]";

/**
 * Text on one side and a photo on the other: 45% text and 55% photo on
 * desktop with a 56px gap, the photo at 4:3, cropped to fit and vertically
 * centered against the text. On mobile the photo goes under the text at
 * 16:10, also cropped to fit. Pass `{ placeholder }` instead of a photo to
 * show a PhotoPlaceholder of the same shape.
 */
export default function SplitBlock({
	photo,
	children,
	photoSide = "right",
}: SplitBlockProps) {
	const columns =
		photoSide === "left"
			? "md:grid-cols-[55fr_45fr]"
			: "md:grid-cols-[45fr_55fr]";
	const order = photoSide === "left" ? "md:order-first" : "";
	return (
		<div
			className={`grid grid-cols-1 gap-8 md:items-center md:gap-14 ${columns}`}
		>
			<div>{children}</div>
			{"placeholder" in photo ? (
				<PhotoPlaceholder
					label={photo.placeholder}
					className={`${photoShape} ${order}`}
				/>
			) : (
				<img
					src={photo.src}
					alt={photo.alt}
					className={`${photoShape} object-cover ${focalClass[photo.focal ?? "50% 50%"]} ${order}`}
					fetchPriority={photo.priority ? "high" : undefined}
					loading={photo.priority ? undefined : "lazy"}
				/>
			)}
		</div>
	);
}
