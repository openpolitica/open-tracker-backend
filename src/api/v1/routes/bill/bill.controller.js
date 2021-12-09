const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getBillList = async (request, response) => {
  let responseCode, responseData;

  try {
    const billService = await serviceContainer('bill');
    let serviceResponse;

    serviceResponse = await billService.doGetBillList(request.query);

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

const getBill = async (request, response) => {
  let responseCode, responseData;

  try {
    const billService = await serviceContainer('bill');
    let serviceResponse = await billService.doGetBill(request.params);

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
  getBillList,
  getBill,
};
