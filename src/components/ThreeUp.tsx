import type { ReactNode } from "react";
import { bodyText, cardHeading } from "./text";

export type ThreeUpItem = {
	/** Step number or icon shown above the heading, in Build Blue. */
	marker?: ReactNode;
	title: string;
	/** One paragraph, or several when one would run long on a phone. */
	body: string | string[];
};

/**
 * Three cells in one white box: 1px Line border around the whole thing and
 * 1px dividers between cells, no gaps. When the box is narrower than 48rem
 * (phones, landscape phones, tablets) the cells stack as separate white
 * cards with a 16px gap, each keeping its own border. The switch follows the
 * box's own width (a container query), not the screen's, so a cell is never
 * squeezed below about 250px.
 */
export default function ThreeUp({ items }: { items: ThreeUpItem[] }) {
	return (
		<div className="@container">
			<div className="grid grid-cols-1 gap-4 @3xl:grid-cols-3 @3xl:gap-0 @3xl:border @3xl:border-line">
				{items.map((item, i) => (
					<div
						key={item.title}
						className={`border border-line bg-white p-8 @3xl:border-y-0 @3xl:border-r-0 ${i === 0 ? "@3xl:border-l-0" : ""}`}
					>
						{item.marker !== undefined && (
							<div className="mb-4 font-display text-[56px] font-extrabold leading-none tracking-[-0.025em] text-blue">
								{item.marker}
							</div>
						)}
						<h3 className={`${cardHeading} text-ink`}>{item.title}</h3>
						{(Array.isArray(item.body) ? item.body : [item.body]).map(
							(paragraph, p) => (
								<p
									key={paragraph}
									className={`${p === 0 ? "mt-3" : "mt-4"} ${bodyText} text-ink`}
								>
									{paragraph}
								</p>
							),
						)}
					</div>
				))}
			</div>
		</div>
	);
}
