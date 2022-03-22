'use strict';

const billController = require('./bill.controller');

const {
  router,
  controllerHandler,
} = require('../../../../helpers/express-callback');

router.get('/', controllerHandler(billController.getBillList));
router.get(
  '/:id([0-9]{4}-[0-9]{4}-[0-9]{5})',
  controllerHandler(billController.getBill),
);

module.exports = router;
