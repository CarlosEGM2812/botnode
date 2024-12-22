const WhatsAppService = require('../services/whatsappService');

class WhatsAppController {
    static async sendMessage(req, res) {
        const { message, userId } = req.body;

        try {
            const response = await WhatsAppService.sendMessage(userId, message);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send('Error al enviar el mensaje de WhatsApp');
        }
    }
}

module.exports = WhatsAppController;
