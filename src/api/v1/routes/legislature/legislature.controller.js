//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getLegislatureList = async request => {
  const legislatureService = await serviceContainer('legislature');
  return await legislatureService.doGetLegislatureList(request.query);
};

const getLegislature = async request => {
  const legislatureService = await serviceContainer('legislature');
  return await legislatureService.doGetLegislature(request.params);
};

module.exports = {
  getLegislatureList,
  getLegislature,
};
