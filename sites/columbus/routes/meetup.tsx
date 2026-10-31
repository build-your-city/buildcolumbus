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
import { city, sponsorsFor } from "../config/city";
import heroPhoto from "../images/photos/meetup-hero-lounge.jpg";

export const Route = createFileRoute("/meetup")({
	component: MeetupPage,
	head: () => ({
		meta: [
			{ title: `Meetup | ${city.siteName}` },
			{
				name: "description",
				content:
					"Once a month at Improving. Talks, workshops, and time to meet the people building things in Columbus.",
			},
		],
	}),
});

const steps = [
	{
		marker: "1",
		title: "Intro circle",
		body: "Everyone says their name, what they're working on, and what they can help with. Then a quick rundown of what's coming up.",
	},
	{
		marker: "2",
		title: "Main session",
		body: "A talk, a workshop, or open time to work on your own project. It changes month to month and gets posted on Meetup.com ahead of time.",
	},
	{
		marker: "3",
		title: "Hang out",
		body: "Food, coffee, and time to talk, network, and hear what others are working on.",
	},
];

function MeetupPage() {
	const upcoming = upcomingEvents(city.siteName);
	const next = upcoming[0];

	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					photo={{
						src: heroPhoto,
						alt: "Builders talking in the lounge at a Build Columbus meetup at Improving.",
						priority: true,
					}}
				>
					<SectionHeading as="h1" eyebrow="Monthly, hosted by Improving">
						Meetup
					</SectionHeading>
					<p className={`mt-6 sm:mt-8 ${leadText} text-ink`}>
						Once a month on a Saturday afternoon at Improving: a talk or
						workshop, time to meet other builders, and food. First-timers always
						welcome.
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
						<CtaLink href={next?.url ?? city.links.meetupEvents}>
							RSVP on Meetup
						</CtaLink>
						<CtaLink href={city.links.discord} variant="secondary">
							Join the Discord
						</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* Upcoming, from the synced Meetup data */}
			<Section tone="white">
				<SectionHeading eyebrow="Upcoming">Next meetup</SectionHeading>
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
								<EventCard
									event={event}
									hours={city.meetupHours}
									where={`${city.venue.name}, ${city.venue.address}`}
								/>
							</li>
						))}
					</ul>
				)}
			</Section>

			{/* How a meetup goes */}
			<Section>
				<SectionHeading eyebrow="What to expect">
					How a meetup goes
				</SectionHeading>
				<div className="mt-6 sm:mt-10">
					<ThreeUp items={steps} />
				</div>
			</Section>

			{/* Call for speakers */}
			<Section tone="dark">
				<div className="sm:mx-auto sm:max-w-[760px] sm:text-center">
					<SectionHeading eyebrow="Want to speak?" tone="paper">
						Give a talk.
					</SectionHeading>
					<p className={`mt-6 sm:mt-8 ${leadText} text-paper`}>
						Have something builders would find useful? Talks run 30 minutes to
						an hour. Send us your idea and we'll be in touch about a date.
					</p>
					<CtaLink href={city.links.sessionize} className="mt-8 sm:mt-10">
						Submit a talk
					</CtaLink>
				</div>
			</Section>

			{/* Sponsors */}
			<Section>
				<SectionHeading eyebrow="Thank you">
					Sponsors and partners
				</SectionHeading>
				<div className="mt-6 sm:mt-12">
					<SponsorGrid sponsors={sponsorsFor("meetup")} />
				</div>
			</Section>
		</>
	);
}
