export type Sponsor = {
	name: string;
	href: string;
	logo: string;
};

/**
 * Sponsor and partner logos as rows of equal white cards with a 16px gap:
 * four across when the row is at least 56rem wide (desktop), three from
 * 36rem, two below that (phones). The count follows the row's own width (a
 * container query), not the screen's. Cards are at least 120px tall and grow
 * if a logo needs more room. It is a
 * centered flex row rather than a grid, so when there are fewer logos than
 * columns (or a partial last row) they sit centered under the heading. Each
 * card's width is one column: (100% minus the gaps) divided by the count.
 * The whole card is the link.
 */
export default function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
	return (
		<ul className="@container flex flex-wrap justify-center gap-4">
			{sponsors.map((s) => (
				<li
					key={s.name}
					className="w-[calc((100%-1rem)/2)] @xl:w-[calc((100%-2rem)/3)] @4xl:w-[calc((100%-3rem)/4)]"
				>
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						// 31px top and bottom padding + 1px borders + a 56px logo = 120px,
						// the card's usual height; a taller logo makes it grow.
						className="flex min-h-[120px] items-center justify-center border border-line bg-white px-8 py-[31px]"
					>
						<img
							src={s.logo}
							alt={s.name}
							className="max-h-14 w-auto max-w-full object-contain"
							loading="lazy"
						/>
					</a>
				</li>
			))}
		</ul>
	);
}
