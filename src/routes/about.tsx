import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "../components/CtaLink";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import SplitBlock from "../components/SplitBlock";
import SponsorCarousel from "../components/SponsorCarousel";
import { city, sponsorsFor } from "../config/city";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [{ title: `About | ${city.siteName}` }],
	}),
});

function AboutPage() {
	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					media={<PhotoPlaceholder label="Nathan and Cody at a meetup" />}
				>
					<SectionHeading as="h1" eyebrow={city.place}>
						About
					</SectionHeading>
					<p className="mt-8 font-sans text-[22px] font-medium leading-[1.4] text-ink">
						Build Columbus started in 2024 as Christians in Tech, a meetup for
						people who build things and want to use that for good. Same people,
						same mission, and a wider door. You don't need to be technical, and
						you don't need to know what you can offer yet.
					</p>
				</SplitBlock>
			</Section>

			{/* Organizers */}
			<Section>
				<SectionHeading eyebrow="Organizers">Who runs it</SectionHeading>
				<ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
					{city.organizers.map((person) => (
						<li
							key={person.name}
							className="flex flex-col gap-6 border border-line bg-white p-8 sm:flex-row sm:items-center sm:gap-8"
						>
							<img
								src={person.photo}
								alt={`${person.name} headshot`}
								className="h-[120px] w-[120px] shrink-0 rounded-full object-cover"
								loading="lazy"
							/>
							<div>
								<h3 className="font-display text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
									{person.name}
								</h3>
								<p className="mt-1 font-sans text-[15px] font-semibold text-ink">
									{person.role}
								</p>
								<p className="mt-3 font-sans text-[17px] font-medium leading-[1.55] text-ink">
									{person.body}
								</p>
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
					<SponsorCarousel sponsors={sponsorsFor("about")} />
				</div>
			</Section>

			{/* Parent network */}
			<Section tone="dark">
				<SectionHeading eyebrow="Part of Build Your City" tone="paper">
					One city of many.
				</SectionHeading>
				<p className="mt-8 max-w-[46rem] font-sans text-[22px] font-medium leading-[1.4] text-paper">
					Build Columbus is the first city in Build Your City. If you want to do
					this where you live, the parent site is where to start.
				</p>
				<CtaLink href={city.links.parent} className="mt-10">
					{city.links.parent.replace(/^https?:\/\//, "")}
				</CtaLink>
			</Section>
		</>
	);
}
