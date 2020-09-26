const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const limiter = require('./controller/rate-limit.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(limiter);

// Rotas
const router = require('./routes/routes.js');
router(app);



module.exports = app;



