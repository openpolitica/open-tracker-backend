const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getCongresistas = async (request, response) => {
  let responseCode, responseData;

  try {
    const congresistaService = await serviceContainer('congresista');

    const serviceResponse =
      await congresistaService.doListCongresistas();

    responseCode = serviceResponse.responseCode;
    responseData = baseController.getSuccessResponse(
      serviceResponse.data,
      serviceResponse.message,
    );
  } catch (error) {
    responseData = baseController.getErrorResponse(
      'Error obtaining information',
    );
  }

  return response.status(responseCode).json(responseData);
};

module.exports = {
  getCongresistas,
};
