'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCongresistaService({ CongressmanModel }) {
  let baseService = new setupBaseService();

  async function doListCongresistas() {
    try {
      const congressmanList = await CongressmanModel.findAll();
      return baseService.getServiceResponse(200, 'Success', congressmanList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doListCongresistas,
  };
};
