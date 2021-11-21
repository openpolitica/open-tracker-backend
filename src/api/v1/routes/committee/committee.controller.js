const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getCommitteeList = async (request, response) => {
  let responseCode, responseData;

  try {
    const committeeService = await serviceContainer('committee');
    let serviceResponse;

    serviceResponse = await committeeService.doGetCommitteeList(request.query);

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

const getCommittee = async (request, response) => {
  let responseCode, responseData;

  try {
    const committeeService = await serviceContainer('committee');
    let serviceResponse = await committeeService.doGetCommittee(request.params);

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
  getCommitteeList,
  getCommittee,
};
