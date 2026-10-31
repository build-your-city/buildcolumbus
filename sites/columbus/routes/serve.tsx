import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import ThreeUp from "@/components/ThreeUp";
import { leadText } from "@/components/text";
import { city } from "../config/city";
import servePhoto from "../images/photos/serve-cody-full.jpg";

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
		body: "Opportunities are posted in our Discord and shared at the monthly meetup. Each one is with a Columbus nonprofit.",
	},
	{
		marker: "2",
		title: "Show up and serve",
		body: "Anyone can do this part. You're there to volunteer, not to pitch.",
	},
	{
		marker: "3",
		title: "See where you fit",
		body: "While you're there, you'll notice something a skill could fix. Tell us about it, and we'll see if it can become a project for our builders.",
	},
];

function ServePage() {
	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					photo={{
						src: servePhoto,
						alt: "A Build Columbus volunteer handing out food at a Columbus nonprofit.",
						priority: true,
					}}
				>
					<SectionHeading as="h1" eyebrow="Volunteer first">
						Serve
					</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							Volunteer with a Columbus nonprofit, helping with what they
							already do: serve a meal, sort donations, help run an event.
						</p>
						<p className={`${leadText} text-ink`}>
							While you're there, you'll see what they're missing: a website,
							photos, a designer, a content creator. That's where your skill
							comes in.
						</p>
					</div>
					<div className="mt-8 sm:mt-10">
						<CtaLink href={city.links.discord}>Join the Discord</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* Three steps */}
			<Section>
				<SectionHeading eyebrow="How it works">Three steps</SectionHeading>
				<div className="mt-6 sm:mt-10">
					<ThreeUp items={steps} />
				</div>
			</Section>

			{/* For nonprofits */}
			<Section tone="dark">
				<div className="sm:mx-auto sm:max-w-[760px] sm:text-center">
					<SectionHeading eyebrow="Nonprofits" tone="paper">
						Need builders?
					</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-paper`}>
							Build Columbus is a community of developers, designers, content
							creators, and more who want to put their skills to work for
							Columbus nonprofits.
						</p>
						<p className={`${leadText} text-paper`}>
							If your organization has a problem one of our builders could help
							with, tell us about it.
						</p>
					</div>
					<CtaLink href={`mailto:${city.email}`} className="mt-8 sm:mt-10">
						Get in touch
					</CtaLink>
				</div>
			</Section>
		</>
	);
}
