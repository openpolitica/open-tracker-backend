'use strict';
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');
const {
  parseStringWithFormat,
  parseDateToFormat,
} = require('../utils/DateUtils');

const setupBaseService = require('./base.service');

module.exports = function setupBillService({
  ParliamentaryGroupModel,
  CongresspersonModel,
  CongresspersonXParliamentaryGroupModel,
  BillModel,
  BillStatusModel,
  LegislatureModel,
  BillAuthorshipModel,
  BillTrackingModel,
  BillGroupedModel,
  LocationModel,
  CommitteeModel,
  PlenaryModel,
  SocialNetworkModel,
  SocialNetworkXCongresspersonModel,
}) {
  let baseService = new setupBaseService();

  async function doGetBillList({
    page,
    pageSize,
    legislature,
    billStatus,
    committee,
    author,
    date,
    all,
    enable,
  }) {
    try {
      let pageNumber = page ? (page == 0 ? 1 : page) : 1;
      let pageSizeElements = pageSize ? pageSize : 10;
      let where_and = [];
      let authorship_where = {};
      let authorship_model_include = null;
      let enabled_fields = enable ? enable.split(',') : [];

      // Authorship model defined by the existence of the 'author' parameter
      //
      let bill_authorship_include = {
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

      if (enabled_fields.length) {
        for (const field of enabled_fields) {
          switch (field) {
            case 'social_network':
              bill_authorship_include.include[0].include = [
                {
                  model: SocialNetworkXCongresspersonModel,
                  as: 'social_networks',
                  separate: true,
                  include: [
                    {
                      model: SocialNetworkModel,
                      as: 'social_network',
                    },
                  ],
                },
              ];
              break;

            default:
              break;
          }
        }
      }

      let includes = [
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
      ];

      includes.push(bill_authorship_include);

      if (legislature) {
        where_and.push(
          sequelize.where(
            sequelize.col('legislature.legislature_order'),
            Op.eq,
            legislature,
          ),
        );
      }

      if (date) {
        where_and.push(
          sequelize.where(sequelize.col('presentation_date'), Op.eq, date),
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
          attributes: [],
          where: authorship_where,
          through: {
            attributes: [],
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

        includes.push(authorship_model_include);
      }

      let where = where_and
        ? {
            [Op.and]: where_and,
          }
        : {};

      let conditionalAll = all && where_and.length > 0;

      const billList = await BillModel.findAndCountAll({
        where,
        benchmark: true,
        offset: conditionalAll ? null : (pageNumber - 1) * pageSizeElements,
        limit: conditionalAll ? null : pageSizeElements,
        include: includes,
        order: [
          ['presentation_date', 'DESC'],
          ['number', 'DESC'],
        ],
      });

      let totalPages = conditionalAll
        ? 1
        : Math.ceil(billList.count / pageSizeElements);
      return baseService.setPaginatedResponse(
        billList.rows,
        totalPages,
        billList.count,
        pageNumber < totalPages,
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
                  {
                    model: SocialNetworkXCongresspersonModel,
                    as: 'social_networks',
                    separate: true,
                    include: [
                      {
                        model: SocialNetworkModel,
                        as: 'social_network',
                      },
                    ],
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
                    ],
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

  async function doGetBillStatistics({ startdate, enddate, showlist = false }) {
    try {
      const dateFormat = 'YYYY-MM-DD';
      const start = parseStringWithFormat(startdate, dateFormat);
      const end = enddate
        ? parseStringWithFormat(enddate, dateFormat)
        : new Date();

      const presentedBills = await BillModel.findAll({
        where: {
          [Op.and]: [
            {
              '$tracking.date$': {
                [Op.between]: [start, end],
              },
            },
            {
              '$tracking.status.bill_status_name$': 'Presentado',
            },
          ],
        },
        include: [
          {
            model: BillTrackingModel,
            as: 'tracking',
            attributes: ['date'],
            include: [
              {
                model: BillStatusModel,
                as: 'status',
                attributes: ['bill_status_name'],
              },
            ],
          },
        ],
      });

      let declarativeBills = presentedBills.filter(item => {
        let title = item.title.toLowerCase();
        return title.indexOf('declara') >= 0;
      });

      let response = {
        total: presentedBills.length,
        declarative: declarativeBills.length,
        start_date: parseDateToFormat(start, 'DD/MM/YYYY'),
        end_date: parseDateToFormat(end, 'DD/MM/YYYY'),
      };

      if (showlist === 'true') {
        response = { ...response, billList: presentedBills };
      }

      return baseService.setResponse(response);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  return {
    doGetBillList,
    doGetBill,
    doGetBillStatistics,
  };
};
