//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getBillStatusList = async (request) => {
  try {
    const billStatusService = await serviceContainer('bill-status');
    return await billStatusService.doGetBillStatusList(
      request.query,
    );
  } catch (error) {
    throw error
  }
};

const getBillStatus = async (request) => {
  try {
    const billStatusService = await serviceContainer('bill-status');
    return await billStatusService.doGetBillStatus(
      request.params,
    );
  } catch (error) {
    throw error
  }
};

module.exports = {
  getBillStatusList,
  getBillStatus,
};
