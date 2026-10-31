import { createFileRoute } from "@tanstack/react-router";
import CtaLink from "@/components/CtaLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import SponsorGrid from "@/components/SponsorGrid";
import { cardHeading, leadText, underlineLink } from "@/components/text";
import { city, sponsorsFor } from "../config/city";
import heroPhoto from "../images/photos/about-first-meetup.jpg";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{ title: `About | ${city.siteName}` },
			{
				name: "description",
				content:
					"Build Columbus is a community of builders who use their skills to help local nonprofits. We meet once a month, volunteer with local nonprofits, and hold a hackathon once a year.",
			},
		],
	}),
});

function AboutPage() {
	return (
		<>
			{/* Page hero */}
			<Section noBorder>
				<SplitBlock
					photo={{
						src: heroPhoto,
						alt: "One of the first meetups in 2024",
						priority: true,
					}}
				>
					<SectionHeading as="h1">About</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-ink`}>
							Build Columbus is a community of builders who use their skills to
							help local nonprofits. Developers, designers, content creators,
							and anyone who can see a need and build something that helps.
						</p>
						<p className={`${leadText} text-ink`}>
							We meet once a month, volunteer with local nonprofits, and hold a
							hackathon once a year.
						</p>
						<p className={`${leadText} text-ink`}>
							We started in 2024 as Christians in Tech Columbus, a meetup for
							people of faith who work in tech. As we began serving nonprofits
							around the city, we met people from every background who wanted to
							help, and the work called for more than tech skills. The mission
							had outgrown the name, so in 2026 we became Build Columbus.
						</p>
					</div>
				</SplitBlock>
			</Section>

			{/* Organizers */}
			<Section tone="white">
				<SectionHeading eyebrow="Organizers">Who runs it</SectionHeading>
				<ul className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-2 md:gap-8">
					{city.organizers.map((person) => (
						<li
							key={person.name}
							className="flex flex-col items-center gap-6 border border-line bg-white p-8 text-center sm:flex-row sm:gap-8 sm:text-left"
						>
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
						</li>
					))}
				</ul>
			</Section>

			{/* Sponsors: always on Paper */}
			<Section>
				<SectionHeading eyebrow="Thank you">
					Sponsors and partners
				</SectionHeading>
				<div className="mt-6 sm:mt-12">
					<SponsorGrid sponsors={sponsorsFor("about")} />
				</div>
			</Section>

			{/* Parent network */}
			<Section tone="dark">
				<div className="sm:mx-auto sm:max-w-[760px] sm:text-center">
					<SectionHeading tone="paper">Build your city.</SectionHeading>
					<div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
						<p className={`${leadText} text-paper`}>
							Build Columbus is the first of many. Build Your City is a network
							of communities that each run a monthly meetup, volunteer with
							local nonprofits, and hold a hackathon once a year.
						</p>
						<p className={`${leadText} text-paper`}>
							Want to start one where you live? Learn more at
							build-your-city.org.
						</p>
					</div>
					<CtaLink href={city.links.parent} className="mt-8 sm:mt-10">
						{city.links.parent.replace(/^https?:\/\//, "")}
					</CtaLink>
				</div>
			</Section>
		</>
	);
}
