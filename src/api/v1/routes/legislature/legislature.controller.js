//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getLegislatureList = async (request) => {
  try {
    const legislatureService = await serviceContainer('legislature');
    return await legislatureService.doGetLegislatureList(
      request.query,
    );
  } catch (error) {
    throw error
  }
};

const getLegislature = async (request) => {
  try {
    const legislatureService = await serviceContainer('legislature');
    return await legislatureService.doGetLegislature(
      request.params,
    );
  } catch (error) {
    throw error
  }
};

module.exports = {
  getLegislatureList,
  getLegislature,
};
