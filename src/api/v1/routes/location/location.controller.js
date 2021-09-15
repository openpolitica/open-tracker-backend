const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getLocationList = async (request, response) => {
  let responseCode, responseData;

  try {
    const locationService = await serviceContainer('location');
    let serviceResponse;

    serviceResponse = await locationService.doGetLocationList(request.query);

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

const getLocation = async (request, response) => {
  let responseCode, responseData;

  try {
    const locationService = await serviceContainer('location');
    let serviceResponse = await locationService.doGetLocation(request.params);

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
  getLocationList,
  getLocation,
};
