'use strict';
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const setupBaseService = require('./base.service');

module.exports = function setupBillService({
  ParliamentaryGroupModel,
  CongresspersonModel,
  BillModel,
  BillStatusModel,
  LegislatureModel,
  BillAuthorshipModel,
  BillTrackingModel,
  BillGroupedModel,
  LocationModel,
  CommitteeModel,
  PlenaryModel,
}) {
  let baseService = new setupBaseService();

  async function doGetBillList({
    page,
    pageSize,
    legislature,
    billStatus,
    committee,
    author,
  }) {
    try {
      let pageNumber = page ? (page == 0 ? 1 : page) : 1;
      let pageSizeElements = pageSize ? pageSize : 10;
      let where_and = [];
      let authorship_where = {};

      // Include statement by default, used when no author parameter is provided
      let authorship_model_include = {
        model: BillAuthorshipModel,
        as: 'authorship',
        attributes: ['authorship_type'],
        required: true,
        //Separate query for join, if it's not used, trims the response fields
        separate: true,
        include: [
          {
            model: CongresspersonModel,
            as: 'congressperson',
          },
        ],
        order: [
          ['authorship_type', 'ASC'],
          ['congressperson', 'id_name', 'ASC'],
          ['congressperson', 'id_first_surname', 'ASC'],
          ['congressperson', 'id_second_surname', 'ASC'],
        ],
      };

      if (legislature) {
        where_and.push(
          sequelize.where(
            sequelize.col('legislature.legislature_order'),
            Op.eq,
            legislature,
          ),
        );
      }

      if (billStatus) {
        where_and.push(
          sequelize.where(
            sequelize.col('last_status.bill_status_slug'),
            Op.eq,
            billStatus,
          ),
        );
      }

      if (committee) {
        where_and.push(
          sequelize.where(
            sequelize.col('last_committee.committee_slug'),
            Op.eq,
            committee,
          ),
        );
      }

      if (author) {
        authorship_where = {
          congressperson_slug: author,
        };

        // Filter the results without affecting the count
        authorship_model_include = {
          model: CongresspersonModel,
          as: 'congressperson',
          where: authorship_where,
          through: {
            attributes: ['authorship_type'],
            as: 'authorship',
            separate: false,
            order: [
              ['authorship_type', 'ASC'],
              ['congressperson', 'id_name', 'ASC'],
              ['congressperson', 'id_first_surname', 'ASC'],
              ['congressperson', 'id_second_surname', 'ASC'],
            ],
          },
        };
      }

      let where = where_and
        ? {
            [Op.and]: where_and,
          }
        : {};

      const billList = await BillModel.findAndCountAll({
        where,
        benchmark: true,
        offset: (pageNumber - 1) * pageSizeElements,
        limit: pageSizeElements,
        include: [
          {
            model: CommitteeModel,
            as: 'last_committee',
            required: !!committee,
          },
          {
            model: LegislatureModel,
            as: 'legislature',
            required: !!legislature,
          },
          {
            model: BillStatusModel,
            as: 'last_status',
            required: !!billStatus,
          },
          {
            model: ParliamentaryGroupModel,
            as: 'parliamentary_group',
            required: false,
          },

          // Authorship model defined by the existence of the 'author' parameter
          authorship_model_include,

          {
            model: BillTrackingModel,
            as: 'tracking',
            attributes: ['date', 'details'],
            separate: true,
            include: [
              {
                model: CommitteeModel,
                as: 'committee',
              },
              {
                model: BillStatusModel,
                as: 'status',
              },
            ],
            order: [['date', 'DESC']],
          },
        ],
        order: [
          ['presentation_date', 'DESC'],
          ['number', 'DESC'],
        ],
      });

      let totalPages = Math.ceil(billList.count / pageSizeElements);
      return baseService.setPaginatedResponse(
        billList.rows,
        totalPages,
        billList.count,
        pageNumber < totalPages - 1,
      );
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  async function doGetBill({ id }) {
    try {
      const where = id ? { id: id } : {};
      const billDetail = await BillModel.findOne({
        where,
        include: [
          {
            model: CommitteeModel,
            as: 'last_committee',
          },
          {
            model: LegislatureModel,
            as: 'legislature',
          },
          {
            model: ParliamentaryGroupModel,
            as: 'parliamentary_group',
          },
          {
            model: BillStatusModel,
            as: 'last_status',
          },
          {
            model: BillAuthorshipModel,
            as: 'authorship',
            attributes: ['authorship_type'],
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
            ],
            order: [
              ['authorship_type', 'ASC'],
              ['congressperson', 'id_name', 'ASC'],
              ['congressperson', 'id_first_surname', 'ASC'],
              ['congressperson', 'id_second_surname', 'ASC'],
            ],
          },
          {
            model: BillTrackingModel,
            as: 'tracking',
            attributes: ['date', 'details'],
            separate: true,
            include: [
              {
                model: CommitteeModel,
                as: 'committee',
              },
              {
                model: BillStatusModel,
                as: 'status',
              },
            ],
            order: [['date', 'DESC']],
          },
          {
            model: BillGroupedModel,
            as: 'grouped_initiative',
            include: [
              {
                model: BillModel,
                as: 'bill',
              },
            ],
          },
        ],
      });
      return baseService.setResponse(billDetail);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  return {
    doGetBillList,
    doGetBill,
  };
};
