'use strict';

const express = require('express');
const searchController = require('./search.controller');

const router = express.Router();

router.get('/', searchController.getSearchResults);

module.exports = router;
