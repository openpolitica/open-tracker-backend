'use strict';

const express = require('express');
const committeeController = require('./committee.controller');

const expressCallback = require('../../../../helpers/express-callback');

const router = express.Router();

router.get('/', expressCallback(committeeController.getCommitteeList));
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[a-z-]+)*)',
  expressCallback(committeeController.getCommittee),
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  expressCallback(committeeController.getCommittee),
);

module.exports = router;
