import type { ReactNode } from "react";

export type ThreeUpItem = {
	/** Step number or icon shown above the heading, in Build Blue. */
	marker?: ReactNode;
	title: string;
	body: string;
};

/**
 * Three cells in one white box: 1px Line border around the whole thing and
 * 1px dividers between cells, no gaps. Stacks on mobile.
 */
export default function ThreeUp({ items }: { items: ThreeUpItem[] }) {
	return (
		<div className="grid grid-cols-1 border border-line bg-white md:grid-cols-3">
			{items.map((item, i) => (
				<div
					key={item.title}
					className={`p-8 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}
				>
					{item.marker !== undefined && (
						<div className="mb-4 font-display text-[56px] font-extrabold leading-none tracking-[-0.025em] text-blue">
							{item.marker}
						</div>
					)}
					<h3 className="font-display text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
						{item.title}
					</h3>
					<p className="mt-3 font-sans text-[17px] font-medium leading-[1.55] text-ink">
						{item.body}
					</p>
				</div>
			))}
		</div>
	);
}
