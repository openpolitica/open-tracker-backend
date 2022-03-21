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

module.exports = {
  getCongresspersonList,
  getCongresspersonDetail,
};
