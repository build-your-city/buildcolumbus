import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import SponsorCarousel from "@/components/SponsorCarousel";
import ThreeUp from "@/components/ThreeUp";
import { city, sponsorsFor } from "../config/city";
import { challengeAreas, hackSteps, speakers } from "../data/hack2026";
import winnersPhoto from "../images/photos/h-winners.jpg";
import heroPhoto from "../images/photos/p-hack.jpg";

export const Route = createFileRoute("/hack")({
	component: HackPage,
	head: () => ({
		meta: [
			{ title: `Hack | ${city.siteName}` },
			{
				name: "description",
				content:
					"One day a year. Hear a real need, pick a challenge, present an idea.",
			},
		],
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
					media={
						<img
							src={heroPhoto}
							alt="Teams working together around tables at #HACK Columbus."
							className="h-auto w-full object-contain"
							fetchPriority="high"
						/>
					}
				>
					<SectionHeading as="h1" eyebrow="Once a year">
						Hack
					</SectionHeading>
					<p className="mt-8 font-sans text-[22px] font-medium leading-[1.4] text-ink">
						One day a year, builders from across Columbus learn about the real
						needs facing our city from the people who work on them every day,
						pick a challenge, and present an idea. Any skill. No code required.
					</p>
					<div className="mt-10">
						<CtaLink href={city.links.meetup}>Get notified for 2027</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* 2026 recap */}
			<Section tone="white">
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
						Saturday, October 24 at Leading EDJE in Dublin. Seven guest
						speakers, five challenge areas, and a full room from 8 AM to 8 PM.
						Crowd favorite went to Jasmine Harris, Victoria Robertson, and Bryan
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
			<Section tone="white">
				<div className="mx-auto max-w-[760px] text-center">
					<SectionHeading eyebrow="2026 challenge areas">
						What we built around
					</SectionHeading>
					<p className={`mt-6 ${bodyText}`}>
						Five real needs in Columbus. Every project in the room answered one
						of them.
					</p>
				</div>
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
							key={s.people.map((p) => p.name).join(" & ")}
							className="flex flex-col border border-line bg-white p-8"
						>
							<div className="flex gap-4">
								{s.people.map((p) => (
									<img
										key={p.name}
										src={p.photo}
										alt={`${p.name} headshot`}
										className="h-24 w-24 rounded-full object-cover"
										loading="lazy"
									/>
								))}
							</div>
							<p className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-blue">
								{s.area}
							</p>
							{s.people.map((p, i) => (
								<div key={p.name} className={i === 0 ? "mt-2" : "mt-4"}>
									<h3 className="font-display text-[22px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
										{p.name}
									</h3>
									<p className="mt-1 font-sans text-[15px] font-semibold text-ink">
										{p.title}
									</p>
								</div>
							))}
							{s.org && (
								<p className="mt-2 font-sans text-[15px] font-medium text-ink">
									{s.org}
								</p>
							)}
							<div className="mt-auto flex flex-col items-start gap-3 pt-6">
								{s.links.map((l) => (
									<a
										key={l.href}
										href={l.href}
										target="_blank"
										rel="noopener noreferrer"
										className={underlineLink}
									>
										{l.label}
									</a>
								))}
							</div>
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
