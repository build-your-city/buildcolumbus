import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Sponsor = {
	name: string;
	href: string;
	logo: string;
};

const arrowClass =
	"flex h-12 w-12 shrink-0 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper disabled:border-line disabled:text-line disabled:hover:bg-transparent";

/**
 * Horizontal row of logos, four visible at a time, with arrow buttons on
 * each side. The row is a native scroll container (scrollbar hidden), so it
 * also swipes on touch. Arrows disable when there is nothing more to scroll.
 */
export default function SponsorCarousel({ sponsors }: { sponsors: Sponsor[] }) {
	const trackRef = useRef<HTMLUListElement>(null);
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(true);

	const update = useCallback(() => {
		const el = trackRef.current;
		if (!el) return;
		setAtStart(el.scrollLeft <= 1);
		setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
	}, []);

	useEffect(() => {
		update();
		const el = trackRef.current;
		if (!el) return;
		el.addEventListener("scroll", update, { passive: true });
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => {
			el.removeEventListener("scroll", update);
			ro.disconnect();
		};
	}, [update]);

	const scrollByOne = (dir: 1 | -1) => {
		const el = trackRef.current;
		if (!el) return;
		const slide = el.firstElementChild as HTMLElement | null;
		const step = slide ? slide.offsetWidth : el.clientWidth / 4;
		el.scrollBy({ left: dir * step, behavior: "smooth" });
	};

	return (
		<div className="flex items-center gap-4 md:gap-6">
			<button
				type="button"
				className={arrowClass}
				onClick={() => scrollByOne(-1)}
				disabled={atStart}
				aria-label="Previous sponsors"
			>
				<ChevronLeft size={22} aria-hidden="true" />
			</button>

			<ul
				ref={trackRef}
				className="flex min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				{sponsors.map((s) => (
					<li
						key={s.name}
						className="flex w-full shrink-0 snap-start items-center justify-center px-4 py-2 min-[480px]:w-1/2 md:w-1/4 md:px-6"
					>
						<a
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-20 w-full items-center justify-center"
						>
							<img
								src={s.logo}
								alt={s.name}
								className="max-h-14 w-auto max-w-full object-contain md:max-h-20"
								loading="lazy"
							/>
						</a>
					</li>
				))}
			</ul>

			<button
				type="button"
				className={arrowClass}
				onClick={() => scrollByOne(1)}
				disabled={atEnd}
				aria-label="Next sponsors"
			>
				<ChevronRight size={22} aria-hidden="true" />
			</button>
		</div>
	);
}
