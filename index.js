const puppeteer = require('puppeteer');
const { BOT_IDS, COOKIES, PROXIES } = require('./config.json');
if (!BOT_IDS) throw new Error('BOT_IDS not provided');
if (!COOKIES) throw new Error('COOKIES not provided');
if (!PROXIES) throw new Error('PROXIES not provided');

const vote = async (id, cookie, proxy) => {
	console.log('Trying to vote');

	const args = ['--window-size=1280,720', `--proxy-server=${proxy}`]
	const browser = await puppeteer.launch({ args, headless: false, ignoreHTTPSErrors: true });
	const page = (await browser.pages())[0];

	await page.setCookie({ name: 'connect.sid', value: cookie, domain: 'top.gg', path: '/' });
	await page.goto(`https://top.gg/bot/${id}/vote`);
	await page.click('#votingvoted');

	console.log('Successfully voted');
	setTimeout(() => browser.close(), 1000);
};

const main = () => {
	for (const id of BOT_IDS) {
		for (const cookie of COOKIES) {
			vote(id, cookie, PROXIES[Math.floor(Math.random() * PROXIES.length)])
		}
	}
};

main();