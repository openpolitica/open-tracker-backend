'use strict';

const express = require('express');
const billController = require('./bill.controller');

const expressCallback = require('../../../../helpers/express-callback');

const router = express.Router();

router.get('/', expressCallback(billController.getBillList));
router.get(
  '/:id([0-9]{4}-[0-9]{4}-[0-9]{5})',
  expressCallback(billController.getBill),
);

module.exports = router;
