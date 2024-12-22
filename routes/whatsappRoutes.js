const express = require('express');
const router = express.Router();
const WhatsAppController = require('../controllers/whatsappController');

router.post('/send-message', WhatsAppController.sendMessage);

module.exports = router;
