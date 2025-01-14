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
            try {
                // Convertir el código QR a una imagen base64 sin márgenes
                const qrcodeData = await qrcode.toDataURL(qr, { margin: 1 });

                // Enviar el código QR al servidor Flask
                await axios.post('https://botwhatsappgit-production.up.railway.app//api/qrcode', { qrcode: qrcodeData });

                console.log('QR enviado a Flask correctamente');
            } catch (error) {
                console.error('Error al enviar el código QR a Flask:', error);
            }
        });

        this.client.on('ready', () => {
            console.log('Cliente de WhatsApp está listo.');
        });

        this.client.on('message', async (message) => {
            console.log(`Mensaje recibido: ${message.body}`);

            // Capturar el número del usuario
            const userId = message.from.split('@')[0]; // Número de teléfono sin el dominio '@c.us'

            // Enviar la pregunta a la API Flask
            try {
                const response = await axios.post('https://botwhatsappgit-production.up.railway.app//api/chat', {
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

        // Inicializar cliente de WhatsApp
        this.client.initialize();
    }

    async sendMessage(userId, message) {
        const chat = await this.client.getChatById(userId); // Obtener el chat del usuario
        return chat.sendMessage(message); // Enviar el mensaje
    }
}

module.exports = WhatsAppService;
