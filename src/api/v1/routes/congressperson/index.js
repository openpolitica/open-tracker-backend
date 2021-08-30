'use strict';

const express = require('express');
const congresspersonController = require('./congressperson.controller');

const router = express.Router();

router.get('/', congresspersonController.getCongresspersonList);
router.get(
  '/:slug([a-z]+(?:-[a-z-]+)*)',
  congresspersonController.getCongresspersonDetail,
);
router.get(
  '/:id([0-9]{0,8})',
  congresspersonController.getCongresspersonDetail,
);

module.exports = router;
