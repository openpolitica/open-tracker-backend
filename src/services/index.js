'use strict';

const models = require('./../models');

const setupCongresistaService = require('./congresista.service');

module.exports = async function () {
  const congresistaService = setupCongresistaService(models);

  return {
    congresistaService
  };
};
