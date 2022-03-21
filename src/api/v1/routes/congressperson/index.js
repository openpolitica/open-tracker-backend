'use strict';

const express = require('express');
const congresspersonController = require('./congressperson.controller');

const expressCallback = require('../../../../helpers/express-callback');

const router = express.Router();

router.get('/', expressCallback(congresspersonController.getCongresspersonList));
router.get(
  '/:slug([a-z]+(?:-[a-z-]+)*)',
  expressCallback(congresspersonController.getCongresspersonDetail),
);
router.get(
  '/:id([0-9]{0,8})',
  expressCallback(congresspersonController.getCongresspersonDetail),
);

module.exports = router;
