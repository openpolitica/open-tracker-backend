//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getSearchResults = async (request) => {
  try {
    const searchService = await serviceContainer('search');
    return await searchService.doGetSearchResultList(
      request.query,
    );
  } catch (error) {
    throw error
  }
};

module.exports = {
  getSearchResults,
};
