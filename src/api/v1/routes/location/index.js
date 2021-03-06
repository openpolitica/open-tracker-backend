'use strict';

const express = require('express');
const router = express.Router();

const locationController = require('./location.controller');

const { controllerHandler } = require('../../../../helpers/express-callback');

router.get('/', controllerHandler(locationController.getLocationList));
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[a-z-]+)*)',
  controllerHandler(locationController.getLocation),
);
router.get(
  '/:id([0-9]{0,8})',
  controllerHandler(locationController.getLocation),
);

module.exports = router;
