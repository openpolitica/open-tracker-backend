'use strict';

const parliamentaryGroupController = require('./parliamentary-group.controller');

const {
  router,
  controllerHandler,
} = require('../../../../helpers/express-callback');

router.get(
  '/',
  controllerHandler(parliamentaryGroupController.getParliamentaryGroupList),
);
router.get(
  '/:slug([a-z]+(?:-[a-z-]+)*)',
  controllerHandler(parliamentaryGroupController.getParliamentaryGroup),
);
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  controllerHandler(parliamentaryGroupController.getParliamentaryGroup),
);

module.exports = router;
