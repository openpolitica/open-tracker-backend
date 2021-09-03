'use strict';

const setupBaseService = require('./base.service');
const { Sequelize } = require('sequelize');

module.exports = function setupCongresistaService({
  ParliamentaryGroupModel,
  CongresspersonXParliamentaryGroupModel,
  CongresspersonModel,
  RoleModel,
  LocationModel,
  PlenaryModel,
}) {
  let baseService = new setupBaseService();

  async function doGetParliamentaryGroupList({ parliamentary_group_name }) {
    try {
      let where = parliamentary_group_name ? { parliamentary_group_name } : {};
      const parliamentaryGroupList = await ParliamentaryGroupModel.findAll({
        where,
        attributes: {
          include: [
            [
              Sequelize.fn('COUNT', Sequelize.col('congresspeople.cv_id')),
              'count',
            ],
          ],
        },
        include: [
          {
            model: CongresspersonXParliamentaryGroupModel,
            as: 'congresspeople',
            attributes: [],
            where: {
              end_date: null,
            },
            // To left join, including parliamentary_group that doesn't have
            // active congresspeople
            required: false,
          },
        ],
        group: ['ParliamentaryGroupModel.parliamentary_group_id'],
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
                include: [
                  {
                    model: LocationModel,
                    as: 'location',
                  },
                  {
                    model: PlenaryModel,
                    as: 'plenary',
                  },
                ],
              },
              { model: RoleModel, as: 'role_detail' },
            ],
            order: [
              ['congressperson', 'id_name', 'ASC'],
              ['congressperson', 'id_first_surname', 'ASC'],
              ['congressperson', 'id_second_surname', 'ASC'],
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
