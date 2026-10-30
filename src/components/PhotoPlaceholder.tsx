/**
 * A labeled gray box standing in for a photo that hasn't been supplied yet.
 * Decorative (alt=""), so screen readers skip it.
 */
export default function PhotoPlaceholder({
	label,
	className = "",
}: {
	label: string;
	className?: string;
}) {
	return (
		<div
			aria-hidden="true"
			className={`flex aspect-[3/2] w-full flex-col items-center justify-center border border-slate bg-[#D8D2C4] p-6 text-center font-sans text-[22px] font-semibold leading-snug text-[#6E7383] ${className}`}
		>
			<span>PHOTO PLACEHOLDER</span>
			<span>{label}</span>
		</div>
	);
}
