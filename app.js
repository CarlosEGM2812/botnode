const express = require('express');
const app = express();
const port = 3000;

// Rutas
const whatsappRoutes = require('./routes/whatsappRoutes');
const puppeteerRoutes = require('./routes/puppeteerRoutes');

// Middleware
app.use(express.json());

// Rutas de WhatsApp
app.use('/api/whatsapp', whatsappRoutes);

// Rutas de Puppeteer
app.use('/api/puppeteer', puppeteerRoutes);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
