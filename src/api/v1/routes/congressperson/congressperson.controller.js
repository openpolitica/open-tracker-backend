//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getCongresspersonList = async (request) => {
  try {
    const congresspersonService = await serviceContainer('congressperson');
    return await congresspersonService.doGetCongresspersonList(
      request.query,
    );
  } catch (error) {
    throw error
  }
};

const getCongresspersonDetail = async (request) => {
  try {
    const congresspersonService = await serviceContainer('congressperson');
    return await congresspersonService.doGetCongresspersonDetail(
      request.params,
    );
  } catch (error) {
    throw error
  }
};

module.exports = {
  getCongresspersonList,
  getCongresspersonDetail,
};
