'use strict';

const models = require('./../models');

const setupCongresspersonService = require('./congressperson.service');
const setupParliamentaryGroupService = require('./parliamentary-group.service');

module.exports = async function () {
  const congresspersonService = setupCongresspersonService(models);
  const parliamentaryGroupService = setupParliamentaryGroupService(models);

  return {
    congresspersonService,
    parliamentaryGroupService,
  };
};
