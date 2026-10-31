import { createFileRoute, Link } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import EventCard from "@/components/EventCard";
import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SplitBlock from "@/components/SplitBlock";
import {
	bodyText,
	cardHeading,
	leadText,
	underlineLink,
} from "@/components/text";
import { nextEvent } from "@/lib/events";
import { city } from "../config/city";
import meetupPhoto from "../images/photos/hero-cbus.jpg";
import hackPhoto from "../images/photos/p-hack.jpg";
import heroPhoto from "../images/photos/p-meetup.jpg";
import servePhoto from "../images/photos/serve-cody-full.jpg";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [
			{ title: city.siteName },
			{
				name: "description",
				content:
					"Developers, designers, content creators, and more. All builders welcome to serve Columbus nonprofits.",
			},
		],
	}),
});

const programs = [
	{
		title: city.programs.meetup,
		photo: meetupPhoto,
		alt: "Builders talking in a circle of chairs at a Build Columbus meetup.",
		body: "Once a month at Improving, our venue partner in Columbus. Talks, workshops, and time to meet the people building things in Columbus.",
		cta: "About the meetup",
		to: "/meetup",
	},
	{
		title: city.programs.serve,
		photo: servePhoto,
		alt: "A volunteer serving food at a Columbus nonprofit.",
		body: "Volunteer with Columbus nonprofits and see where your skill is needed.",
		cta: "About Serve",
		to: "/serve",
	},
	{
		title: city.programs.hack,
		photo: hackPhoto,
		alt: "Teams working together around tables at #HACK Columbus.",
		body: "One day a year. Learn what Columbus nonprofits are up against, pick a challenge, present an idea.",
		cta: "About Hack",
		to: "/hack",
	},
];

function HomePage() {
	const next = nextEvent(city.siteName);

	return (
		<>
			{/* Hero: text left, photo right filling the column */}
			<Section noBorder>
				<SplitBlock
					photo={{
						src: heroPhoto,
						alt: "A speaker presenting to a full room at a Build Columbus meetup at Improving.",
						priority: true,
						focal: "50% 60%",
					}}
				>
					<Eyebrow>{city.siteName}</Eyebrow>
					<h1 className="mt-5 font-display text-[52px] font-extrabold leading-[0.95] tracking-[-0.025em] text-ink sm:text-[84px] sm:leading-none">
						<span className="block">Use your skills.</span>
						<span className="block">Serve your city.</span>
					</h1>
					<p className={`mt-6 sm:mt-8 sm:max-w-[34rem] ${leadText} text-ink`}>
						Developers, designers, content creators, and more. All builders are
						welcome to serve Columbus nonprofits.
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
						<CtaLink href={next?.url ?? city.links.meetupEvents}>
							RSVP to the next meetup
						</CtaLink>
						<CtaLink href={city.links.discord} variant="secondary">
							Join the Discord
						</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* Next meetup, from the synced Meetup data */}
			{next && (
				<Section tone="white">
					<h2 className="sr-only">Next meetup</h2>
					<EventCard
						event={next}
						hours={city.meetupHours}
						where={`${city.venue.name}, ${city.venue.address}`}
						detail="full"
					/>
				</Section>
			)}

			{/* What we do */}
			<Section>
				<h2 className="font-display text-[36px] font-extrabold leading-none tracking-[-0.025em] text-ink sm:text-[56px]">
					What we do
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3 md:gap-8">
					{programs.map((p) => (
						<article
							key={p.title}
							className="flex flex-col border border-line bg-white"
						>
							<img
								src={p.photo}
								alt={p.alt}
								className="aspect-[3/2] w-full object-cover"
								loading="lazy"
							/>
							<div className="flex flex-1 flex-col p-8">
								<h3 className={`${cardHeading} text-ink`}>{p.title}</h3>
								<p className={`mt-3 flex-1 ${bodyText} text-ink`}>{p.body}</p>
								<Link
									to={p.to}
									className={`mt-6 self-start ${underlineLink} text-ink`}
								>
									{p.cta}
								</Link>
							</div>
						</article>
					))}
				</div>
			</Section>
		</>
	);
}
