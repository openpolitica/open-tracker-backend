'use strict';

const express = require('express');
const router = express.Router();

const congresspersonController = require('./congressperson.controller');

const { controllerHandler } = require('../../../../helpers/express-callback');

router.get(
  '/',
  controllerHandler(congresspersonController.getCongresspersonList),
);
router.get(
  '/:slug([a-z]+(?:-[a-z-]+)*)/bills/legislature/:legislature_slug([a-z]+|[a-z]+(?:-[0-9a-z-]+)*)',
  controllerHandler(
    congresspersonController.getCongresspersonBillsByLegislature,
  ),
);
router.get(
  '/:slug([a-z]+(?:-[a-z-]+)*)/bills',
  controllerHandler(congresspersonController.getCongresspersonBills),
);
router.get(
  '/:slug([a-z]+(?:-[a-z-]+)*)',
  controllerHandler(congresspersonController.getCongresspersonDetail),
);
router.get(
  '/:id([0-9]{0,8})',
  controllerHandler(congresspersonController.getCongresspersonDetail),
);

module.exports = router;
