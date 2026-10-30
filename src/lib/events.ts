import eventsData from "../data/events.json";

export type MeetupEvent = {
	id: string;
	name: string;
	url: string;
	dateTime: string;
	venue: string;
	date: Date;
	/** Meetup number parsed from the synced title, e.g. 48. */
	number: number | null;
	/** Display title, e.g. "Build Columbus Meetup #48". */
	title: string;
};

const THREE_HOURS = 3 * 60 * 60 * 1000;

/** Pulls the "#48" out of a synced Meetup title. */
export function meetupNumber(name: string): number | null {
	const match = name.match(/#\s*(\d+)/);
	return match ? Number(match[1]) : null;
}

/** "Build Columbus Meetup #48" from a site name and the synced title. */
export function meetupTitle(name: string, siteName: string): string {
	const n = meetupNumber(name);
	return n === null ? `${siteName} Meetup` : `${siteName} Meetup #${n}`;
}

/**
 * Upcoming meetups from src/data/events.json (kept fresh by the nightly
 * sync workflow), soonest first. Keeps an event visible for three hours
 * after it starts so the card stays up while the meetup is in progress.
 */
export function upcomingEvents(
	siteName: string,
	now = Date.now(),
): MeetupEvent[] {
	return eventsData.events
		.map((e) => ({
			...e,
			date: new Date(e.dateTime),
			number: meetupNumber(e.name),
			title: meetupTitle(e.name, siteName),
		}))
		.filter((e) => e.date.getTime() > now - THREE_HOURS)
		.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function nextEvent(
	siteName: string,
	now = Date.now(),
): MeetupEvent | undefined {
	return upcomingEvents(siteName, now)[0];
}

const ET = "America/New_York";

export function weekdayShort(date: Date): string {
	return date.toLocaleString("en-US", { weekday: "short", timeZone: ET });
}

export function monthShort(date: Date): string {
	return date.toLocaleString("en-US", { month: "short", timeZone: ET });
}

export function dayOfMonth(date: Date): string {
	return date.toLocaleString("en-US", { day: "numeric", timeZone: ET });
}
