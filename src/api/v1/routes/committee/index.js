'use strict';

const express = require('express');
const committeeController = require('./committee.controller');

const router = express.Router();

router.get('/', committeeController.getCommitteeList);
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[a-z-]+)*)',
  committeeController.getCommittee,
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  committeeController.getCommittee,
);

module.exports = router;
