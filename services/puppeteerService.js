const puppeteer = require('puppeteer');

class PuppeteerService {
    async launchBrowser() {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        // Ejemplo de lógica adicional con Puppeteer
        await page.goto('https://example.com');
        return browser;
    }
}

module.exports = PuppeteerService;