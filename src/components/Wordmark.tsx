import { useLayoutEffect, useRef } from "react";

type WordmarkProps = {
	/** First line, e.g. "Build". */
	top: string;
	/** Second line, e.g. "Columbus". Rendered in Build Blue. */
	bottom: string;
	/** "ink" for light backgrounds, "paper" for the footer. */
	tone?: "ink" | "paper";
	className?: string;
};

/**
 * Two-line uppercase wordmark. The second line is scaled so its width
 * matches the first line exactly: after fonts load we measure both lines
 * and write the ratio to a CSS variable that styles.css reads.
 */
export default function Wordmark({
	top,
	bottom,
	tone = "ink",
	className = "",
}: WordmarkProps) {
	const rootRef = useRef<HTMLSpanElement>(null);
	const topRef = useRef<HTMLSpanElement>(null);
	const bottomRef = useRef<HTMLSpanElement>(null);

	useLayoutEffect(() => {
		const root = rootRef.current;
		const a = topRef.current;
		const b = bottomRef.current;
		if (!root || !a || !b) return;

		let cancelled = false;
		const fitLines = () => {
			if (cancelled) return;
			// Measure the second line at the same size as the first, then scale.
			root.style.setProperty("--wm-ratio", "1");
			const ratio =
				a.getBoundingClientRect().width / b.getBoundingClientRect().width;
			root.style.setProperty("--wm-ratio", String(ratio));
		};

		fitLines();
		document.fonts?.ready.then(fitLines);
		return () => {
			cancelled = true;
		};
	}, []);

	const topColor = tone === "ink" ? "text-ink" : "text-paper";

	return (
		<span
			ref={rootRef}
			className={`inline-flex flex-col items-start font-display font-extrabold uppercase leading-none tracking-[-0.01em] ${className}`}
		>
			<span ref={topRef} className={topColor}>
				{top}
			</span>
			<span ref={bottomRef} className="wordmark-sub text-blue">
				{bottom}
			</span>
		</span>
	);
}
