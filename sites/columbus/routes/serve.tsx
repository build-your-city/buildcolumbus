import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import ThreeUp from "@/components/ThreeUp";
import { city } from "../config/city";
// serve-cody-full.jpg (the uncropped version) was not in the repo yet;
// swap this import when it lands.
import servePhoto from "../images/photos/p-serve.jpg";

export const Route = createFileRoute("/serve")({
	component: ServePage,
	head: () => ({
		meta: [
			{ title: `Serve | ${city.siteName}` },
			{
				name: "description",
				content:
					"Volunteer with Columbus nonprofits, doing what they already do. The way to see where your skill is needed.",
			},
		],
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
		body: "While you're there, you'll notice something a skill could fix. Tell us about it, and we'll see if it can become a project.",
	},
];

const lead = "font-sans text-[22px] font-medium leading-[1.4] text-ink";

function ServePage() {
	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					media={
						<img
							src={servePhoto}
							alt="A Build Columbus volunteer handing out food at a Columbus nonprofit."
							className="h-auto w-full object-contain"
							fetchPriority="high"
						/>
					}
				>
					<SectionHeading as="h1" eyebrow="Volunteer first">
						Serve
					</SectionHeading>
					<div className="mt-8 flex flex-col gap-5">
						<p className={lead}>
							Volunteer with a Columbus nonprofit, helping with what they
							already do: serve a meal, sort donations, help run an event.
						</p>
						<p className={lead}>
							While you're there, you'll see what they're missing: a website,
							photos, a designer, a content creator. That's where your skill
							comes in.
						</p>
					</div>
					<div className="mt-10">
						<CtaLink href={city.links.discord}>Join the Discord</CtaLink>
					</div>
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
				<div className="mx-auto max-w-[760px] text-center">
					<SectionHeading eyebrow="Nonprofits" tone="paper">
						Need builders?
					</SectionHeading>
					<p className="mt-8 font-sans text-[19px] font-medium leading-[1.4] text-paper md:text-[22px]">
						Columbus nonprofit with a need? Whether it's extra hands at an event
						or a problem a skill could solve, tell us about it.
					</p>
					<CtaLink href={`mailto:${city.email}`} className="mt-10">
						Get in touch
					</CtaLink>
				</div>
			</Section>
		</>
	);
}
