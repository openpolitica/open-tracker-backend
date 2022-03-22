'use strict';

const express = require('express');
const router = express.Router();

const searchController = require('./search.controller');

const { controllerHandler } = require('../../../../helpers/express-callback');

router.get('/', controllerHandler(searchController.getSearchResults));

module.exports = router;
