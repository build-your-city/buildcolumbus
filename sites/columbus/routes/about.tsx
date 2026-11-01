import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import { cardHeading, leadText, underlineLink } from "@/components/text";
import { pageHead } from "@/lib/headTags";
import { city } from "../config/city";
import { pages, site } from "../config/site";
import heroPhoto from "../images/photos/about-first-meetup.jpg";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => pageHead(site, pages.about),
});

function AboutPage() {
	return (
		<>
			{/* Page hero */}
			<Section hero>
				<SplitBlock
					photo={{
						src: heroPhoto,
						alt: "One of the first community meetups in 2024.",
						priority: true,
					}}
				>
					<SectionHeading as="h1">About</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							We started in 2024 as Christians in Tech - Columbus, a meetup for
							people of faith who work in tech. As we began serving nonprofits
							around the city, we met people from every background who wanted to
							help, and the work called for more than tech skills.
						</p>
						<p className={`${leadText} text-ink`}>
							The mission had outgrown the name, and in 2026 we became Build
							Columbus.
						</p>
					</div>
				</SplitBlock>
			</Section>

			{/* Organizers */}
			<Section>
				<SectionHeading align="center">Meet the organizers</SectionHeading>
				{/*
				  Exactly two cards, centered as a pair: two columns once each can
				  be at least 200px wide (a 26rem container), otherwise one. Each
				  card puts the photo beside the name only when the card itself
				  has room (21rem inside its padding); narrower, it stacks.
				  Rules in docs/DESIGN.md.
				*/}
				<div className="@container mt-6 sm:mt-10">
					<ul className="grid grid-cols-1 gap-4 md:gap-8 @min-[26rem]:grid-cols-2">
						{city.organizers.map((person) => (
							<li
								key={person.name}
								className="@container border border-line bg-white p-8"
							>
								<div className="flex flex-col items-center gap-6 text-center @min-[21rem]:flex-row @min-[21rem]:gap-8 @min-[21rem]:text-left">
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
				</div>
			</Section>

			{/* Parent network */}
			<Section tone="dark" align="center">
				<SectionHeading tone="paper">Build your city.</SectionHeading>
				<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
					<p className={`${leadText} text-paper`}>
						Build Columbus is the first city in Build Your City, a growing
						network of city communities. Want to build yours? Learn more at
						build-your-city.org.
					</p>
				</div>
				<CtaLink href={city.links.parent} className="mt-8 sm:mt-10">
					{city.links.parent.replace(/^https?:\/\//, "")}
				</CtaLink>
			</Section>
		</>
	);
}
