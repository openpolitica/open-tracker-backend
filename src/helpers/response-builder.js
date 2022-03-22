const ApiError = require('../utils/ApiError');

class ApiResponseBuilder {
  constructor() {
    this.response = {
      status: '',
      statusCode: 0,
      data: [],
      message: ''
    }
    this.pagination = {
      totalPages : 0,
      totalElements: 0,
      hasNext: false
    }
  }

  setSuccessResponse(response) {
    let apiResponse = response.getResponseData();
    
    this.response.status = 'OK';
    this.response.statusCode = apiResponse.responseCode;
    this.response.data = apiResponse.data;
    this.response.message = apiResponse.message;

    if (response.hasPagination()) {
      this.response = { ...this.response, ...this.pagination };
      this.response.totalPages = apiResponse.totalPages;
      this.response.totalElements = apiResponse.totalElements;
      this.response.hasNext = apiResponse.hasNext;
    }
  }

  setErrorResponse(error) {
    this.status = 'ERROR';
    this.statusCode = 500;
    this.data = [];
    this.message = error.message;

    if (error instanceof ApiError) {
      this.statusCode = error.httpStatusCode;
    }
  }

  getResponseStatusCode() {
    return this.response.statusCode;
  }

  getResponse() {
    return this.response;
  }
}

module.exports = ApiResponseBuilder;
