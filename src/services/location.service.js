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

  async function doGetLocationList({ ubigeo }) {
    try {
      let where = ubigeo ? { ubigeo } : {};
      const locationList = await LocationModel.findAll({
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
            model: CongresspersonModel,
            as: 'congresspeople',
            attributes: [],
            // To left join, including location that doesn't have
            // active congresspeople
            required: false,
          },
        ],
        group: ['LocationModel.ubigeo'],
        order: [['location_name', 'ASC']],
      });
      return baseService.setResponse(locationList);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  async function doGetLocation({ slug, id }) {
    try {
      const where = slug ? { location_slug: slug } : id ? { ubigeo: id } : {};
      const locationDetail = await LocationModel.findOne({
        where,
        include: [
          {
            model: CongresspersonModel,
            as: 'congresspeople',
            //Separate query for join, if it's not used, trims the response fields
            separate: true,
            include: [
              {
                model: PlenaryModel,
                as: 'plenary',
              },
              {
                model: CongresspersonXParliamentaryGroupModel,
                as: 'congressperson_parliamentary_groups',
                attributes: ['start_date', 'end_date'],
                //Separate query for join, if it's not used, trims the response fields
                separate: true,
                include: [
                  {
                    model: ParliamentaryGroupModel,
                    as: 'parliamentary_group',
                  },
                  { model: RoleModel, as: 'role_detail' },
                ],
              },
            ],
            order: [
              ['id_name', 'ASC'],
              ['id_first_surname', 'ASC'],
              ['id_second_surname', 'ASC'],
            ],
          },
        ],
      });
      return baseService.setResponse(locationDetail);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  return {
    doGetLocationList,
    doGetLocation,
  };
};
