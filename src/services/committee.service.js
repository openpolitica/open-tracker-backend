'use strict';

const setupBaseService = require('./base.service');
const { Sequelize } = require('sequelize');

module.exports = function setupCommitteeService({
  ParliamentaryGroupModel,
  ParliamentaryGroupXCommitteeModel,
  CongresspersonXCommitteeModel,
  CongresspersonModel,
  CommitteeModel,
  RoleModel,
  BillModel,
  BillTrackingModel,
  LocationModel,
  CommitteeTypeModel,
  PlenaryModel,
}) {
  let baseService = new setupBaseService();

  async function doGetCommitteeList({ committee_name }) {
    try {
      let where = committee_name ? { committee_name } : {};
      const committeeList = await CommitteeModel.findAll({
        where,
        attributes: {
          include: [
            [
              Sequelize.fn('COUNT', Sequelize.col('congresspeople.cv_id')),
              'congressperson_count',
            ],
          ],
        },
        include: [
          {
            model: CongresspersonXCommitteeModel,
            as: 'congresspeople',
            attributes: [],
            where: {
              end_date: null,
            },
            // To left join, including committee that doesn't have
            // active congresspeople
            required: false,
          },
          {
            model: CommitteeTypeModel,
            as: 'committee_type',
          },
        ],
        group: [
          'CommitteeModel.committee_id',
          'committee_type.committee_type_id',
        ],
        order: [['committee_name', 'ASC']],
      });
      return baseService.getServiceResponse(200, 'Success', committeeList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  async function doGetCommittee({ slug, id }) {
    try {
      const where = slug
        ? { committee_slug: slug }
        : id
        ? { committee_id: id }
        : {};
      const committeeDetail = await CommitteeModel.findOne({
        where,
        include: [
          {
            model: CongresspersonXCommitteeModel,
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
          {
            model: ParliamentaryGroupXCommitteeModel,
            as: 'committee_parliamentary_groups',
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
          {
            model: BillModel,
            as: 'current_bills',
            separate: true,
          },
          {
            model: BillTrackingModel,
            as: 'all_bills',
            separate: true,
            include: [
              {
                model: BillModel,
                as: 'bill',
              },
            ],
          },
        ],
      });
      return baseService.getServiceResponse(200, 'Success', committeeDetail);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doGetCommitteeList,
    doGetCommittee,
  };
};
