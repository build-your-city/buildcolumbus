import { Link } from "@tanstack/react-router";
import CtaLink from "./CtaLink";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { leadText, underlineLink } from "./text";

type NotFoundProps = {
	/** The site's main pages, linked under the home button. */
	links: { to: string; label: string }[];
};

/**
 * The page shown for any URL that doesn't match a route. It renders inside
 * the site layout, so the header and footer stay. Netlify serves it with a
 * real 404 status (see the generated _redirects in vite.config.ts).
 */
export default function NotFound({ links }: NotFoundProps) {
	return (
		<Section hero>
			<p className="font-display text-[72px] font-extrabold leading-none tracking-[-0.025em] text-blue sm:text-[112px]">
				404
			</p>
			<SectionHeading as="h1" className="mt-4 sm:mt-6">
				Page not found
			</SectionHeading>
			<p className={`mt-6 sm:mt-8 sm:max-w-[34rem] ${leadText} text-ink`}>
				We couldn't find that page. It may have moved, or the link may have a
				typo.
			</p>
			<div className="mt-8 sm:mt-10">
				<CtaLink to="/">Go to the home page</CtaLink>
			</div>
			<nav aria-label="Main pages" className="mt-10">
				<ul className="flex flex-wrap gap-x-8 gap-y-4">
					{links.map((l) => (
						<li key={l.to}>
							<Link to={l.to} className={`${underlineLink} text-ink`}>
								{l.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</Section>
	);
}
