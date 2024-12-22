const PuppeteerService = require('../services/puppeteerService');

class PuppeteerController {
    static async launch(req, res) {
        try {
            await PuppeteerService.launchBrowser();
            res.status(200).send('Puppeteer lanzado exitosamente.');
        } catch (error) {
            res.status(500).send('Error al lanzar Puppeteer.');
        }
    }
}

module.exports = PuppeteerController;
