/**
 * Module dependencies.
 */

const http = require('http');
const app = require('../../src/app');

const notProductionEnv = process.env.NODE_ENV !== 'production';

//const debug = require('debug')('node-sequelize:server');

const { sequelize } = require('../../src/models');

/**
 * Sync and ping database
 */

 initDatabase();

/**
 * Get port from environment and store in Express.
 */

//This can receive the port number from .env, in which case it will be a string
const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function initDatabase() {
  let connected = false;
  sequelize.authenticate().then(() => {
    console.log("Successfully connected to the DB!");
    connected = true;
  }).catch((error) => {
    console.log("Unable to connect to the DB:");
    if (notProductionEnv) {
      console.error("Error:", error.message);
    }
  });

  if (connected) {
    sequelize.sync().then(() => {
      console.log("Successfully synchronized with the DB!");
      connected = true;
    }).catch((error) => {
      console.log("Unable to synchronize the DB:");
      if (notProductionEnv) {
        console.log("Error:", error.message);
      }
    });
  }
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
  if (notProductionEnv) {
    //debug("Listening on " + bind);
  }
}
