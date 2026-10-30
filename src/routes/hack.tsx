import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "../components/CtaLink";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import SplitBlock from "../components/SplitBlock";
import SponsorCarousel from "../components/SponsorCarousel";
import ThreeUp from "../components/ThreeUp";
import { city, sponsorsFor } from "../config/city";
import { challengeAreas, hackSteps, speakers } from "../data/hack2026";
import winnersPhoto from "../images/photos/h-winners.jpg";

export const Route = createFileRoute("/hack")({
	component: HackPage,
	head: () => ({
		meta: [{ title: `Hack | ${city.siteName}` }],
	}),
});

const bodyText = "font-sans text-[17px] font-medium leading-[1.55] text-ink";
const underlineLink =
	"self-start border-b-2 border-blue pb-0.5 font-sans text-base font-semibold text-ink no-underline transition-colors hover:text-blue-deep";

function HackPage() {
	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					media={<PhotoPlaceholder label="#HACK Columbus, full room" />}
				>
					<SectionHeading as="h1" eyebrow="With Indigitous · Once a year">
						Hack
					</SectionHeading>
					<p className="mt-8 font-sans text-[22px] font-medium leading-[1.4] text-ink">
						One day a year, part of the global #HACK movement with our partner
						Indigitous. Builders from across Columbus hear real needs from the
						people who work on them, pick a challenge, and present an idea. Any
						skill. No code required.
					</p>
					<div className="mt-10">
						<CtaLink href={city.links.meetup}>Get notified for 2027</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* 2026 recap */}
			<Section>
				<SplitBlock
					mediaSide="left"
					media={
						<img
							src={winnersPhoto}
							alt="The three crowd favorite winners smiling in front of the results screen at #HACK Columbus 2026."
							className="h-auto w-full object-contain"
							loading="lazy"
						/>
					}
				>
					<SectionHeading eyebrow="2026 recap">
						{city.hackEventName}
					</SectionHeading>
					<p className={`mt-8 ${bodyText}`}>
						Saturday, October 24 at Leading EDJE in Dublin. Six guest speakers,
						five challenge areas, and a full room from 8 AM to 8 PM. Crowd
						favorite went to Jasmine Harris, Victoria Robertson, and Bryan
						Fernandez. Runner-up: Pedro and Nick.
					</p>
				</SplitBlock>
			</Section>

			{/* How the day went */}
			<Section>
				<SectionHeading eyebrow="How the day went">
					Morning to evening
				</SectionHeading>
				<div className="mt-10">
					<ThreeUp items={hackSteps} />
				</div>
			</Section>

			{/* Challenge areas: one box, five cells */}
			<Section>
				<SectionHeading eyebrow="2026 challenge areas">
					What we built around
				</SectionHeading>
				<p className={`mt-6 ${bodyText}`}>
					Five real needs in Columbus. Every project in the room answered one of
					them.
				</p>
				<ul className="mt-10 grid grid-cols-1 border border-line bg-white sm:grid-cols-2 md:grid-cols-5">
					{challengeAreas.map((area, i) => (
						<li
							key={area.title}
							className={`p-8 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""} ${i % 2 === 1 ? "sm:border-l md:border-l" : ""}`}
						>
							<img
								src={area.icon}
								alt=""
								className="h-16 w-16"
								loading="lazy"
							/>
							<h3 className="mt-6 font-display text-[22px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
								{area.title}
							</h3>
						</li>
					))}
				</ul>
			</Section>

			{/* Guest speakers */}
			<Section>
				<SectionHeading eyebrow="2026 guest speakers">
					Who we learned from
				</SectionHeading>
				<p className={`mt-6 ${bodyText}`}>
					If their work speaks to you, reach out. They know where help is
					needed.
				</p>
				<ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
					{speakers.map((s) => (
						<li
							key={s.name}
							className="flex flex-col border border-line bg-white p-8"
						>
							<img
								src={s.photo}
								alt={`${s.name} headshot`}
								className="h-24 w-24 rounded-full object-cover"
								loading="lazy"
							/>
							<p className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-blue">
								{s.area}
							</p>
							<h3 className="mt-2 font-display text-[22px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
								{s.name}
							</h3>
							<p className="mt-1 font-sans text-[15px] font-semibold text-ink">
								{s.org}
							</p>
							<p className={`mt-4 flex-1 ${bodyText}`}>{s.body}</p>
							<a
								href={s.link.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`mt-6 ${underlineLink}`}
							>
								{s.link.label}
							</a>
						</li>
					))}
				</ul>
			</Section>

			{/* Sponsors */}
			<Section>
				<SectionHeading eyebrow="Thank you">
					Sponsors and partners
				</SectionHeading>
				<div className="mt-12">
					<SponsorCarousel sponsors={sponsorsFor("hack")} />
				</div>
			</Section>
		</>
	);
}
