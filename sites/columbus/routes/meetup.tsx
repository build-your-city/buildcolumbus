import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import EventCard from "@/components/EventCard";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import SponsorGrid from "@/components/SponsorGrid";
import ThreeUp from "@/components/ThreeUp";
import { bodyText, leadText } from "@/components/text";
import { upcomingEvents } from "@/lib/events";
import { pageHead } from "@/lib/headTags";
import { city, sponsorsFor } from "../config/city";
import { photos } from "../config/photos";
import { pages, site } from "../config/site";

export const Route = createFileRoute("/meetup")({
	component: MeetupPage,
	head: () => pageHead(site, pages.meetup),
});

const steps = [
	{
		marker: "1",
		title: "Intro circle",
		body: "We go around the room and everyone shares their name, what they're working on, and how their skills could help someone else.",
	},
	{
		marker: "2",
		title: "Main session",
		body: "Attend a talk, join a workshop, or work on a project.",
	},
	{
		marker: "3",
		title: "Hang out",
		body: "Food, coffee, and conversation with other builders.",
	},
];

function MeetupPage() {
	const upcoming = upcomingEvents(city.siteName);

	return (
		<>
			{/* Page hero */}
			<Section hero>
				<SplitBlock
					photo={{
						...photos.meetupLounge,
						alt: "Builders talking in the lounge at a Build Columbus meetup at Improving.",
						priority: true,
					}}
				>
					<SectionHeading as="h1">Meetup</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							Once a month on a Saturday afternoon, we get together at Improving
							in Columbus to learn from each other, work on projects, and share
							what we're building.
						</p>
						<p className={`${leadText} text-ink`}>
							You'll leave with new ideas and new connections. First time?
							You'll fit right in.
						</p>
					</div>
					{/* Stacked full width on phones, one row from sm up. */}
					<div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap">
						<CtaLink href={city.links.meetupEvents}>RSVP on Meetup.com</CtaLink>
						<CtaLink href={city.links.discord} variant="secondary">
							Join the Discord
						</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* Upcoming, from the synced Meetup data */}
			<Section>
				<SectionHeading align="center">Next meetup</SectionHeading>
				{upcoming.length === 0 ? (
					<div className="mt-6 border border-line bg-white p-8 sm:mt-10 md:p-12">
						<p className={`${bodyText} text-ink`}>
							Nothing on the calendar right now. New dates go up on Meetup.com
							first.
						</p>
						<CtaLink href={city.links.meetupEvents} className="mt-7">
							Check Meetup
						</CtaLink>
					</div>
				) : (
					<ul className="mt-6 flex flex-col gap-4 sm:mt-10 sm:gap-6">
						{upcoming.map((event) => (
							<li key={event.id}>
								<EventCard event={event} details={city.meetupDetails} />
							</li>
						))}
					</ul>
				)}
			</Section>

			{/* What to expect */}
			<Section>
				<SectionHeading align="center">What to expect</SectionHeading>
				<div className="mt-6 sm:mt-10">
					<ThreeUp items={steps} />
				</div>
			</Section>

			{/* Call for speakers */}
			<Section tone="dark" align="center">
				<SectionHeading tone="paper">Want to give a talk?</SectionHeading>
				<p className={`mt-6 sm:mt-8 ${leadText} text-paper`}>
					If you know something other builders would find useful, we'd love to
					hear it. Talks run 30 minutes to an hour. Send us your idea and we'll
					get back to you.
				</p>
				<CtaLink href={city.links.sessionize} className="mt-8 sm:mt-10">
					Submit a talk
				</CtaLink>
			</Section>

			{/* Sponsors */}
			<Section>
				<SectionHeading align="center">Sponsors and partners</SectionHeading>
				<div className="mt-6 sm:mt-12">
					<SponsorGrid sponsors={sponsorsFor("meetup")} />
				</div>
			</Section>
		</>
	);
}
