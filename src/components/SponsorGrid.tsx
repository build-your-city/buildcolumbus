export type Sponsor = {
	name: string;
	href: string;
	logo: string;
};

/**
 * Sponsor and partner logos as rows of equal white cards with a 16px gap:
 * two per row, then four per row once the row is at least 56rem wide
 * (desktop). There is no three-per-row step, which would leave a lone logo.
 * The count follows the row's own width (a container query), not the
 * screen's. While two per row, logos grow with the cards from 56px to 80px
 * tall (10% of the row width); at four per row they are 56px. Cards are at
 * least 120px tall and grow with a taller logo. It is a centered flex row
 * rather than a grid, so a partial last row sits centered under the heading.
 * Each card's width is one column: (100% minus the gaps) divided by the
 * count. The whole card is the link.
 */
export default function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
	return (
		<ul className="@container flex flex-wrap justify-center gap-4">
			{sponsors.map((s) => (
				<li
					key={s.name}
					className="w-[calc((100%-1rem)/2)] @4xl:w-[calc((100%-3rem)/4)]"
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
							className="max-h-[clamp(56px,10cqi,80px)] w-auto max-w-full object-contain @4xl:max-h-14"
							loading="lazy"
						/>
					</a>
				</li>
			))}
		</ul>
	);
}
