'use strict';

const express = require('express');
const router = express.Router();

router.use('/congressperson', require('./congressperson'));
router.use('/location', require('./location'));
router.use('/committee', require('./committee'));
router.use('/parliamentary-group', require('./parliamentary-group'));
router.use('/search', require('./search'));
router.use('/bill', require('./bill'));

module.exports = router;
