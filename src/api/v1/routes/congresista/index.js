'use strict';

const express = require('express');
const congresistaController = require('./congresista.controller');

const router = express.Router();

router.get('/', congresistaController.getCongresistas);

module.exports = router;
