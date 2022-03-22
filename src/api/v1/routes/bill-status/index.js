'use strict';

const billStatusController = require('./bill-status.controller');

const { router, controllerHandler } = require('../../../../helpers/express-callback');

router.get('/', controllerHandler(billStatusController.getBillStatusList));
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[0-9a-z-]+)*)',
  controllerHandler(billStatusController.getBillStatus),
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  controllerHandler(billStatusController.getBillStatus),
);

module.exports = router;
