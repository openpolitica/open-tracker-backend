'use strict';

const searchController = require('./search.controller');

const { router, controllerHandler } = require('../../../../helpers/express-callback');

router.get('/', controllerHandler(searchController.getSearchResults));

module.exports = router;
