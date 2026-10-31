/**
 * Everything specific to the parent site, build-your-city.org.
 */
export const parent = {
	siteName: "Build Your City",
	wordmark: { top: "Build", bottom: "Your City" },
	email: "hello@build-your-city.org",
	/** Subject line prefilled by the "Want this where you live?" link. */
	emailSubject: "Build Your City where I live",
};

/**
 * The cities, oldest first. Each one gets a "Join in" button and a line in
 * the list along the bottom of the page, so a new city is one entry here.
 */
export const cities = [
	{
		id: "columbus",
		name: "Columbus",
		place: "Columbus, Ohio",
		since: 2024,
		domain: "buildcolumbus.org",
		href: "https://buildcolumbus.org",
	},
];
