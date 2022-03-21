//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getParliamentaryGroupList = async request => {
  const parliamentaryGroupService = await serviceContainer(
    'parliamentary-group',
  );
  return await parliamentaryGroupService.doGetParliamentaryGroupList(
    request.query,
  );
};

const getParliamentaryGroup = async request => {
  const parliamentaryGroupService = await serviceContainer(
    'parliamentary-group',
  );
  return await parliamentaryGroupService.doGetParliamentaryGroup(
    request.params,
  );
};

module.exports = {
  getParliamentaryGroupList,
  getParliamentaryGroup,
};
