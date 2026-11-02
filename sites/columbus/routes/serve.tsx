import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import ThreeUp from "@/components/ThreeUp";
import { leadText } from "@/components/text";
import { pageHead } from "@/lib/headTags";
import { city } from "../config/city";
import { photos } from "../config/photos";
import { pages, site } from "../config/site";

export const Route = createFileRoute("/serve")({
	component: ServePage,
	head: () => pageHead(site, pages.serve),
});

const steps = [
	{
		marker: "1",
		title: "Pick an opportunity",
		body: "We post volunteer opportunities in our Discord and share them at the meetup.",
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
			<Section hero>
				<SplitBlock
					photo={{
						...photos.serve,
						alt: "A Build Columbus volunteer handing out food at a local nonprofit.",
						priority: true,
					}}
				>
					<SectionHeading as="h1">Serve</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							Local nonprofits do important work, often with limited resources.
							Serve is how we pitch in.
						</p>
						<p className={`${leadText} text-ink`}>
							It starts with showing up. When a nonprofit needs people to serve
							a meal, sort donations, or set up for an event, we're there to
							help.
						</p>
					</div>
					<div className="mt-8 sm:mt-10">
						<CtaLink href={city.links.discord}>Join the Discord</CtaLink>
					</div>
				</SplitBlock>
			</Section>

			{/* Three steps */}
			<Section>
				<SectionHeading
					align="center"
					intro="You'll spot where your skills could make a difference. A website that's hard to use. A flyer that needs designing. An event with no one to take photos. That's where you come in."
				>
					How it works
				</SectionHeading>
				<div className="mt-6 sm:mt-10">
					<ThreeUp items={steps} />
				</div>
			</Section>

			{/* For nonprofits */}
			<Section tone="dark" align="center">
				<SectionHeading tone="paper">Need builders?</SectionHeading>
				<p className={`mt-6 sm:mt-8 ${leadText} text-paper`}>
					Builders in our community want to help. If your nonprofit has a
					problem their skills could solve, tell us about it.
				</p>
				<CtaLink href={`mailto:${city.email}`} className="mt-8 sm:mt-10">
					Email us
				</CtaLink>
			</Section>
		</>
	);
}
