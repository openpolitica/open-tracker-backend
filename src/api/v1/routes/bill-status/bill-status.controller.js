const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getBillStatusList = async (request, response) => {
  let responseCode, responseData;

  try {
    const billStatusService = await serviceContainer('bill-status');
    let serviceResponse;

    serviceResponse = await billStatusService.doGetBillStatusList(
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

const getBillStatus = async (request, response) => {
  let responseCode, responseData;

  try {
    const billStatusService = await serviceContainer('bill-status');
    let serviceResponse = await billStatusService.doGetBillStatus(
      request.params,
    );

    responseCode = serviceResponse.responseCode;
    responseData = baseController.getSuccessResponse(
      serviceResponse.data,
      serviceResponse.message,
    );
  } catch (error) {
    console.log(error);
    responseData = baseController.getErrorResponse(
      'Error obtaining information',
    );
  }

  return response.status(responseCode).json(responseData);
};

module.exports = {
  getBillStatusList,
  getBillStatus,
};
