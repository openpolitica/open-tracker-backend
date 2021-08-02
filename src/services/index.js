'use strict';

const models = require('./../models');

const setupCongresspersonService = require('./congressperson.service');

module.exports = async function () {
  const congresspersonService = setupCongresspersonService(models);

  return {
    congresspersonService,
  };
};
