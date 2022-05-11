'use strict';

const express = require('express');
const router = express.Router();

const glossaryController = require('./glossary.controller');

const { controllerHandler } = require('../../../../helpers/express-callback');

router.get('/term', controllerHandler(glossaryController.getTermList));

router.get('/category', controllerHandler(glossaryController.getCategoryList));

router.get(
  '/term/:slug([a-z]+|[a-z]+(?:-[a-z-]+)*)',
  controllerHandler(glossaryController.getTerm),
);

router.get(
  '/category/:slug([a-z]+|[a-z]+(?:-[a-z-]+)*)',
  controllerHandler(glossaryController.getCategory),
);

module.exports = router;
