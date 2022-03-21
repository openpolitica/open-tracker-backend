'use strict';

const express = require('express');
const parliamentaryGroupController = require('./parliamentary-group.controller');

const expressCallback = require('../../../../helpers/express-callback');

const router = express.Router();

router.get('/', expressCallback(parliamentaryGroupController.getParliamentaryGroupList));
router.get(
  '/:slug([a-z]+(?:-[a-z-]+)*)',
  expressCallback(parliamentaryGroupController.getParliamentaryGroup),
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  expressCallback(parliamentaryGroupController.getParliamentaryGroup),
);

module.exports = router;
