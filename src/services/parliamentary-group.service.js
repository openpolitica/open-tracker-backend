'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCongresistaService({
  ParliamentaryGroupModel,
  CongresspersonXParliamentaryGroupModel,
  CongresspersonModel,
  RoleModel,
}) {
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
        include: [
          {
            model: CongresspersonXParliamentaryGroupModel,
            as: 'congresspeople',
            attributes: ['start_date', 'end_date'],
            //Separate query for join, if it's not used, trims the response fields
            separate: true,
            include: [
              {
                model: CongresspersonModel,
                as: 'congressperson',
              },
              { model: RoleModel, as: 'role_detail' },
            ],
          },
        ],
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
