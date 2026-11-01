export type Sponsor = {
	name: string;
	href: string;
	logo: string;
};

/**
 * Sponsor and partner logos as rows of equal white cards: four across on
 * desktop, three under 1024px, two under 640px, with a 16px gap. It is a
 * centered flex row rather than a grid, so when there are fewer logos than
 * columns (or a partial last row) they sit centered under the heading. Each
 * card's width is one column: (100% minus the gaps) divided by the count.
 * The whole card is the link.
 */
export default function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
	return (
		<ul className="flex flex-wrap justify-center gap-4">
			{sponsors.map((s) => (
				<li
					key={s.name}
					className="w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
				>
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						className="flex h-[120px] items-center justify-center border border-line bg-white p-8"
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
