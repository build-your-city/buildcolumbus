export type Sponsor = {
	name: string;
	href: string;
	logo: string;
};

/**
 * Sponsor and partner logos as a grid of equal white cards: four columns on
 * desktop, three under 1024px, two under 640px. Rows wrap and a partial last
 * row stays left-aligned. The whole card is the link.
 */
export default function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
	return (
		<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{sponsors.map((s) => (
				<li key={s.name}>
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
