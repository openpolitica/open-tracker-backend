//Calling service container
const serviceContainer = require('../../../../services/service.container');

const getSearchResults = async request => {
  const searchService = await serviceContainer('search');
  return await searchService.doGetSearchResultList(request.query);
};

module.exports = {
  getSearchResults,
};
