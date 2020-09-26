const rateLimit = require('express-rate-limit');

// Limitando o número de requisições por IP
const limiter = rateLimit({
    windowMs: 10*60*1000,
    max: 10
});

module.exports = limiter;