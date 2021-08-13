const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getCongresspersonList = async (request, response) => {
  let responseCode, responseData;

  try {
    const congresspersonService = await serviceContainer('congressperson');

    const serviceResponse = await congresspersonService.doListCongressperson();

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
  getCongresspersonList,
};
