//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getBillList = async request => {
  const billService = await serviceContainer('bill');
  return await billService.doGetBillList(request.query);
};

const getBill = async request => {
  const billService = await serviceContainer('bill');
  return await billService.doGetBill(request.params);
};

const getBillStatistics = async request => {
  const billService = await serviceContainer('bill');
  return await billService.doGetBillStatistics(request.query);
};

module.exports = {
  getBillList,
  getBill,
  getBillStatistics,
};
