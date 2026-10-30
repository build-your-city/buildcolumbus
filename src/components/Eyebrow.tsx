type EyebrowProps = {
	children: React.ReactNode;
	className?: string;
};

/**
 * The small uppercase label above a heading. Always Build Blue.
 */
export default function Eyebrow({ children, className = "" }: EyebrowProps) {
	return (
		<p
			className={`font-sans text-sm font-semibold uppercase tracking-[0.12em] text-blue ${className}`}
		>
			{children}
		</p>
	);
}
