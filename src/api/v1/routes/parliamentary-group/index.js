'use strict';

const express = require('express');
const parliamentaryGroupController = require('./parliamentary-group.controller');

const router = express.Router();

router.get('/', parliamentaryGroupController.getParliamentaryGroupList);
router.get('/:slug', parliamentaryGroupController.getParliamentaryGroup);

module.exports = router;
