//Calling service container
const serviceContainer = require('../../../../services/service.container');
const getLocationList = async request => {
  const locationService = await serviceContainer('location');
  return await locationService.doGetLocationList(request.query);
};

const getLocation = async request => {
  const locationService = await serviceContainer('location');
  return await locationService.doGetLocation(request.params);
};

module.exports = {
  getLocationList,
  getLocation,
};
