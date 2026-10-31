import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import EventCard from "@/components/EventCard";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SponsorCarousel from "@/components/SponsorCarousel";
import ThreeUp from "@/components/ThreeUp";
import { upcomingEvents } from "@/lib/events";
import { city, sponsorsFor } from "../config/city";

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
		body: "A talk, a workshop, or an open build block. It changes month to month and gets posted on Meetup ahead of time.",
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
				<div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
					<div>
						<SectionHeading as="h1" eyebrow="Monthly at Improving">
							Meetup
						</SectionHeading>
						<p className="mt-8 font-sans text-[22px] font-medium leading-[1.4] text-ink">
							Once a month on a Saturday afternoon at Improving. A talk or
							workshop, time to meet other builders, and food and beverages
							provided. First-timers always welcome.
						</p>
						<div className="mt-10 flex flex-wrap gap-4">
							<CtaLink href={next?.url ?? city.links.meetupEvents}>
								RSVP on Meetup
							</CtaLink>
							<CtaLink href={city.links.discord} variant="secondary">
								Join the Discord
							</CtaLink>
						</div>
					</div>
					<PhotoPlaceholder label="Meetup, full room, speaker up front" />
				</div>
			</Section>

			{/* Upcoming, from the synced Meetup data */}
			<Section tone="white">
				<SectionHeading eyebrow="Upcoming">Next meetup</SectionHeading>
				{upcoming.length === 0 ? (
					<div className="mt-10 border border-line bg-white p-8 md:p-12">
						<p className="font-sans text-[17px] font-medium leading-[1.55] text-ink">
							Nothing on the calendar right now. New meetups post to Meetup
							first.
						</p>
						<CtaLink href={city.links.meetupEvents} className="mt-7">
							Check Meetup
						</CtaLink>
					</div>
				) : (
					<ul className="mt-10 flex flex-col gap-6">
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
				<div className="mt-10">
					<ThreeUp items={steps} />
				</div>
			</Section>

			{/* Call for speakers */}
			<Section tone="dark">
				<SectionHeading eyebrow="Want to speak?" tone="paper">
					Give a talk.
				</SectionHeading>
				<p className="mt-8 max-w-[40rem] font-sans text-[19px] font-medium leading-[1.4] text-paper md:text-[22px]">
					Have something builders would find useful? Talks run 30 minutes to an
					hour. Send us your idea through Sessionize and we'll be in touch about
					a date.
				</p>
				<CtaLink href={city.links.sessionize} className="mt-10">
					Submit a talk
				</CtaLink>
			</Section>

			{/* Sponsors */}
			<Section>
				<SectionHeading eyebrow="Thank you">
					Sponsors and partners
				</SectionHeading>
				<div className="mt-12">
					<SponsorCarousel sponsors={sponsorsFor("meetup")} />
				</div>
			</Section>
		</>
	);
}
