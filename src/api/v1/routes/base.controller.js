'use strict';

class baseController {
  constructor() {
    this.successStatus = 'OK';
    this.errorStatus = 'ERROR';
    this.responseData = {
      status: '',
      data: {},
      message: '',
      totalPages: 0,
      totalElements: 0,
      hasNext: false,
    };
  }

  getSuccessResponse(
    data,
    message,
    totalPages = 0,
    totalElements = 0,
    hasNext = false,
  ) {
    this.responseData.status = this.successStatus;
    this.responseData.data = data;
    this.responseData.message = message;
    this.responseData.totalPages = totalPages;
    this.responseData.totalElements = totalElements;
    this.responseData.hasNext = hasNext;
    return this.responseData;
  }

  getErrorResponse(message) {
    this.responseData.status = this.errorStatus;
    this.responseData.data = {};
    this.responseData.message = message;
    this.responseData.totalPages = 0;
    this.responseData.totalElements = 0;
    this.responseData.hasNext = false;
    return this.responseData;
  }
}

module.exports = baseController;
