'use strict';

const express = require('express');
const locationController = require('./location.controller');

const expressCallback = require('../../../../helpers/express-callback');

const router = express.Router();

router.get('/', expressCallback(locationController.getLocationList));
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[a-z-]+)*)',
  expressCallback(locationController.getLocation),
);
router.get('/:id([0-9]{0,8})', expressCallback(locationController.getLocation));

module.exports = router;
