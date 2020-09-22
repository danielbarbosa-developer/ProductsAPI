const express = require('express');

const app = express();

// Rotas
const router = require('./routes/routes.js');
app.use('/', router);

module.exports = app;



/*
const express = require('express');
const app = express();

app.get('/', (req, res)=> res.send({
    title: 'Hello'
}));


module.exports = app;
*/