const express = require('express');
const router = express.Router();
const PuppeteerController = require('../controllers/puppeteerController');

router.post('/launch', PuppeteerController.launch);

module.exports = router;
