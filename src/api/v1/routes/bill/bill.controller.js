//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getBillList = async (request) => {
  try {
    const billService = await serviceContainer('bill');
    return await billService.doGetBillList(request.query);
  } catch (error) {
    throw error
  }
};

const getBill = async (request) => {
  try {
    const billService = await serviceContainer('bill');
    return await billService.doGetBill(request.params);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBillList,
  getBill,
};
