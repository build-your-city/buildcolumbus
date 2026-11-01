import { createFileRoute, Link } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import EventCard from "@/components/EventCard";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import {
	bodyText,
	cardHeading,
	leadText,
	underlineLink,
} from "@/components/text";
import { nextEvent } from "@/lib/events";
import { pageHead } from "@/lib/headTags";
import { city } from "../config/city";
import { pages, site } from "../config/site";
import meetupPhoto from "../images/photos/hero-cbus.jpg";
import hackPhoto from "../images/photos/p-hack.jpg";
import heroPhoto from "../images/photos/p-meetup.jpg";
import servePhoto from "../images/photos/serve-cody-full.jpg";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => pageHead(site, pages.home),
});

const programs = [
	{
		title: city.programs.meetup,
		photo: meetupPhoto,
		alt: "Builders talking in a circle of chairs at a Build Columbus meetup.",
		body: "Once a month at Improving, our venue partner in Columbus. Talks, workshops, and time to meet other builders.",
		cta: "About the meetup",
		to: "/meetup",
	},
	{
		title: city.programs.serve,
		photo: servePhoto,
		alt: "A volunteer serving food at a local nonprofit.",
		body: "Volunteer with local nonprofits and see where your skill is needed.",
		cta: "About Serve",
		to: "/serve",
	},
	{
		title: city.programs.hack,
		photo: hackPhoto,
		alt: "Teams working together around tables at Hack Columbus.",
		body: "One day a year. Learn what local nonprofits are up against, pick a challenge, present an idea.",
		cta: "About Hack",
		to: "/hack",
	},
];

function HomePage() {
	const next = nextEvent(city.siteName);

	return (
		<>
			{/* Hero: text left, photo right filling the column */}
			<Section hero>
				<SplitBlock
					photo={{
						src: heroPhoto,
						alt: "A speaker presenting to a full room at a Build Columbus meetup at Improving.",
						priority: true,
						focal: "50% 60%",
					}}
				>
					<h1 className="font-display text-[52px] font-extrabold leading-[0.95] tracking-[-0.025em] text-ink sm:text-[84px] sm:leading-none">
						<span className="block">Use your skills.</span>
						<span className="block">Serve your city.</span>
					</h1>
					<p className={`mt-6 sm:mt-8 sm:max-w-[34rem] ${leadText} text-ink`}>
						A community of builders in Columbus using their skills to help local
						nonprofits. Developers, designers, content creators, and more. All
						are welcome.
					</p>
					{/* Phone only: the header button takes over from md up. */}
					<div className="mt-8 sm:mt-10 md:hidden">
						<CtaLink href={city.links.meetup}>Join on Meetup.com</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* Next meetup, from the synced Meetup data */}
			{next && (
				<Section>
					<h2 className="sr-only">Next meetup</h2>
					<EventCard event={next} details={city.meetupDetails} />
				</Section>
			)}

			{/* What we do */}
			<Section>
				<SectionHeading align="center">What we do</SectionHeading>
				{/*
				  Exactly three cards, so never two columns (that would leave one
				  alone on a row): three columns once each card can be at least
				  200px wide (a 39.5rem container), otherwise one. In one column
				  on a container wider than 35rem (560px: landscape phones), each
				  card turns sideways, photo left at 40% and text right, instead
				  of stretching full width. Rules in docs/DESIGN.md.
				*/}
				<div className="@container mt-6 sm:mt-10">
					<div className="grid grid-cols-1 gap-4 md:gap-8 @min-[39.5rem]:grid-cols-3">
						{programs.map((p) => (
							<article
								key={p.title}
								className="flex flex-col border border-line bg-white @min-[35rem]:@max-[39.5rem]:flex-row"
							>
								<img
									src={p.photo}
									alt={p.alt}
									className="aspect-[3/2] w-full object-cover @min-[35rem]:@max-[39.5rem]:aspect-auto @min-[35rem]:@max-[39.5rem]:w-2/5 @min-[35rem]:@max-[39.5rem]:shrink-0"
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
				</div>
			</Section>
		</>
	);
}
