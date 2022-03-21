//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getCommitteeList = async (request) => {
  try {
    const committeeService = await serviceContainer('committee');
    return await committeeService.doGetCommitteeList(request.query);
  } catch (error) {
    throw error
  }
};

const getCommittee = async (request) => {
  try {
    const committeeService = await serviceContainer('committee');
    return await committeeService.doGetCommittee(request.params);
  } catch (error) {
    throw error
  }
};

module.exports = {
  getCommitteeList,
  getCommittee,
};
