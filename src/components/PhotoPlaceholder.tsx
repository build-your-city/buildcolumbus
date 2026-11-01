/**
 * A labeled gray box standing in for a photo that hasn't been supplied yet.
 * Decorative (alt=""), so screen readers skip it. Pass an aspect class in
 * `className` to override the default 3:2.
 */
export default function PhotoPlaceholder({
	label,
	className = "aspect-[3/2]",
}: {
	label: string;
	className?: string;
}) {
	return (
		<div
			aria-hidden="true"
			className={`flex w-full flex-col items-center justify-center border border-slate bg-[#D8D2C4] p-6 text-center font-sans text-[22px] font-semibold leading-snug text-[#6E7383] ${className}`}
		>
			<span>PHOTO PLACEHOLDER</span>
			<span>{label}</span>
		</div>
	);
}
