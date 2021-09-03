'use strict';

const models = require('./../models');

const setupCongresspersonService = require('./congressperson.service');
const setupParliamentaryGroupService = require('./parliamentary-group.service');
const setupSearchService = require('./search.service');

module.exports = async function () {
  const congresspersonService = setupCongresspersonService(models);
  const parliamentaryGroupService = setupParliamentaryGroupService(models);
  const searchService = setupSearchService(models);

  return {
    congresspersonService,
    parliamentaryGroupService,
    searchService,
  };
};
