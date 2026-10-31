import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import SponsorGrid from "@/components/SponsorGrid";
import ThreeUp from "@/components/ThreeUp";
import {
	bodyText,
	leadText,
	smallHeading,
	underlineLink,
} from "@/components/text";
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

function HackPage() {
	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					photo={{
						src: heroPhoto,
						alt: "Teams working together around tables at #HACK Columbus.",
						priority: true,
					}}
				>
					<SectionHeading as="h1" eyebrow="Once a year">
						Hack
					</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							One day a year, builders from across Columbus learn about real
							needs in our city from the people who work on them every day.
						</p>
						<p className={`${leadText} text-ink`}>
							Then they pick a challenge and present an idea. Any skill. No code
							required.
						</p>
					</div>
					<div className="mt-8 sm:mt-10">
						<CtaLink href={city.links.meetup}>Get notified for 2027</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* 2026 recap */}
			<Section tone="white">
				<SplitBlock
					photoSide="left"
					photo={{
						src: winnersPhoto,
						alt: "The three crowd favorite winners smiling in front of the results screen at #HACK Columbus 2026.",
					}}
				>
					<SectionHeading eyebrow="2026 recap">
						{city.hackEventName}
					</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8">
						<p className={`${bodyText} text-ink`}>
							Saturday, October 24 at Leading EDJE, a software consultancy in
							Dublin, Ohio. Seven guest speakers, five challenge areas, and a
							full room from 8 AM to 8 PM.
						</p>
						<p className={`${bodyText} text-ink`}>
							Crowd favorite went to Jasmine Harris, Victoria Robertson, and
							Bryan Fernandez. Runner-up: Pedro and Nick.
						</p>
					</div>
				</SplitBlock>
			</Section>

			{/* How the day went */}
			<Section>
				<SectionHeading eyebrow="How the day went">
					Morning to evening
				</SectionHeading>
				<div className="mt-6 sm:mt-10">
					<ThreeUp items={hackSteps} />
				</div>
			</Section>

			{/* Challenge areas: one box with five cells on desktop, cards on mobile */}
			<Section tone="white">
				<div className="sm:mx-auto sm:max-w-[760px] sm:text-center">
					<SectionHeading eyebrow="2026 challenge areas">
						What we built around
					</SectionHeading>
					<p className={`mt-6 ${bodyText} text-ink`}>
						Five real needs in Columbus. Every project in the room answered one
						of them.
					</p>
				</div>
				<ul className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-5 md:gap-0 md:border md:border-line">
					{challengeAreas.map((area, i) => (
						<li
							key={area.title}
							className={`border border-line bg-white p-8 md:border-y-0 md:border-r-0 ${i === 0 ? "md:border-l-0" : ""}`}
						>
							<img
								src={area.icon}
								alt=""
								className="h-16 w-16"
								loading="lazy"
							/>
							<h3 className={`mt-6 ${smallHeading} text-ink`}>{area.title}</h3>
						</li>
					))}
				</ul>
			</Section>

			{/* Guest speakers */}
			<Section>
				<SectionHeading eyebrow="2026 guest speakers">
					Who we learned from
				</SectionHeading>
				<p className={`mt-6 ${bodyText} text-ink`}>
					If their work speaks to you, reach out. They know where help is
					needed.
				</p>
				<ul className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3 md:gap-8">
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
									<h3 className={`${smallHeading} text-ink`}>{p.name}</h3>
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
										className={`${underlineLink} text-ink`}
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
				<div className="mt-6 sm:mt-12">
					<SponsorGrid sponsors={sponsorsFor("hack")} />
				</div>
			</Section>
		</>
	);
}
