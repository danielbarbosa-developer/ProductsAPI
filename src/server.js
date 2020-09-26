/* Script destinado a levantar o servidor, 
e informar a porta usada para comunicação */

const app = require('./app')
const http = require('http')

function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
  
    if (port >= 0) {
      return port;
    }
  
    return false;
  }
  
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);


const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port: ${port}`));

module.exports = server;



