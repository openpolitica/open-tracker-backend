const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getParliamentaryGroupList = async (request, response) => {
  let responseCode, responseData;

  try {
    const congresspersonService = await serviceContainer('parliamentary-group');
    let serviceResponse;

    serviceResponse = await congresspersonService.doGetParliamentaryGroupList(
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

const getParliamentaryGroup = async (request, response) => {
  let responseCode, responseData;

  try {
    const congresspersonService = await serviceContainer('parliamentary-group');

    let serviceResponse = await congresspersonService.doGetParliamentaryGroup(
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
  getParliamentaryGroupList,
  getParliamentaryGroup,
};