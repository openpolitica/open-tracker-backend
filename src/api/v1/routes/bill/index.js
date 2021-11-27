'use strict';

const express = require('express');
const billController = require('./bill.controller');

const router = express.Router();

router.get('/', billController.getBillList);
router.get('/:id([0-9]{4}-[0-9]{4}-[0-9]{5})', billController.getBill);

module.exports = router;
