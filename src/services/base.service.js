'use strict';

class baseService {
  constructor() {
    this.returnData = {
      status: false,
      data: {},
      message: '',
      responseCode: 200,
      totalPages: 0,
      totalElements: 0,
      hasNext: false,
    };
  }

  getServiceResponse(
    responseCode,
    message,
    data,
    totalPages = 0,
    totalElements = 0,
    hasNext = false,
  ) {
    this.returnData.message = message;
    this.returnData.responseCode = responseCode;
    this.returnData.data = data;
    this.returnData.totalPages = totalPages;
    this.returnData.totalElements = totalElements;
    this.returnData.hasNext = hasNext;
    return this.returnData;
  }
}

module.exports = baseService;
