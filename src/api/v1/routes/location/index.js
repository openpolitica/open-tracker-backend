'use strict';

const express = require('express');
const locationController = require('./location.controller');

const router = express.Router();

router.get('/', locationController.getLocationList);
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[a-z-]+)*)',
  locationController.getLocation,
);
router.get('/:id([0-9]{0,8})', locationController.getLocation);

module.exports = router;
