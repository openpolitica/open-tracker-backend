//Calling service container
const serviceContainer = require('../../../../services/service.container');
const getLocationList = async (request) => {
  try {
    const locationService = await serviceContainer('location');
    return await locationService.doGetLocationList(request.query);
  } catch (error) {
    throw error
  }
};

const getLocation = async (request) => {
  try {
    const locationService = await serviceContainer('location');
    return await locationService.doGetLocation(request.params);
  } catch (error) {
    throw error
  }
};

module.exports = {
  getLocationList,
  getLocation,
};
