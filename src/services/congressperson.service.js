'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCongresistaService({ CongresspersonModel }) {
  let baseService = new setupBaseService();

  async function doListCongressperson() {
    try {
      const congresspersonList = await CongresspersonModel.findAll();
      return baseService.getServiceResponse(200, 'Success', congresspersonList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doListCongressperson,
  };
};
