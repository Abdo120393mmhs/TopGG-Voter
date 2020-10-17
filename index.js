const puppeteer = require("puppeteer");

const { BOT_IDS, COOKIES, PROXIES, WINDOW_SIZE } = require("./config.json");
if (!BOT_IDS) throw new Error("BOT_IDS not provided");
if (!COOKIES) throw new Error("COOKIES not provided");

const vote = async (id, cookie, proxy, windowSize) => {
	console.log("Trying to vote");

	const args = [`--window-size=${windowSize[0] || 1280},${windowSize[1] || 720}`];

	if (proxy) args.push("--proxy-server=" + proxy);

	const browser = await puppeteer.launch({ args, headless: false, ignoreHTTPSErrors: true });
	const page = (await browser.pages())[0];

	await page.setCookie({ name: "connect.sid", value: cookie, domain: "top.gg", path: "/" });
	await page.goto(`https://top.gg/bot/${id}/vote`);

	setTimeout(() => {
		page.click("#votingvoted");

		console.log(`Successfully voted for ${id} with ${cookie.substr(8)}`);

		setTimeout(() => browser.close(), 1000 * 3);
	}, 1000 * 60);
};

for (const id of BOT_IDS) {
	for (const cookie of COOKIES) {
		vote(id, cookie, PROXIES[Math.floor(Math.random() * PROXIES.length)], WINDOW_SIZE).catch(console.error);
	}
}
