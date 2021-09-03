const setupBaseController = require('../base.controller');

//Calling service container
const serviceContainer = require('../../../../services/service.container');

let baseController = new setupBaseController();

const getSearchResults = async (request, response) => {
  let responseCode, responseData;

  try {
    const searchService = await serviceContainer('search');
    let serviceResponse = await searchService.doGetSearchResultList(
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

module.exports = {
  getSearchResults,
};
