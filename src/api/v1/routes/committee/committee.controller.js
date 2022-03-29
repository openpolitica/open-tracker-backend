//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getCommitteeList = async request => {
  const committeeService = await serviceContainer('committee');
  return await committeeService.doGetCommitteeList(request.query);
};

const getCommittee = async request => {
  const committeeService = await serviceContainer('committee');
  return await committeeService.doGetCommittee(request.params);
};

module.exports = {
  getCommitteeList,
  getCommittee,
};
