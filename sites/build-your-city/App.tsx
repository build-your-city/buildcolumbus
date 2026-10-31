import CtaLink from "@/components/CtaLink";
import Wordmark from "@/components/Wordmark";
import { cities, parent } from "./config";

/** Paragraph color on the splash: Paper softened so the headline leads. */
const dim = "text-[#C9CDD8]";

/**
 * build-your-city.org: one screen on desktop, a natural scroll on phones.
 * Wordmark and email on top, the pitch in the middle, the city list along
 * the bottom. No nav, no footer component.
 */
export default function App() {
	return (
		<div className="flex min-h-screen flex-col justify-between gap-12 bg-ink px-5 py-7 text-paper sm:px-12 sm:py-10">
			<header className="flex items-center justify-between">
				<Wordmark
					top={parent.wordmark.top}
					bottom={parent.wordmark.bottom}
					tone="paper"
					className="text-[28px] sm:text-[34px]"
				/>
				<a
					href={`mailto:${parent.email}`}
					className="hidden font-sans text-base font-semibold text-paper no-underline transition-colors hover:text-blue sm:inline"
				>
					{parent.email}
				</a>
			</header>

			<main className="w-full max-w-[900px] sm:mx-auto sm:text-center">
				<h1 className="font-display text-[52px] font-extrabold leading-[0.95] tracking-[-0.025em] text-paper sm:text-[112px] sm:leading-none">
					<span className="block">Use your skills.</span>
					<span className="block">Serve your city.</span>
				</h1>
				<p
					className={`mt-6 font-sans text-[17px] font-medium leading-[1.5] ${dim} sm:mx-auto sm:mt-8 sm:max-w-[680px] sm:text-[22px] sm:leading-[1.4]`}
				>
					Build Your City is a network of local communities where developers,
					designers, content creators, and other builders put their skills to
					work for nonprofits where they live.
				</p>
				<p
					className={`mt-4 font-sans text-[17px] font-medium leading-[1.5] ${dim} sm:mx-auto sm:mt-5 sm:max-w-[680px] sm:text-[19px] sm:leading-[1.4]`}
				>
					Each community meets monthly, volunteers with local nonprofits, and
					holds a hackathon once a year. Free to join. No experience needed.
				</p>
				<div className="mt-8 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:justify-center sm:gap-4">
					{cities.map((c) => (
						<CtaLink key={c.id} href={c.href}>
							Join in {c.name}
						</CtaLink>
					))}
				</div>
				<p className="mt-5">
					<a
						href={`mailto:${parent.email}?subject=${encodeURIComponent(parent.emailSubject)}`}
						className="inline-block border-b-2 border-blue pb-0.5 font-sans text-[17px] font-semibold text-paper no-underline transition-colors hover:text-blue"
					>
						Want this where you live? Email us
					</a>
				</p>
			</main>

			<footer className="border-t border-white/8 pt-5">
				<ul className="flex flex-col gap-3">
					{cities.map((c) => (
						<li
							key={c.id}
							className="flex flex-col gap-1.5 font-sans text-[15px] font-medium text-slate sm:flex-row sm:items-center sm:justify-between"
						>
							<p>
								Building in{" "}
								<strong className="font-semibold text-paper">{c.place}</strong>{" "}
								since {c.since}
							</p>
							<a
								href={c.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-slate no-underline transition-colors hover:text-paper"
							>
								{c.domain}
							</a>
						</li>
					))}
				</ul>
			</footer>
		</div>
	);
}
