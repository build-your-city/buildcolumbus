/**
 * Everything city-specific lives here. To stand up another city, copy this
 * file, swap the values, and drop in that city's photos and logos.
 */

import logoBethel from "../images/logos/logo-bethel.png";
import logoFruitsRoots from "../images/logos/logo-fr.png";
import logoImproving from "../images/logos/logo-improving.png";
import logoIndigitous from "../images/logos/logo-ind.png";
import logoLe from "../images/logos/logo-le.png";
import photoCody from "../images/photos/about-cody.jpg";
import photoNathan from "../images/photos/about-nathan.jpg";
import { site } from "./site";

export type SponsorPage = "meetup" | "hack" | "about";

export type SponsorId =
	| "improving"
	| "fruitsAndRoots"
	| "bethel"
	| "indigitous"
	| "leadingEdje";

export type SponsorEntry = {
	name: string;
	href: string;
	logo: string;
};

export const city = {
	name: "Columbus",
	state: "Ohio",
	/** Short place label used in eyebrows, e.g. "Columbus, Ohio". */
	place: "Columbus, Ohio",
	siteName: site.name,
	domain: "buildcolumbus.org",
	email: "hello@buildcolumbus.org",

	links: {
		// Meetup group will be renamed; the slug stays the same.
		meetup: "https://www.meetup.com/citcbus/",
		meetupEvents: "https://www.meetup.com/citcbus/events/",
		discord: "https://discord.com/invite/s9bQZBVduF",
		sessionize: "https://sessionize.com/citcbus",
		parent: "https://build-your-city.org",
		donate: "https://onrealm.org/bwpc/-/form/give/cit",
		instagram: "https://www.instagram.com/build_columbus",
		linkedin: "https://www.linkedin.com/showcase/citcbus/",
		facebook: "https://www.facebook.com/build_columbus",
	},

	venue: {
		name: "Improving",
		address: "330 Rush Alley, Suite 150",
		cityState: "Columbus, OH 43215",
	},

	/** Standard meetup hours, shown on event cards. */
	meetupHours: "1 to 4 PM",

	/** Program names. Never "Hackathon" except in the formal event name. */
	programs: {
		meetup: "Meetup",
		serve: "Serve",
		hack: "Hack",
	},

	/** Formal name of this year's Hack event. */
	hackEventName: "#HACK Columbus 2026",

	/** Sponsors and partners, keyed by a short id. */
	sponsors: {
		improving: {
			name: "Improving",
			href: "https://www.improving.com/locations/columbus/",
			logo: logoImproving,
		},
		fruitsAndRoots: {
			name: "Fruits and Roots Coffee Roasters",
			href: "https://www.fruitsandroots.com/",
			logo: logoFruitsRoots,
		},
		bethel: {
			name: "Bethel World Prayer Center",
			href: "https://www.bethelworldprayercenter.org/",
			logo: logoBethel,
		},
		indigitous: {
			name: "Indigitous",
			href: "https://indigitous.org/",
			logo: logoIndigitous,
		},
		leadingEdje: {
			name: "Leading EDJE",
			href: "https://www.leadingedje.com/",
			logo: logoLe,
		},
	} satisfies Record<SponsorId, SponsorEntry>,

	/** Which sponsors appear in each page's grid, in display order. */
	sponsorPages: {
		meetup: ["improving", "fruitsAndRoots", "bethel"],
		hack: ["indigitous", "leadingEdje", "bethel", "fruitsAndRoots"],
		about: ["improving", "fruitsAndRoots", "bethel"],
	} satisfies Record<SponsorPage, SponsorId[]>,

	organizers: [
		{
			name: "Nathan Speich",
			role: "Co-founder",
			photo: photoNathan,
			linkedin: "https://www.linkedin.com/in/nathanspeich",
		},
		{
			name: "Cody Steffy",
			role: "Co-founder",
			photo: photoCody,
			linkedin: "https://www.linkedin.com/in/cody-steffy",
		},
	],
} as const;

export type City = typeof city;

/** Sponsors whose logo belongs in the grid on the given page. */
export function sponsorsFor(page: SponsorPage): SponsorEntry[] {
	return city.sponsorPages[page].map((id) => city.sponsors[id]);
}
