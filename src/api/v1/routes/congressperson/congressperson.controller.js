//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getCongresspersonList = async request => {
  const congresspersonService = await serviceContainer('congressperson');
  return await congresspersonService.doGetCongresspersonList(request.query);
};

const getCongresspersonDetail = async request => {
  const congresspersonService = await serviceContainer('congressperson');
  return await congresspersonService.doGetCongresspersonDetail(request.params);
};

const getCongresspersonBills = async request => {
  const congresspersonService = await serviceContainer('congressperson');
  return await congresspersonService.doGetCongresspersonBills(
    request.params,
    request.query,
  );
};

module.exports = {
  getCongresspersonList,
  getCongresspersonDetail,
  getCongresspersonBills,
};
