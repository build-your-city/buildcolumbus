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
					"Once a month on a Saturday afternoon, builders from around Columbus get together at Improving. Talks, workshops, and time to share what you're making.",
			},
		],
	}),
});

const steps = [
	{
		marker: "1",
		title: "Say hello",
		body: "We go around the room and everyone shares their name, what they're working on, and something they can help with.",
	},
	{
		marker: "2",
		title: "Main session",
		body: "A talk, a workshop, or time to work alongside other builders. It changes month to month and gets posted on Meetup.com ahead of time.",
	},
	{
		marker: "3",
		title: "Hang out",
		body: "Food, coffee, and time to keep the conversations going.",
	},
];

function MeetupPage() {
	const upcoming = upcomingEvents(city.siteName);

	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					photo={{
						src: heroPhoto,
						alt: "Builders talking in the lounge at a Build Columbus meetup at Improving.",
						priority: true,
						focal: "50% 55%",
					}}
				>
					<SectionHeading as="h1">Meetup</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							Once a month on a Saturday afternoon, builders from around
							Columbus get together at Improving downtown. Sometimes there's a
							talk or a workshop. Other times we work on our own projects and
							share what we're making.
						</p>
						<p className={`${leadText} text-ink`}>
							Either way, you'll meet good people and leave with new ideas.
							First time? You'll fit right in.
						</p>
					</div>
					<div className="mt-8 sm:mt-10">
						<CtaLink href={city.links.discord}>Join the Discord</CtaLink>
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

			{/* What to expect */}
			<Section>
				<SectionHeading eyebrow="What to expect">
					What a Saturday looks like
				</SectionHeading>
				<div className="mt-6 sm:mt-10">
					<ThreeUp items={steps} />
				</div>
			</Section>

			{/* Call for speakers */}
			<Section tone="dark">
				<div className="sm:mx-auto sm:max-w-[760px] sm:text-center">
					<SectionHeading tone="paper">Want to give a talk?</SectionHeading>
					<p className={`mt-6 sm:mt-8 ${leadText} text-paper`}>
						If you know something other builders would find useful, we'd love to
						hear it. Talks run 30 minutes to an hour. Send us your idea and
						we'll get back to you.
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
