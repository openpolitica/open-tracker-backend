'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCongresistaService({ CongresistaModel }) {
  let baseService = new setupBaseService();

  async function doListCongresistasService() {
    try {
      const detalleEmpresa = await CongresistaModel.findAll();
      return baseService.getServiceResponse(200, "Success", detalleEmpresa);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doListCongresistasService
  };
}