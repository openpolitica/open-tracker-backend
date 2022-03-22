'use strict';

const committeeController = require('./committee.controller');

const {
  router,
  controllerHandler,
} = require('../../../../helpers/express-callback');

router.get('/', controllerHandler(committeeController.getCommitteeList));
router.get(
  '/:slug([a-z]+|[a-z]+(?:-[a-z-]+)*)',
  controllerHandler(committeeController.getCommittee),
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  controllerHandler(committeeController.getCommittee),
);

module.exports = router;
