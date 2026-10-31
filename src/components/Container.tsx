import type { ReactNode } from "react";

/**
 * The site's one content container: 1200px max width with the side gutters
 * inside the box (48px on desktop, 20px on mobile). Every aligned piece of
 * content, header through footer, uses this so edges line up.
 */
export default function Container({
	className = "",
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<div className={`max-w-[1200px] mx-auto px-5 sm:px-12 ${className}`}>
			{children}
		</div>
	);
}
