// routes/whatsappRoutes.js
const express = require('express');
const router = express.Router();
const WhatsAppService = require('../services/whatsappService'); // Ajusta la ruta según tu proyecto

const whatsappService = new WhatsAppService();

router.post('/qrcode', async (req, res) => {
    try {
        const { qrcode } = req.body;
        // Aquí puedes guardar o manejar el QR de alguna manera si es necesario
        res.status(200).send({ message: 'QR recibido correctamente' });
    } catch (error) {
        console.error('Error en la ruta /qrcode:', error);
        res.status(500).send({ message: 'Error al procesar el QR' });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const { pregunta, user_id } = req.body;
        const respuesta = await whatsappService.handleIncomingMessage(pregunta, user_id); // Manejar el mensaje
        res.status(200).send({ respuesta });
    } catch (error) {
        console.error('Error en la ruta /chat:', error);
        res.status(500).send({ message: 'Error al procesar el mensaje' });
    }
});

module.exports = router;
