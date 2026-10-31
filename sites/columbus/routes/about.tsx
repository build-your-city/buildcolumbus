import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import SponsorCarousel from "@/components/SponsorCarousel";
import { city, sponsorsFor } from "../config/city";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{ title: `About | ${city.siteName}` },
			{
				name: "description",
				content:
					"A community of people who build solutions for Columbus nonprofits.",
			},
		],
	}),
});

const lead = "font-sans text-[22px] font-medium leading-[1.4] text-ink";
const underlineLink =
	"inline-block border-b-2 border-blue pb-0.5 font-sans text-base font-semibold text-ink no-underline transition-colors hover:text-blue-deep";

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
					<div className="mt-8 flex flex-col gap-5">
						<p className={lead}>
							Build Columbus is a community of people who build solutions:
							developers, designers, content creators, and anyone who can turn a
							need into something useful.
						</p>
						<p className={lead}>
							We meet once a month, volunteer with Columbus nonprofits, and hold
							a hackathon once a year.
						</p>
						<p className={lead}>
							What began in 2024 as a meetup for people in tech has grown into a
							place where any skill can help solve a real problem for a Columbus
							nonprofit. You don't need to know what you can offer yet. Come to
							a meetup and find out.
						</p>
					</div>
				</SplitBlock>
			</Section>

			{/* Organizers */}
			<Section tone="white">
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
								<a
									href={person.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className={`mt-5 ${underlineLink}`}
								>
									Connect on LinkedIn
								</a>
							</div>
						</li>
					))}
				</ul>
			</Section>

			{/* Sponsors: always on Paper */}
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
					Build your city.
				</SectionHeading>
				<div className="mt-8 flex max-w-[46rem] flex-col gap-6 font-sans text-[19px] font-medium leading-[1.4] text-paper md:text-[22px]">
					<p>
						Build Your City is a network of city communities where builders use
						their skills to serve local nonprofits. Every city runs a monthly
						Meetup, Serve alongside nonprofits, and a hackathon once a year.
						Columbus is the first.
					</p>
					<p>
						Each city has its own organizers, its own site, and its own
						nonprofits. What's shared is the name, the playbook, and the people
						who've already done it. If you want this where you live, the parent
						site is where to begin.
					</p>
				</div>
				<CtaLink href={city.links.parent} className="mt-10">
					{city.links.parent.replace(/^https?:\/\//, "")}
				</CtaLink>
			</Section>
		</>
	);
}
