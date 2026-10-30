import { createFileRoute, Link } from "@tanstack/react-router";
import CtaLink from "../components/CtaLink";
import EventCard from "../components/EventCard";
import Eyebrow from "../components/Eyebrow";
import Section from "../components/Section";
import { city } from "../config/city";
import heroPhoto from "../images/photos/hero-cbus.jpg";
import hackPhoto from "../images/photos/p-hack.jpg";
import meetupPhoto from "../images/photos/p-meetup.jpg";
import servePhoto from "../images/photos/p-serve.jpg";
import { nextEvent } from "../lib/events";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [{ title: city.siteName }],
	}),
});

const programs = [
	{
		title: city.programs.meetup,
		photo: meetupPhoto,
		alt: "A speaker presenting to a full room at a Build Columbus meetup.",
		body: "Once a month at Improving. Talks, workshops, and time to meet the people building things in Columbus.",
		cta: "About the meetup",
		to: "/meetup",
	},
	{
		title: city.programs.serve,
		photo: servePhoto,
		alt: "A volunteer serving food at a Columbus nonprofit.",
		body: "Volunteer with Columbus nonprofits, doing what they already do. The way to see where your skill is needed.",
		cta: "About Serve",
		to: "/serve",
	},
	{
		title: city.programs.hack,
		photo: hackPhoto,
		alt: "Teams working together around tables at #HACK Columbus.",
		body: "One day a year, part of the global #HACK movement with Indigitous. Hear a real need, pick a challenge, present an idea.",
		cta: "About Hack",
		to: "/hack",
	},
];

function HomePage() {
	const next = nextEvent();

	return (
		<>
			{/* Hero: text left, photo right at its natural aspect ratio */}
			<Section noBorder>
				<div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
					<div>
						<Eyebrow>{city.place}</Eyebrow>
						<h1 className="mt-5 font-display text-[52px] font-extrabold leading-none tracking-[-0.025em] text-ink md:text-[84px]">
							<span className="block">Use your skills.</span>
							<span className="block">Serve your city.</span>
						</h1>
						<p className="mt-8 max-w-[34rem] font-sans text-[22px] font-medium leading-[1.4] text-ink">
							Developers, designers, content creators, and more. All builders
							welcome to serve Columbus nonprofits.
						</p>
						<div className="mt-10 flex flex-wrap gap-4">
							<CtaLink href={next?.url ?? city.links.meetupEvents}>
								RSVP to the next meetup
							</CtaLink>
							<CtaLink href={city.links.discord} variant="secondary">
								Join the Discord
							</CtaLink>
						</div>
					</div>
					<img
						src={heroPhoto}
						alt="Builders talking in a circle of chairs at a Build Columbus meetup at Improving."
						className="h-auto w-full object-contain"
						fetchPriority="high"
					/>
				</div>
			</Section>

			{/* Next meetup, from the synced Meetup data */}
			{next && (
				<Section>
					<h2 className="sr-only">Next meetup</h2>
					<EventCard event={next} detail="full" />
				</Section>
			)}

			{/* What we do */}
			<Section>
				<h2 className="font-display text-[40px] font-extrabold leading-none tracking-[-0.025em] text-ink md:text-[56px]">
					What we do
				</h2>
				<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
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
								<h3 className="font-display text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
									{p.title}
								</h3>
								<p className="mt-3 flex-1 font-sans text-[17px] font-medium leading-[1.55] text-ink">
									{p.body}
								</p>
								<Link
									to={p.to}
									className="mt-6 self-start border-b-2 border-blue pb-1 font-sans text-base font-semibold text-ink no-underline transition-colors hover:text-blue-deep"
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
