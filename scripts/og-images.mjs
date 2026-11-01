/**
 * Renders the 1200x630 social preview images for every site from the brand
 * tokens: Paper background, the two-line wordmark in Ink and Build Blue, and
 * the tagline, set in Inter Tight and Inter from Google Fonts. The lockup is
 * about two-thirds of the width and stays inside the central 80% so square
 * and 1.91:1 crops both keep it whole.
 *
 * Usage: node scripts/og-images.mjs
 *
 * Needs a Chromium browser (Chrome or Edge) and network access for the
 * fonts. Set BROWSER_PATH if it is not at one of the usual locations.
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;
/** Width of the lockup as a fraction of the image width. */
const LOCKUP_WIDTH = 2 / 3;
const TAGLINE = "Use your skills. Serve your city.";

const images = [
	{
		top: "Build",
		bottom: "Columbus",
		files: ["sites/columbus/public/og-columbus.png"],
	},
	{
		top: "Build",
		bottom: "Your City",
		files: ["sites/build-your-city/public/og-build-your-city.png"],
	},
];

const browserCandidates = [
	process.env.BROWSER_PATH,
	"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
	"C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
	"/usr/bin/google-chrome",
	"/usr/bin/chromium",
	"/usr/bin/chromium-browser",
].filter(Boolean);

/** The page for one image. Sizes are fitted by script once fonts load. */
function page({ top, bottom }) {
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800&family=Inter:wght@600&display=block" rel="stylesheet" />
<style>
  html, body { margin: 0; }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px; background: #f4f1ea;
    display: flex; align-items: center; justify-content: center;
    -webkit-font-smoothing: antialiased;
  }
  #lockup { display: flex; flex-direction: column; align-items: flex-start; }
  #wordmark {
    display: flex; flex-direction: column; align-items: flex-start;
    font-family: "Inter Tight"; font-weight: 800; text-transform: uppercase;
    /* Uppercase caps are about 0.75em tall, so this line height keeps the
       boxes (and the safe-area check) tight to the letters. */
    line-height: 0.75; letter-spacing: -0.01em; white-space: nowrap;
  }
  #top { color: #141a2a; }
  #bottom { color: #3d8bff; }
  #tagline {
    margin: 0; font-family: Inter; font-weight: 600; color: #141a2a;
    line-height: 1; white-space: nowrap;
  }
</style>
</head>
<body>
  <div id="lockup">
    <div id="wordmark">
      <span id="top">${top}</span>
      <span id="bottom">${bottom}</span>
    </div>
    <p id="tagline">${TAGLINE}</p>
  </div>
  <script>
    // Fit each line to the target width, as Wordmark.tsx does at runtime.
    const target = ${WIDTH * LOCKUP_WIDTH};
    const fit = (el, width) => {
      el.style.fontSize = "100px";
      el.style.fontSize = (100 * width) / el.getBoundingClientRect().width + "px";
    };
    window.ready = document.fonts.ready.then(() => {
      const top = document.getElementById("top");
      const bottom = document.getElementById("bottom");
      const tagline = document.getElementById("tagline");
      fit(top, target);
      fit(bottom, target);
      fit(tagline, target);
      const topSize = parseFloat(top.style.fontSize);
      bottom.style.marginTop = topSize * 0.06 + "px";
      tagline.style.marginTop = topSize * 0.2 + "px";
      const box = document.getElementById("lockup").getBoundingClientRect();
      return {
        left: box.left, right: box.right, top: box.top, bottom: box.bottom,
        topSize, bottomSize: parseFloat(bottom.style.fontSize),
        taglineSize: parseFloat(tagline.style.fontSize),
      };
    });
  </script>
</body>
</html>`;
}

/** Minimal DevTools-protocol client over the WebSocket built into Node. */
function connect(url) {
	const ws = new WebSocket(url);
	const pending = new Map();
	let id = 0;
	ws.addEventListener("message", (event) => {
		const msg = JSON.parse(event.data);
		if (msg.id && pending.has(msg.id)) {
			const { resolve, reject } = pending.get(msg.id);
			pending.delete(msg.id);
			if (msg.error) reject(new Error(msg.error.message));
			else resolve(msg.result);
		}
	});
	const send = (method, params = {}, sessionId) =>
		new Promise((resolve, reject) => {
			const msgId = ++id;
			pending.set(msgId, { resolve, reject });
			ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
		});
	return new Promise((resolve, reject) => {
		ws.addEventListener("open", () => resolve({ send, ws }));
		ws.addEventListener("error", reject);
	});
}

async function main() {
	const browser = browserCandidates.find((p) => existsSync(p));
	if (!browser) {
		throw new Error("No Chromium browser found; set BROWSER_PATH.");
	}
	const profile = await mkdtemp(join(tmpdir(), "og-images-"));
	const proc = spawn(
		browser,
		[
			"--headless=new",
			"--remote-debugging-port=0",
			`--user-data-dir=${profile}`,
			"--no-first-run",
			"--hide-scrollbars",
			"about:blank",
		],
		{ stdio: ["ignore", "ignore", "pipe"] },
	);
	const wsUrl = await new Promise((resolve, reject) => {
		let buf = "";
		proc.stderr.on("data", (chunk) => {
			buf += chunk;
			const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
			if (m) resolve(m[1]);
		});
		proc.on("exit", () => reject(new Error("Browser exited early")));
	});

	try {
		const { send, ws } = await connect(wsUrl);
		const { targetId } = await send("Target.createTarget", {
			url: "about:blank",
		});
		const { sessionId } = await send("Target.attachToTarget", {
			targetId,
			flatten: true,
		});
		const cdp = (method, params) => send(method, params, sessionId);
		await cdp("Page.enable");
		await cdp("Runtime.enable");
		await cdp("Emulation.setDeviceMetricsOverride", {
			width: WIDTH,
			height: HEIGHT,
			deviceScaleFactor: 1,
			mobile: false,
		});

		for (const image of images) {
			const file = join(profile, `${image.bottom}.html`);
			await writeFile(file, page(image));
			const loaded = new Promise((done) => {
				const onMessage = (event) => {
					const msg = JSON.parse(event.data);
					if (msg.method === "Page.loadEventFired") {
						ws.removeEventListener("message", onMessage);
						done();
					}
				};
				ws.addEventListener("message", onMessage);
			});
			await cdp("Page.navigate", { url: pathToFileURL(file).href });
			await loaded;
			const { result } = await cdp("Runtime.evaluate", {
				expression: "window.ready",
				awaitPromise: true,
				returnByValue: true,
			});
			const box = result.value;
			const inside =
				box.left >= WIDTH * 0.1 &&
				box.right <= WIDTH * 0.9 &&
				box.top >= HEIGHT * 0.1 &&
				box.bottom <= HEIGHT * 0.9;
			if (!inside) {
				throw new Error(
					`${image.bottom}: lockup leaves the safe area ${JSON.stringify(box)}`,
				);
			}
			const { data } = await cdp("Page.captureScreenshot", {
				format: "png",
				clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
			});
			const png = Buffer.from(data, "base64");
			for (const file of image.files) {
				await writeFile(join(root, file), png);
				console.log(`wrote ${file}`);
			}
			const r = Math.round;
			console.log(
				`  lockup x ${r(box.left)}..${r(box.right)}, y ${r(box.top)}..${r(box.bottom)}; font sizes ${r(box.topSize)} / ${r(box.bottomSize)} / ${r(box.taglineSize)}px`,
			);
		}
		ws.close();
	} finally {
		proc.kill();
		await rm(profile, { recursive: true, force: true }).catch(() => {});
	}
}

main().catch((err) => {
	console.error(err.message);
	process.exit(1);
});
