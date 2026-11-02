import { createFileRoute } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import SponsorGrid from "@/components/SponsorGrid";
import {
	bodyText,
	cardHeading,
	leadText,
	smallHeading,
	underlineLink,
} from "@/components/text";
import { pageHead } from "@/lib/headTags";
import { city, sponsorsFor } from "../config/city";
import { photos } from "../config/photos";
import { pages, site } from "../config/site";
import { challengeAreas, speakers } from "../data/hack2026";

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
						...photos.hack,
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
							We start by hearing from people who tackle those problems every
							day. Then you pick a challenge, build an idea solo or with a team,
							and present it to everyone at the end.
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

			{/*
			  2026 recap: one band (one background) holding the winner,
			  challenge categories, speakers, and sponsors. The h2 opens the
			  band; each part below is an h3 set off by a divider.
			*/}
			<Section>
				<SectionHeading
					align="center"
					intro="Hack was held on Saturday, October 24, at Leading EDJE, a software consulting firm in Dublin, Ohio. Seven guest speakers, five challenge categories, and a room full of builders working from 8 AM to 8 PM."
				>
					Hack 2026 Recap
				</SectionHeading>

				{/* Crowd Favorite: the whole 4:3 photo, about two challenge cards wide on desktop */}
				<RecapSubsection
					title="Crowd Favorite"
					intro="Jasmine Harris, Victoria Robertson, and Bryan Fernandez, for their project on homelessness with The Bridge Ministry."
				>
					<img
						src={photos.hackWinners.src}
						alt="The three crowd favorite winners smiling in front of the results screen at Hack Columbus 2026."
						className="mx-auto aspect-[4/3] w-full max-w-lg object-cover"
						loading="lazy"
					/>
				</RecapSubsection>

				{/* Challenge categories: one box with five cells on desktop, cards on mobile */}
				<RecapSubsection
					title="Challenge categories"
					intro="Every project took on a real challenge from one of these five."
				>
					{/* One box with five cells once the list is 64rem wide (desktop);
					    narrower, icon-and-title cards in as many columns as fit. */}
					<div className="@container">
						<ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-3 sm:gap-4 @5xl:grid-cols-5 @5xl:gap-0 @5xl:border @5xl:border-line">
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
									<h4 className={`${smallHeading} text-ink @5xl:mt-6`}>
										{area.title}
									</h4>
								</li>
							))}
						</ul>
					</div>
				</RecapSubsection>

				{/* Guest speakers */}
				<RecapSubsection
					title="Who we learned from"
					intro="Each speaker shared challenges from their own work. If one caught your attention, reach out to them. They know where volunteers are needed most."
				>
					{/*
					  Cards at least 17rem wide: one column on portrait phones, two
					  from about 560px (landscape phones, tablets), three on desktop.
					  Card content is centered until the cards are three across (a
					  55rem container: 3 x 17rem + 2 x 32px gap), then left-aligned.
					*/}
					<div className="@container">
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
											<h4 className={`${smallHeading} text-ink`}>{p.name}</h4>
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
				</RecapSubsection>

				{/* Sponsors */}
				<RecapSubsection
					title="Sponsors"
					intro="Thank you to the sponsors who made the day possible."
				>
					<SponsorGrid sponsors={sponsorsFor("hack")} />
				</RecapSubsection>
			</Section>
		</>
	);
}

/**
 * One part of the recap (challenges, speakers, sponsors): a thin Line
 * divider with extra space above and below, then a centered h3 and intro.
 * The recap is one band, so subsections are set apart by the divider
 * rather than by alternating backgrounds.
 */
function RecapSubsection({
	title,
	intro,
	children,
}: {
	title: string;
	intro: string;
	children: ReactNode;
}) {
	return (
		<div className="mt-6 border-t border-line pt-6 sm:mt-9 sm:pt-9">
			<div className="text-center">
				<h3 className={`${cardHeading} text-ink`}>{title}</h3>
				<p
					className={`mx-auto mt-4 max-w-[36rem] text-balance ${bodyText} text-ink`}
				>
					{intro}
				</p>
			</div>
			<div className="mt-6 sm:mt-10">{children}</div>
		</div>
	);
}
