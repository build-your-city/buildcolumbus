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
					"Columbus nonprofits do important work, often with very little help. Serve is how we pitch in.",
			},
		],
	}),
});

const steps = [
	{
		marker: "1",
		title: "Pick an opportunity",
		body: "We post volunteer days with local nonprofits in our Discord and share them at the monthly meetup.",
	},
	{
		marker: "2",
		title: "Show up and serve",
		body: "Anyone can do this part. Just come ready to help.",
	},
	{
		marker: "3",
		title: "See where you fit",
		body: "If you notice something your skills could fix, let us know. We'll bring it to the nonprofit and see if it can become a project.",
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
						alt: "A Build Columbus volunteer handing out food at a local nonprofit.",
						priority: true,
					}}
				>
					<SectionHeading as="h1">Serve</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							Columbus nonprofits do important work, often with very little
							help. Serve is how we pitch in.
						</p>
						<p className={`${leadText} text-ink`}>
							It starts with showing up. A nonprofit needs people to serve a
							meal, sort donations, or set up for an event, and we go do it.
						</p>
						<p className={`${leadText} text-ink`}>
							While you're there, you'll notice what they're missing. A website
							that's hard to use. No photos. No one to design a flyer. That's
							where your skills come in.
						</p>
					</div>
					<div className="mt-8 sm:mt-10">
						<CtaLink href={city.links.discord}>Join the Discord</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* Three steps */}
			<Section>
				<SectionHeading eyebrow="Three steps">How it works</SectionHeading>
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
					<p className={`mt-6 sm:mt-8 ${leadText} text-paper`}>
						Build Columbus is a community of developers, designers, content
						creators, and more who use their skills to help local nonprofits. If
						your organization has a problem a skill could solve, tell us about
						it.
					</p>
					<CtaLink href={`mailto:${city.email}`} className="mt-8 sm:mt-10">
						Get in touch
					</CtaLink>
				</div>
			</Section>
		</>
	);
}
