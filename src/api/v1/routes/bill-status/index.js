'use strict';

const express = require('express');
const billStatusController = require('./bill-status.controller');

const expressCallback = require('../../../../helpers/express-callback');

const router = express.Router();

router.get('/', expressCallback(billStatusController.getBillStatusList));
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[0-9a-z-]+)*)',
  expressCallback(billStatusController.getBillStatus),
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  expressCallback(billStatusController.getBillStatus),
);

module.exports = router;
