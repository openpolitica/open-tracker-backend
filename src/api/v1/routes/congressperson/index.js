'use strict';

const express = require('express');
const congresspersonController = require('./congressperson.controller');

const router = express.Router();

router.get('/', congresspersonController.getCongresspersonList);

module.exports = router;
