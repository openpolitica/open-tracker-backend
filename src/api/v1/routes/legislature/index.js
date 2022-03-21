'use strict';

const express = require('express');
const legislatureController = require('./legislature.controller');

const expressCallback = require('../../../../helpers/express-callback');

const router = express.Router();

router.get('/', expressCallback(legislatureController.getLegislatureList));
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[0-9a-z-]+)*)',
  expressCallback(legislatureController.getLegislature),
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  expressCallback(legislatureController.getLegislature),
);

module.exports = router;
