import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";
import Eyebrow from "@/components/Eyebrow";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SplitBlock from "@/components/SplitBlock";
import Wordmark from "@/components/Wordmark";
import { nextEvent } from "@/lib/events";
import { cities, parent } from "./config";

const navLink =
	"font-sans text-base font-semibold text-paper no-underline transition-colors hover:text-blue";
const footerLink =
	"font-sans text-base font-medium text-slate no-underline transition-colors hover:text-paper";
const footerHeading =
	"mb-5 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-paper";
const lead = "font-sans text-[22px] font-medium leading-[1.4]";
const darkLead =
	"font-sans text-[19px] font-medium leading-[1.4] md:text-[22px]";
const body = "font-sans text-[17px] font-medium leading-[1.55] text-ink";

const ET = "America/New_York";

/** "Saturday, November 14" from the synced Columbus meetup data. */
function nextColumbusMeetup(): string | null {
	const next = nextEvent(cities[0].siteName);
	if (!next) return null;
	return next.date.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		timeZone: ET,
	});
}

export default function App() {
	const nextMeetup = nextColumbusMeetup();

	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b border-white/8 bg-ink-deep text-paper">
				<Container className="flex items-center justify-between py-6">
					<a href="/" className="no-underline">
						<Wordmark
							top={parent.wordmark.top}
							bottom={parent.wordmark.bottom}
							tone="paper"
							className="text-[28px] md:text-[34px]"
						/>
					</a>
					<nav
						aria-label="Primary"
						className="flex items-center gap-5 md:gap-8"
					>
						<a
							href={cities[0].href}
							target="_blank"
							rel="noopener noreferrer"
							className={navLink}
						>
							Columbus
						</a>
						<a href="#build" className={`${navLink} hidden sm:inline`}>
							Build your city
						</a>
						<CtaLink href={`mailto:${parent.email}`} className="ml-2">
							Contact
						</CtaLink>
					</nav>
				</Container>
			</header>

			<main className="flex-1">
				{/* Hero */}
				<Section noBorder>
					<SplitBlock
						media={
							<PhotoPlaceholder label="Builders working alongside a nonprofit" />
						}
					>
						<Eyebrow>{parent.siteName}</Eyebrow>
						<h1 className="mt-5 font-display text-[52px] font-extrabold leading-none tracking-[-0.025em] text-ink md:text-[84px]">
							<span className="block">Use your skills.</span>
							<span className="block">Serve your city.</span>
						</h1>
						<p className={`mt-8 max-w-[34rem] ${lead} text-ink`}>
							Developers, designers, content creators, and more. Local
							communities of builders serving the nonprofits where they live.
						</p>
						<div className="mt-10 flex flex-wrap gap-4">
							<CtaLink href="#cities">Find your city</CtaLink>
							<CtaLink href="#build" variant="secondary">
								Build your city
							</CtaLink>
						</div>
					</SplitBlock>
				</Section>

				{/* Cities */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: static anchor for the nav and hero buttons */}
				<Section id="cities" tone="white">
					<SectionHeading eyebrow="Cities">Where we're building</SectionHeading>
					<ul className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,725px)]">
						{cities.map((c) => (
							<li
								key={c.id}
								className="grid grid-cols-1 border border-line bg-white sm:grid-cols-[45%_1fr]"
							>
								<PhotoPlaceholder
									label={c.photoLabel}
									className="h-full border-0 border-b border-line sm:aspect-auto sm:border-r sm:border-b-0"
								/>
								<div className="flex flex-col p-8">
									<Wordmark
										top={c.wordmark.top}
										bottom={c.wordmark.bottom}
										className="text-[34px]"
									/>
									<p className={`mt-5 ${body}`}>
										<strong className="font-semibold">{c.place}</strong>{" "}
										{c.body}
										{c.id === "columbus" && nextMeetup
											? ` Next meetup ${nextMeetup}.`
											: ""}
									</p>
									<a
										href={c.href}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-6 self-start border-b-2 border-blue pb-0.5 font-sans text-base font-semibold text-ink no-underline transition-colors hover:text-blue-deep"
									>
										Visit {c.domain}
									</a>
								</div>
							</li>
						))}
					</ul>
				</Section>

				{/* The idea */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: static anchor for the nav and hero buttons */}
				<Section id="build" tone="dark">
					<SectionHeading eyebrow="Build Your City" tone="paper">
						That's not a slogan. It's the whole idea.
					</SectionHeading>
					<div
						className={`mt-8 flex max-w-[52rem] flex-col gap-6 ${darkLead} text-paper`}
					>
						<p>
							Take what you're good at, whether that's code, design,
							photography, content, organizing, or something else, and put it to
							work for the nonprofits in your city. Find an organization that
							needs help. Work with them to solve a real problem. That's how a
							city gets built.
						</p>
						<p>
							Build Columbus is where it started. If you want to do this where
							you live, reach out and we'll help you get going.
						</p>
					</div>
					<CtaLink href={`mailto:${parent.email}`} className="mt-10">
						Get in touch
					</CtaLink>
				</Section>
			</main>

			<footer className="border-t border-white/8 bg-ink-deep text-paper">
				<Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10 md:py-24">
					<div>
						<Wordmark
							top={parent.wordmark.top}
							bottom={parent.wordmark.bottom}
							tone="paper"
							className="text-[40px]"
						/>
						<p className="mt-5 max-w-xs font-sans text-base font-medium leading-[1.55] text-slate">
							{parent.tagline}
						</p>
					</div>
					<nav aria-label="Cities">
						<p className={footerHeading}>Cities</p>
						<ul className="flex flex-col gap-3">
							{cities.map((c) => (
								<li key={c.id}>
									<a
										href={c.href}
										target="_blank"
										rel="noopener noreferrer"
										className={footerLink}
									>
										{c.wordmark.bottom}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<nav aria-label="Connect">
						<p className={footerHeading}>Connect</p>
						<ul className="flex flex-col gap-3">
							<li>
								<a
									href={parent.links.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className={footerLink}
								>
									Instagram
								</a>
							</li>
							<li>
								<a
									href={parent.links.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className={footerLink}
								>
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href={parent.links.meetup}
									target="_blank"
									rel="noopener noreferrer"
									className={footerLink}
								>
									Meetup
								</a>
							</li>
						</ul>
					</nav>
					<nav aria-label="Contact">
						<p className={footerHeading}>Contact</p>
						<ul className="flex flex-col gap-3">
							<li>
								<a href={`mailto:${parent.email}`} className={footerLink}>
									{parent.email}
								</a>
							</li>
						</ul>
					</nav>
				</Container>
			</footer>
		</div>
	);
}
