import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import SponsorGrid from "@/components/SponsorGrid";
import {
	bodyText,
	leadText,
	smallHeading,
	underlineLink,
} from "@/components/text";
import { pageHead } from "@/lib/headTags";
import { city, sponsorsFor } from "../config/city";
import { pages, site } from "../config/site";
import { challengeAreas, speakers } from "../data/hack2026";
import winnersPhoto from "../images/photos/h-winners.jpg";
import heroPhoto from "../images/photos/p-hack.jpg";

export const Route = createFileRoute("/hack")({
	component: HackPage,
	head: () => pageHead(site, pages.hack),
});

function HackPage() {
	return (
		<>
			{/* Page hero */}
			<Section hero>
				<SplitBlock
					photo={{
						src: heroPhoto,
						alt: "Teams working together around tables at Hack Columbus.",
						priority: true,
					}}
				>
					<SectionHeading as="h1">Hack</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							Once a year, we spend a day working on real problems in our city.
						</p>
						<p className={`${leadText} text-ink`}>
							We start by hearing from people who work on those problems every
							day. Then you pick a challenge, work on an idea solo or with a
							team, and present it to everyone at the end.
						</p>
						<p className={`${leadText} text-ink`}>
							Any skill is welcome. No code required.
						</p>
					</div>
					<div className="mt-8 sm:mt-10">
						<CtaLink href={city.links.meetup}>Get notified for 2027</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* 2026 recap */}
			<Section>
				<SplitBlock
					stackedPhoto="full"
					photoSide="left"
					photo={{
						src: winnersPhoto,
						alt: "The three crowd favorite winners smiling in front of the results screen at Hack Columbus 2026.",
					}}
				>
					<SectionHeading>{city.hackEventName}</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8">
						<p className={`${bodyText} text-ink`}>
							{city.hackEventName} was Saturday, October 24 at Leading EDJE, a
							software consulting firm in Dublin, Ohio. Seven guest speakers,
							five challenge areas, and a room full of builders working from 8
							AM to 8 PM.
						</p>
						<p className={`${bodyText} text-ink`}>
							Crowd favorite for the day went to Jasmine Harris, Victoria
							Robertson, and Bryan Fernandez.
						</p>
					</div>
				</SplitBlock>
			</Section>

			{/* Challenge areas: one box with five cells on desktop, cards on mobile */}
			<Section>
				<SectionHeading
					align="center"
					intro="Five real needs in Columbus. Every project in the room answered one of them."
				>
					What we built around
				</SectionHeading>
				{/* One box with five cells once the list is 64rem wide (desktop);
				    narrower, icon-and-title cards in as many columns as fit. */}
				<div className="@container">
					<ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-3 sm:mt-10 sm:gap-4 @5xl:grid-cols-5 @5xl:gap-0 @5xl:border @5xl:border-line">
						{challengeAreas.map((area, i) => (
							<li
								key={area.title}
								className={`flex items-center gap-4 border border-line bg-white p-4 @5xl:block @5xl:border-y-0 @5xl:border-r-0 @5xl:p-8 ${i === 0 ? "@5xl:border-l-0" : ""}`}
							>
								<img
									src={area.icon}
									alt=""
									className="h-12 w-12 shrink-0 @5xl:h-16 @5xl:w-16"
									loading="lazy"
								/>
								<h3 className={`${smallHeading} text-ink @5xl:mt-6`}>
									{area.title}
								</h3>
							</li>
						))}
					</ul>
				</div>
			</Section>

			{/* Guest speakers */}
			<Section>
				<SectionHeading
					align="center"
					intro="If their work speaks to you, reach out. They know where help is needed."
				>
					Who we learned from
				</SectionHeading>
				{/*
				  Cards at least 17rem wide: one column on portrait phones, two
				  from about 560px (landscape phones, tablets), three on desktop.
				  Card content is centered until the cards are three across (a
				  55rem container: 3 x 17rem + 2 x 32px gap), then left-aligned.
				*/}
				<div className="@container mt-6 sm:mt-10">
					<ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-4 md:gap-8">
						{speakers.map((s) => (
							<li
								key={s.people.map((p) => p.name).join(" & ")}
								className="flex flex-col items-center border border-line bg-white p-8 text-center @min-[55rem]:items-start @min-[55rem]:text-left"
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
								<p className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-blue-text">
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
								<div className="mt-auto flex flex-col items-center gap-3 pt-6 @min-[55rem]:items-start">
									{s.links.map((l) => (
										<a
											key={l.href}
											href={l.href}
											target="_blank"
											rel="noopener noreferrer"
											className={`${underlineLink} text-ink`}
										>
											{l.labelParts
												? l.labelParts.map((part, i) => (
														<Fragment key={part}>
															{i > 0 && <wbr />}
															{part}
														</Fragment>
													))
												: l.label}
										</a>
									))}
								</div>
							</li>
						))}
					</ul>
				</div>
			</Section>

			{/* Sponsors */}
			<Section>
				<SectionHeading align="center">Sponsors and partners</SectionHeading>
				<div className="mt-6 sm:mt-12">
					<SponsorGrid sponsors={sponsorsFor("hack")} />
				</div>
			</Section>
		</>
	);
}
