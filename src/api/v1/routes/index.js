'use strict';

const express = require('express');
const router = express.Router();

router.use('/congressperson', require('./congressperson'));

module.exports = router;
