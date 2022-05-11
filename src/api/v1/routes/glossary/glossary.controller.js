//Calling service container
const serviceContainer = require('../../../../services/service.container');
const getTermList = async request => {
  const glossaryService = await serviceContainer('glossary');
  return await glossaryService.doGetTermList(request.query);
};

const getTerm = async request => {
  const glossaryService = await serviceContainer('glossary');
  return await glossaryService.doGetTerm(request.params);
};

const getCategoryList = async request => {
  const glossaryService = await serviceContainer('glossary');
  return await glossaryService.doGetCategoryList(request.query);
};

const getCategory = async request => {
  const glossaryService = await serviceContainer('glossary');
  return await glossaryService.doGetCategory(request.params);
};

module.exports = {
  getTermList,
  getTerm,
  getCategoryList,
  getCategory,
};
