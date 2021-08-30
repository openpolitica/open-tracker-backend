'use strict';

const express = require('express');
const parliamentaryGroupController = require('./parliamentary-group.controller');

const router = express.Router();

router.get('/', parliamentaryGroupController.getParliamentaryGroupList);
router.get(
  '/:slug([a-z]+(?:-[a-z-]+)*)',
  parliamentaryGroupController.getParliamentaryGroup,
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  parliamentaryGroupController.getParliamentaryGroup,
);

module.exports = router;
