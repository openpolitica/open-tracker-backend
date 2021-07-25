'use strict';

const express = require('express');
const router = express.Router();

router.use('/congresistas', require('./congresista'));

module.exports = router;
