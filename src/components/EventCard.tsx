import {
	dayOfMonth,
	type MeetupEvent,
	monthShort,
	weekdayShort,
} from "../lib/events";
import CtaLink from "./CtaLink";

type EventCardProps = {
	event: MeetupEvent;
	/** Standard meetup hours, e.g. "1 to 4 PM". */
	hours: string;
	/** Venue name and address, e.g. "Improving, 330 Rush Alley, Suite 150". */
	where: string;
	/** "full" adds the food and first-timers line (home page). */
	detail?: "full" | "short";
};

/**
 * One upcoming meetup: big date on the left, title, where and when, and an
 * RSVP button. Title and date come from the synced Meetup data.
 */
export default function EventCard({
	event,
	hours,
	where,
	detail = "short",
}: EventCardProps) {
	return (
		<article className="flex flex-col gap-8 border border-line bg-white p-8 md:flex-row md:gap-12 md:p-12">
			<div className="flex shrink-0 flex-row items-baseline gap-3 md:w-44 md:flex-col md:items-center md:gap-0 md:text-center">
				<p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-blue">
					{weekdayShort(event.date)}
				</p>
				<p className="font-display text-[56px] font-extrabold leading-none tracking-[-0.025em] text-ink md:mt-1">
					{monthShort(event.date)}
					<span className="md:block"> {dayOfMonth(event.date)}</span>
				</p>
			</div>
			<div className="min-w-0 flex-1">
				<h3 className="font-display text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
					{event.title}
				</h3>
				<p className="mt-3 font-sans text-[17px] font-medium leading-[1.55] text-ink">
					{hours} at {where}.
					{detail === "full" &&
						" Food and beverages provided. First-timers always welcome."}
				</p>
				<CtaLink href={event.url} className="mt-7">
					RSVP on Meetup
				</CtaLink>
			</div>
		</article>
	);
}
