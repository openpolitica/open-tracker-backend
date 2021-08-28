'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCongresistaService({ ParliamentaryGroupModel }) {
  let baseService = new setupBaseService();

  async function doGetParliamentaryGroupList({
    slug,
    parliamentary_group_name,
  }) {
    try {
      let conditions = slug
        ? {
            where: { slug },
          }
        : parliamentary_group_name
        ? {
            where: { parliamentary_group_name },
          }
        : {};
      const parliamentaryGroupList = await ParliamentaryGroupModel.findAll(
        conditions,
      );
      return baseService.getServiceResponse(
        200,
        'Success',
        parliamentaryGroupList,
      );
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  async function doGetParliamentaryGroup({ id }) {
    try {
      const where = { parliamentary_group_id: id };
      const parliamentaryGroupDetail = await ParliamentaryGroupModel.findAll({
        where,
      });
      return baseService.getServiceResponse(
        200,
        'Success',
        parliamentaryGroupDetail,
      );
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doGetParliamentaryGroupList,
    doGetParliamentaryGroup,
  };
};
