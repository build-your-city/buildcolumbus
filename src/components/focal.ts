/**
 * Focal points for cropped photos: where a photo is anchored when its box
 * crops it, as a CSS object-position ("x% y%"). Each value maps to a
 * Tailwind class here so the styles are generated at build time; add a
 * value to both maps to use a new focal point. Set the focal point next to
 * the photo in the site's config, not in the component that shows it.
 */
export const focalClass = {
	"50% 50%": "object-center",
	"50% 18%": "object-[50%_18%]",
	"50% 25%": "object-[50%_25%]",
	"50% 30%": "object-[50%_30%]",
	"50% 40%": "object-[50%_40%]",
	"50% 75%": "object-[50%_75%]",
};

export type Focal = keyof typeof focalClass;

/** A cropped photo and the point that must stay in view. */
export type FocalPhoto = {
	src: string;
	/** Default "50% 50%". */
	focal?: Focal;
};
