'use strict';

const express = require('express');
const router = express.Router();

const legislatureController = require('./legislature.controller');

const { controllerHandler } = require('../../../../helpers/express-callback');

router.get('/', controllerHandler(legislatureController.getLegislatureList));
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[0-9a-z-]+)*)',
  controllerHandler(legislatureController.getLegislature),
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  controllerHandler(legislatureController.getLegislature),
);

module.exports = router;
