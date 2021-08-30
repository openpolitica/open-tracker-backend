'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCongresistaService({ ParliamentaryGroupModel }) {
  let baseService = new setupBaseService();

  async function doGetParliamentaryGroupList({ parliamentary_group_name }) {
    try {
      let where = parliamentary_group_name ? { parliamentary_group_name } : {};
      const parliamentaryGroupList = await ParliamentaryGroupModel.findAll({
        where,
        order: [['parliamentary_group_name', 'ASC']],
      });
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

  async function doGetParliamentaryGroup({ slug, id }) {
    try {
      const where = slug
        ? { parliamentary_group_slug: slug }
        : id
        ? { parliamentary_group_id: id }
        : {};
      const parliamentaryGroupDetail = await ParliamentaryGroupModel.findOne({
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
