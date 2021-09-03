'use strict';

const logger = require('morgan');
const app = require('express')();
const cors = require('cors');

global.XMLHttpRequest = require('xhr2');

require('dotenv').config();

app.use(cors());
app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(
  logger(
    ':date[iso] - :remote-addr ":method :url HTTP/:http-version" status::status :res[' +
      'content-length] bytes - :response-time \bms',
  ),
);

app.use('/api/', require('./api/v1/routes'));
app.use('/docs/', require('./docs'));

module.exports = app;
