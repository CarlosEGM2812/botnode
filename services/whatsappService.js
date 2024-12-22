const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const axios = require('axios');

class WhatsAppService {
    constructor() {
        this.client = new Client();
        this.init();
    }

    async init() {
        this.client.on('qr', async (qr) => {
            const qrcodeData = await qrcode.toDataURL(qr, { margin: 1 });
            await axios.post('http://127.0.0.1:5000/api/qrcode', { qrcode: qrcodeData });
            console.log('QR enviado a Flask correctamente');
        });

        this.client.on('ready', () => {
            console.log('Cliente de WhatsApp está listo.');
        });

        this.client.on('message', async (message) => {
            console.log(`Mensaje recibido: ${message.body}`);
            const userId = message.from.split('@')[0];

            try {
                const response = await axios.post('http://127.0.0.1:5000/api/chat', {
                    pregunta: message.body,
                    user_id: userId,
                });
                const respuesta = response.data.respuesta || 'No se pudo procesar tu solicitud.';
                message.reply(respuesta);
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
                message.reply('Hubo un error al procesar tu mensaje. Inténtalo nuevamente más tarde.');
            }
        });

        this.client.initialize();
    }

    async sendMessage(userId, message) {
        const user = this.client.getChatById(userId); // Para obtener el usuario
        return user.sendMessage(message);
    }
}

module.exports = WhatsAppService;
