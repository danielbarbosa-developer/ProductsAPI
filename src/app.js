const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const limiter = require('./controller/rate-limit');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(limiter);

// Rotas
const router = require('./routes/routes');
router(app);

module.exports = app;
