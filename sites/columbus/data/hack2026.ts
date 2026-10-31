/**
 * Content for the #HACK Columbus 2026 recap on /hack. Event-specific, so it
 * lives apart from the city config.
 */

import icDisability from "../images/logos/ic-disability.png";
import icFamily from "../images/logos/ic-family.png";
import icHome from "../images/logos/ic-home.png";
import icMissions from "../images/logos/ic-missions.png";
import icRefugee from "../images/logos/ic-refugee.png";
import sGenna from "../images/speakers/genna-pellin.jpg";
import sChris from "../images/speakers/s-chris.png";
import sCody from "../images/speakers/s-cody.jpg";
import sEmily from "../images/speakers/s-emily.png";
import sKeith from "../images/speakers/s-keith.jpg";
import sKelli from "../images/speakers/s-kelli.jpg";
import sSummer from "../images/speakers/summer-skodacek.jpg";

export const hackSteps = [
	{
		marker: "1",
		title: "Hear the need",
		body: "Seven guest speakers shared what they see every day in their work, from homelessness to digital accessibility.",
	},
	{
		marker: "2",
		title: "Pick a challenge",
		body: "Everyone picked a challenge and got to work, solo or in small teams.",
	},
	{
		marker: "3",
		title: "Present an idea",
		body: "Five minutes each to the room by evening. The crowd voted, and three builders went home with the favorite.",
	},
];

export const challengeAreas = [
	{ title: "Homelessness", icon: icHome },
	{ title: "Refugees & Immigrants", icon: icRefugee },
	{ title: "Missions", icon: icMissions },
	{ title: "Family Online Safety", icon: icFamily },
	{ title: "Disability Inclusion", icon: icDisability },
];

export type SpeakerPerson = {
	name: string;
	title: string;
	photo: string;
};

/** One speaker card. Two people share a card when they presented together. */
export type Speaker = {
	area: string;
	people: SpeakerPerson[];
	/** Organization line, shown when there is one. */
	org?: string;
	link: { label: string; href: string };
};

export const speakers: Speaker[] = [
	{
		area: "Homelessness",
		people: [
			{
				name: "Kelli Welsheimer",
				title: "Chief Advancement and Strategy Officer",
				photo: sKelli,
			},
		],
		org: "The Bridge Ministry",
		// Verified: the Columbus org is at thebridge-ministry.com (with a hyphen);
		// thebridgeministry.com is an unrelated Texas church.
		link: {
			label: "thebridge-ministry.com",
			href: "https://thebridge-ministry.com/",
		},
	},
	{
		area: "Refugees & Immigrants",
		people: [
			{
				name: "Emily Lady",
				title: "Community Care Program Manager",
				photo: sEmily,
			},
		],
		org: "Riverview International Center",
		link: {
			label: "riverviewinternationalcenter.org",
			href: "https://riverviewinternationalcenter.org/",
		},
	},
	{
		area: "Missions",
		people: [
			{
				name: "Chris Lady",
				title: "Director, Data Strategy and Architecture",
				photo: sChris,
			},
		],
		// No organization, by his request. LinkedIn URL to be supplied.
		link: { label: "Connect on LinkedIn", href: "#" },
	},
	{
		area: "Family Online Safety",
		people: [
			{
				name: "Cody Steffy",
				title: "Sr. Cybersecurity Specialist and Co-founder",
				photo: sCody,
			},
		],
		org: "Build Columbus",
		// LinkedIn URL to be supplied.
		link: { label: "Connect on LinkedIn", href: "#" },
	},
	{
		area: "Disability Inclusion",
		people: [
			{ name: "Genna Pellin", title: "National Secretary", photo: sGenna },
			{
				name: "Summer Skodacek",
				title: "National Ministry Representative",
				photo: sSummer,
			},
		],
		org: "Special Touch Ministry",
		link: { label: "specialtouch.org", href: "https://specialtouch.org/" },
	},
	{
		area: "Disability Inclusion",
		people: [
			{
				name: "Dr. Keith Newton",
				title: "Founder & Principal, Accessibility, AI & Product Systems",
				photo: sKeith,
			},
		],
		// No organization. LinkedIn URL to be supplied.
		link: { label: "Connect on LinkedIn", href: "#" },
	},
];
