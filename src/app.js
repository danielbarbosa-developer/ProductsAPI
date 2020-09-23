const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

// Rotas
const router = require('./routes/routes.js');
router(app);



module.exports = app;



