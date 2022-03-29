//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getBillStatusList = async request => {
  const billStatusService = await serviceContainer('bill-status');
  return await billStatusService.doGetBillStatusList(request.query);
};

const getBillStatus = async request => {
  const billStatusService = await serviceContainer('bill-status');
  return await billStatusService.doGetBillStatus(request.params);
};

module.exports = {
  getBillStatusList,
  getBillStatus,
};
