/**
 * The photos that get cropped to fit their box, each with its focal point:
 * the part of the photo that stays in view at every screen size (a CSS
 * object-position, "x% y%"). Heroes crop from 4:3 on desktop to very wide
 * strips on landscape phones, so the focal point matters most there. When
 * swapping a photo, check its crop at the test sizes in docs/DESIGN.md and
 * set a new focal point. Square headshots in round frames don't crop, so
 * they live with their people in city.ts and data/hack2026.ts.
 */

import type { FocalPhoto } from "@/components/focal";
import aboutFirstMeetup from "../images/photos/about-first-meetup.jpg";
import hWinners from "../images/photos/h-winners.jpg";
import heroCbus from "../images/photos/hero-cbus.jpg";
import meetupHeroLounge from "../images/photos/meetup-hero-lounge.jpg";
import pHack from "../images/photos/p-hack.jpg";
import pMeetup from "../images/photos/p-meetup.jpg";
import serveCodyFull from "../images/photos/serve-cody-full.jpg";

export const photos = {
	/** Home hero. Keeps the speaker and the screens above the audience. */
	meetupTalk: { src: pMeetup, focal: "50% 30%" },
	/** Meetup hero. Keeps the faces of the people at the counter in. */
	meetupLounge: { src: meetupHeroLounge, focal: "50% 40%" },
	/** Home Meetup card. Keeps the heads of the people standing in back. */
	meetupCircle: { src: heroCbus, focal: "50% 25%" },
	/** Serve hero and Home Serve card. Keeps Cody's head and the hand-off. */
	serve: { src: serveCodyFull, focal: "50% 18%" },
	/** Hack hero and Home Hack card. Keeps the standing heads in back. */
	hack: { src: pHack, focal: "50% 40%" },
	/** Hack recap. Keeps the whole results screen above the winners. */
	hackWinners: { src: hWinners, focal: "50% 25%" },
	/** About page, floated beside the story. Keeps the people, not the ceiling and wall above them. */
	aboutFirstMeetup: { src: aboutFirstMeetup, focal: "50% 75%" },
} satisfies Record<string, FocalPhoto>;
