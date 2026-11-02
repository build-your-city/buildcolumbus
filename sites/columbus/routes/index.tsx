import { createFileRoute, Link } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import EventCard from "@/components/EventCard";
import { focalClass } from "@/components/focal";
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
import { photos } from "../config/photos";
import { pages, site } from "../config/site";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => pageHead(site, pages.home),
});

const programs = [
	{
		title: city.programs.meetup,
		photo: photos.meetupCircle,
		alt: "Builders talking in a circle of chairs at a Build Columbus meetup.",
		body: "Once a month at Improving, our host in Columbus. Talks, workshops, and time to connect with other builders.",
		cta: "About the meetup",
		to: "/meetup",
	},
	{
		title: city.programs.serve,
		photo: photos.serve,
		alt: "A volunteer serving food at a local nonprofit.",
		body: "Volunteer with local nonprofits and see where your skills are needed.",
		cta: "About Serve",
		to: "/serve",
	},
	{
		title: city.programs.hack,
		photo: photos.hack,
		alt: "Teams working together around tables at Hack Columbus.",
		body: "One day a year to work on real problems facing local nonprofits. Hear from the people doing the work, pick a challenge, and present your idea.",
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
						...photos.meetupTalk,
						alt: "A speaker presenting to a full room at a Build Columbus meetup at Improving.",
						priority: true,
					}}
				>
					<h1 className="font-display text-[52px] font-extrabold leading-[0.95] tracking-[-0.025em] text-ink sm:text-[84px] sm:leading-none">
						<span className="block">Use your skills.</span>
						<span className="block">Serve your city.</span>
					</h1>
					<p className={`mt-6 sm:mt-8 sm:max-w-[34rem] ${leadText} text-ink`}>
						Builders in Columbus using their skills to help local nonprofits.
						Developers, designers, content creators, and more. All are welcome.
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
				{/* As many 17rem-plus columns as fit: one on phones, three on desktop. */}
				<div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-4 sm:mt-10 md:gap-8">
					{programs.map((p) => (
						<article
							key={p.title}
							className="flex flex-col border border-line bg-white"
						>
							<img
								src={p.photo.src}
								alt={p.alt}
								className={`aspect-[3/2] w-full object-cover ${focalClass[p.photo.focal]}`}
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
