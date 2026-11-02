import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import { focalClass } from "@/components/focal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import {
	bodyText,
	cardHeading,
	leadText,
	underlineLink,
} from "@/components/text";
import { pageHead } from "@/lib/headTags";
import { parent } from "../../build-your-city/config";
import { city } from "../config/city";
import { photos } from "../config/photos";
import { pages, site } from "../config/site";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => pageHead(site, pages.about),
});

function AboutPage() {
	return (
		<>
			{/*
			  One opening section. From a 56rem container, the same point and
			  the same photo column as SplitBlock on the other pages (55% of the
			  width after its 56px gap), the photo floats right, level with the
			  title, and the story wraps under it. Narrower, the float is off and the column is a flex
			  stack ordered title, intro, photo, story. The photo comes first in
			  the source so it can float from the top.
			*/}
			<Section hero>
				<div className="@container">
					<div className="flex flex-col @4xl:flow-root">
						<img
							src={photos.aboutFirstMeetup.src}
							alt="One of the first community meetups in 2024."
							className={`order-3 mt-8 aspect-[4/3] w-full object-cover ${focalClass[photos.aboutFirstMeetup.focal]} @4xl:float-right @4xl:mt-0 @4xl:mb-8 @4xl:ml-14 @4xl:w-[calc((100%-3.5rem)*0.55)]`}
							fetchPriority="high"
						/>
						<SectionHeading as="h1" className="order-1">
							About
						</SectionHeading>
						<p className={`order-2 mt-6 sm:mt-8 ${leadText} text-ink`}>
							Builders using their skills to serve Columbus nonprofits since
							2024.
						</p>
						<div className="order-4 mt-4 sm:mt-5">
							<p className={`mt-4 sm:mt-5 ${bodyText} text-ink`}>
								We started as Christians in Tech, a meetup for people of faith
								who work in tech.
							</p>
							<p className={`mt-4 sm:mt-5 ${bodyText} text-ink`}>
								We had a simple goal: put our skills to work for local
								nonprofits. They do important work with limited resources, and
								many don't have the time or budget for things like a website,
								design, photos, or video.
							</p>
							<p className={`mt-4 sm:mt-5 ${bodyText} text-ink`}>
								So we started showing up. We served alongside nonprofits around
								Columbus, and in 2025 we held our first hackathon, a full day
								spent on real problems they face.
							</p>
							<p className={`mt-4 sm:mt-5 ${bodyText} text-ink`}>
								As we grew, people from every background joined in, bringing
								skills well beyond tech. Our name no longer reflected everyone
								in the room or the work we were doing together. So in 2026, we
								became Build Columbus.
							</p>
							{/* Closing line: semibold, below the photo if it reaches this far. */}
							<p className={`clear-both mt-4 sm:mt-5 ${bodyText} text-ink`}>
								<strong className="font-semibold">
									Same mission. More builders.
								</strong>
							</p>
						</div>
					</div>
				</div>
			</Section>

			{/* Organizers */}
			<Section>
				<SectionHeading align="center">Meet the organizers</SectionHeading>
				{/*
				  Cards at least 16rem wide: one column on portrait phones, two
				  everywhere wider. Each card is centered with the photo above the
				  name when it is narrow, and puts the photo beside the name,
				  left-aligned, once it has room (22rem inside its padding).
				*/}
				<ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-4 sm:mt-10 md:gap-8">
					{city.organizers.map((person) => (
						<li
							key={person.name}
							className="@container border border-line bg-white p-8"
						>
							<div className="flex flex-col items-center gap-6 text-center @min-[22rem]:flex-row @min-[22rem]:items-center @min-[22rem]:gap-8 @min-[22rem]:text-left">
								<img
									src={person.photo}
									alt={`${person.name} headshot`}
									className="h-[120px] w-[120px] shrink-0 rounded-full object-cover"
									loading="lazy"
								/>
								<div>
									<h3 className={`${cardHeading} text-ink`}>{person.name}</h3>
									<p className="mt-1 font-sans text-[15px] font-semibold text-ink">
										{person.role}
									</p>
									<a
										href={person.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className={`mt-5 ${underlineLink} text-ink`}
									>
										Connect on LinkedIn
									</a>
								</div>
							</div>
						</li>
					))}
				</ul>
			</Section>

			{/* Parent network */}
			<Section tone="dark" align="center">
				<SectionHeading tone="paper">Build your city.</SectionHeading>
				<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
					<p className={`${leadText} text-paper`}>
						Columbus is the first of many. Build Your City is a growing network
						of builders serving local nonprofits. Want this where you live?
					</p>
				</div>
				{/* Same mailto as the build-your-city.org "Want this where you live?" link. */}
				<CtaLink
					href={`mailto:${parent.email}?subject=${encodeURIComponent(parent.emailSubject)}`}
					className="mt-8 sm:mt-10"
				>
					Email us
				</CtaLink>
			</Section>
		</>
	);
}
