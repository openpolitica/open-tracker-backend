'use strict';

const express = require('express');
const searchController = require('./search.controller');

const expressCallback = require('../../../../helpers/express-callback');

const router = express.Router();

router.get('/', expressCallback(searchController.getSearchResults));

module.exports = router;
