'use strict';

const ApiError = require('./../utils/ApiError');

class baseService {
  constructor() {
    this.returnData = {
      data: {},
      message: '',
      responseCode: 200
    };

    this.pagination = {
      totalPages: 0,
      totalElements: 0,
      hasNext: false,
    }
    this.paginated = false
  }

  setPaginationResponse(totalPages, totalElements, hasNext) {
    this.returnData = { ...this.returnData, ...this.pagination };
    this.paginated = true;
    this.returnData.totalPages = totalPages;
    this.returnData.totalElements = totalElements;
    this.returnData.hasNext = hasNext;
  }

  hasPagination() {
    return this.paginated;
  }

  processError(error) {
    console.error('Error: ', error.message);
    if (process.env.NODE_ENV !== 'production') console.log('StackTrace:\n', error.stack);
    throw error;
  }

  throwErrorResponse(error, statusCode) {
    if (error instanceof ApiError) throw this.processError(error);
    throw this.processError(new ApiError(error.message, statusCode));
  }

  setResponse(data, message = 'SUCCESS', responseCode = 200) {
    this.returnData.responseCode = responseCode;
    this.returnData.message = message;
    this.returnData.data = data;
    return this
  }

  setPaginatedResponse(data, totalPages = 0, totalElements = 0, hasNext = false, message = 'SUCCESS', responseCode = 200) {
    this.setPaginationResponse(totalPages, totalElements, hasNext)
    return this.setResponse(data, message, responseCode)
  }

  getServiceResponse() {
    return this.returnData;
  }
}

module.exports = baseService;
