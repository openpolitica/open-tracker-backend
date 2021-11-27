'use strict';

const models = require('./../models');

const setupCongresspersonService = require('./congressperson.service');
const setupLocationService = require('./location.service');
const setupCommitteeService = require('./committee.service');
const setupParliamentaryGroupService = require('./parliamentary-group.service');
const setupSearchService = require('./search.service');
const setupBillService = require('./bill.service');

module.exports = async function () {
  const congresspersonService = setupCongresspersonService(models);
  const locationService = setupLocationService(models);
  const committeeService = setupCommitteeService(models);
  const parliamentaryGroupService = setupParliamentaryGroupService(models);
  const searchService = setupSearchService(models);
  const billService = setupBillService(models);

  return {
    congresspersonService,
    locationService,
    committeeService,
    parliamentaryGroupService,
    searchService,
    billService,
  };
};
