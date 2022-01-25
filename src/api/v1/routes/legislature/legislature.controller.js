const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getLegislatureList = async (request, response) => {
  let responseCode, responseData;

  try {
    const legislatureService = await serviceContainer('legislature');
    let serviceResponse;

    serviceResponse = await legislatureService.doGetLegislatureList(
      request.query,
    );

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

const getLegislature = async (request, response) => {
  let responseCode, responseData;

  try {
    const legislatureService = await serviceContainer('legislature');
    let serviceResponse = await legislatureService.doGetLegislature(
      request.params,
    );

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
  getLegislatureList,
  getLegislature,
};
