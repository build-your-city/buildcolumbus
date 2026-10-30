import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "../components/CtaLink";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import SplitBlock from "../components/SplitBlock";
import ThreeUp from "../components/ThreeUp";
import { city } from "../config/city";

export const Route = createFileRoute("/serve")({
	component: ServePage,
	head: () => ({
		meta: [{ title: `Serve | ${city.siteName}` }],
	}),
});

const steps = [
	{
		marker: "1",
		title: "Pick an opportunity",
		body: "Opportunities are shared in our Discord and at the monthly meetup. Each one is with a Columbus nonprofit, doing what they do.",
	},
	{
		marker: "2",
		title: "Show up and serve",
		body: "Anyone can do this part. You're there as a volunteer first.",
	},
	{
		marker: "3",
		title: "See where you fit",
		body: "You'll notice what they're missing. Tell us, and we'll help turn it into a project.",
	},
];

function ServePage() {
	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					media={
						<PhotoPlaceholder label="Serve day with a Columbus nonprofit (wide)" />
					}
				>
					<SectionHeading as="h1" eyebrow="With Columbus nonprofits">
						Serve
					</SectionHeading>
					<p className="mt-8 font-sans text-[22px] font-medium leading-[1.4] text-ink">
						Show up with a Columbus nonprofit in the work they already do. Serve
						a meal, sort donations, help run an event. While you're there,
						you'll see what they need: a website, photos, a designer, a content
						creator. That's where your skill comes in.
					</p>
					<div className="mt-10">
						<CtaLink href={city.links.discord}>Join the Discord</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* Why it works this way */}
			<Section>
				<SplitBlock
					mediaSide="left"
					media={
						<PhotoPlaceholder label="Builders and nonprofit staff together" />
					}
				>
					<SectionHeading eyebrow="Why it works this way">
						Serve first. Build second.
					</SectionHeading>
					<p className="mt-8 font-sans text-[17px] font-medium leading-[1.55] text-ink">
						Nobody knows what a nonprofit needs better than the people who work
						there, and nobody learns it faster than someone standing next to
						them. Projects come after, once you've seen the need yourself.
					</p>
				</SplitBlock>
			</Section>

			{/* Three steps */}
			<Section>
				<SectionHeading eyebrow="How it works">Three steps</SectionHeading>
				<div className="mt-10">
					<ThreeUp items={steps} />
				</div>
			</Section>

			{/* For nonprofits */}
			<Section tone="dark">
				<SectionHeading eyebrow="Nonprofits" tone="paper">
					Need builders?
				</SectionHeading>
				<p className="mt-8 max-w-[46rem] font-sans text-[22px] font-medium leading-[1.4] text-paper">
					If you run a Columbus nonprofit and could use a group of volunteers,
					or help with something a skill could solve, tell us about it.
				</p>
				<CtaLink href={`mailto:${city.email}`} className="mt-10">
					Get in touch
				</CtaLink>
			</Section>
		</>
	);
}
