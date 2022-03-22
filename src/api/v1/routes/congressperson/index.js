'use strict';

const congresspersonController = require('./congressperson.controller');

const { router, controllerHandler }  = require('../../../../helpers/express-callback');

router.get(
  '/',
  controllerHandler(congresspersonController.getCongresspersonList),
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
