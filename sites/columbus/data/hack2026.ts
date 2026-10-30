/**
 * Content for the #HACK Columbus 2026 recap on /hack. Event-specific, so it
 * lives apart from the city config.
 */

import icDisability from "../images/logos/ic-disability.png";
import icFamily from "../images/logos/ic-family.png";
import icHome from "../images/logos/ic-home.png";
import icMissions from "../images/logos/ic-missions.png";
import icRefugee from "../images/logos/ic-refugee.png";
import sChris from "../images/speakers/s-chris.png";
import sCody from "../images/speakers/s-cody.jpg";
import sEmily from "../images/speakers/s-emily.png";
import sGenna from "../images/speakers/s-genna.jpg";
import sKeith from "../images/speakers/s-keith.jpg";
import sKelli from "../images/speakers/s-kelli.jpg";

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

export type Speaker = {
	area: string;
	name: string;
	org: string;
	body: string;
	photo: string;
	link: { label: string; href: string };
};

export const speakers: Speaker[] = [
	{
		area: "Homelessness",
		name: "Kelli Welsheimer",
		org: "The Bridge Ministry",
		body: "Serves people experiencing homelessness in Columbus through outreach, meals, and relationship.",
		photo: sKelli,
		// Verified: the Columbus org is at thebridge-ministry.com (with a hyphen);
		// thebridgeministry.com is an unrelated Texas church.
		link: {
			label: "thebridge-ministry.com",
			href: "https://thebridge-ministry.com/",
		},
	},
	{
		area: "Refugees & Immigrants",
		name: "Emily Lady",
		org: "Riverview International Center",
		body: "A community center on the north side serving refugee and immigrant families with education, support, and connection.",
		photo: sEmily,
		link: {
			label: "riverviewinternationalcenter.org",
			href: "https://riverviewinternationalcenter.org/",
		},
	},
	{
		area: "Missions",
		name: "Chris Lady",
		org: "Data strategy and architecture",
		body: "Shared how the shape of global missions has shifted, and where builders fit in the 2026 reality.",
		photo: sChris,
		// LinkedIn URL to be supplied.
		link: { label: "Connect on LinkedIn", href: "#" },
	},
	{
		area: "Family Online Safety",
		name: "Cody Steffy",
		org: "Co-founder, Build Columbus",
		body: "Cybersecurity specialist. Walked through how kids are targeted online and what a safety layer could look like.",
		photo: sCody,
		// LinkedIn URL to be supplied.
		link: { label: "Connect on LinkedIn", href: "#" },
	},
	{
		area: "Disability Inclusion",
		name: "Genna Pellin & Summer Skodacek",
		org: "Special Touch Ministry",
		body: "Camps, respite, and community for people with disabilities and their families across Ohio.",
		photo: sGenna,
		link: { label: "specialtouch.org", href: "https://specialtouch.org/" },
	},
	{
		area: "Disability Inclusion",
		name: "Dr. Keith Newton",
		org: "Digital accessibility",
		body: "The technical side: why accessibility removes barriers, and how to build it in instead of bolting it on.",
		photo: sKeith,
		// LinkedIn URL to be supplied.
		link: { label: "Connect on LinkedIn", href: "#" },
	},
];
