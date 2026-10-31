/**
 * Shared text styles. Each string lists the mobile (under 640px) size first
 * and the desktop size after `sm:`. Color is left to the caller so the same
 * style works on Paper, White, and Ink.
 */

/** Lead paragraph: heroes and dark bands. 18px on mobile, 22px on desktop. */
export const leadText =
	"font-sans text-[18px] font-medium leading-[1.5] sm:text-[22px] sm:leading-[1.4]";

/** Body copy: 17px everywhere, line-height 1.5 on mobile and 1.55 on desktop. */
export const bodyText =
	"font-sans text-[17px] font-medium leading-[1.5] sm:leading-[1.55]";

/** Card and step heading: 24px on mobile, 28px on desktop. */
export const cardHeading =
	"font-display text-[24px] font-bold leading-[1.05] tracking-[-0.025em] sm:text-[28px] sm:leading-[1.1]";

/** Name or small heading inside a card: 22px. */
export const smallHeading =
	"font-display text-[22px] font-bold leading-[1.1] tracking-[-0.025em]";

/** Text link with a 2px Build Blue underline. */
export const underlineLink =
	"inline-block border-b-2 border-blue pb-0.5 font-sans text-base font-semibold no-underline transition-colors hover:text-blue-deep";
