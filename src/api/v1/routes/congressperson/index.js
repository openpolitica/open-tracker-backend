'use strict';

const express = require('express');
const congresspersonController = require('./congressperson.controller');

const router = express.Router();

router.get('/', congresspersonController.getCongresspersonList);
router.get('/:slug', congresspersonController.getCongresspersonDetail);

module.exports = router;
