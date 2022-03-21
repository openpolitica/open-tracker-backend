const ApiError = require("../utils/ApiError")

class ApiResponse {
  constructor() {
    this.status = ''
    this.statusCode = 0
    this.data = []
    this.message = ''
  }

  setSuccessResponse(apiResponse) {
    this.status = 'OK'
    this.statusCode = apiResponse.responseCode
    this.data = apiResponse.data
    this.message = apiResponse.message

    if (apiResponse.hasPagination) {
      this.totalPages = apiResponse.totalPages;
      this.totalElements = apiResponse.totalElements;
      this.hasNext = apiResponse.hasNext;
    }
  }

  setErrorResponse(error) {
    this.status = 'ERROR'
    this.statusCode = 500
    this.data = []
    this.message = error.message;

    if (error instanceof ApiError) {
      this.statusCode = error.httpStatusCode
    }
  }

  getResponseStatusCode() {
    return this.statusCode
  }
}

module.exports = new ApiResponse();