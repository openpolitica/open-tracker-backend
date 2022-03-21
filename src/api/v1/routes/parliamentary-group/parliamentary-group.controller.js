//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getParliamentaryGroupList = async (request) => {
  try {
    const parliamentaryGroupService = await serviceContainer(
      'parliamentary-group',
    );
    return await parliamentaryGroupService.doGetParliamentaryGroupList(
        request.query,
      );
  } catch (error) {
    throw error
  }
};

const getParliamentaryGroup = async (request) => {
  try {
    const parliamentaryGroupService = await serviceContainer(
      'parliamentary-group',
    );
    return await parliamentaryGroupService.doGetParliamentaryGroup(request.params);
  } catch (error) {
    throw error
  }
};

module.exports = {
  getParliamentaryGroupList,
  getParliamentaryGroup,
};
