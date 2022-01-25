'use strict';

const express = require('express');
const legislatureController = require('./legislature.controller');

const router = express.Router();

router.get('/', legislatureController.getLegislatureList);
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[0-9a-z-]+)*)',
  legislatureController.getLegislature,
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  legislatureController.getLegislature,
);

module.exports = router;
