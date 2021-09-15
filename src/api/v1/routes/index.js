'use strict';

const express = require('express');
const router = express.Router();

router.use('/congressperson', require('./congressperson'));
router.use('/location', require('./location'));
router.use('/parliamentary-group', require('./parliamentary-group'));
router.use('/search', require('./search'));

module.exports = router;
