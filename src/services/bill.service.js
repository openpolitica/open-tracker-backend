'use strict';

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

  async function doGetBillList({ page, pageSize }) {
    try {
      let pageNumber = page ? page : 0;
      let pageSizeElements = pageSize ? pageSize : 10;
      const billList = await BillModel.findAndCountAll({
        offset: pageNumber * pageSizeElements,
        limit: pageSizeElements,
        include: [
          {
            model: CommitteeModel,
            as: 'last_committee',
            required: false,
          },
          {
            model: LegislatureModel,
            as: 'legislature',
            required: false,
          },
          {
            model: BillStatusModel,
            as: 'last_status',
            required: false,
          },
          {
            model: ParliamentaryGroupModel,
            as: 'parliamentary_group',
            required: false,
          },
          {
            model: BillAuthorshipModel,
            as: 'authorship',
            attributes: ['authorship_type'],
            //Separate query for join, if it's not used, trims the response fields
            required: false,
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
          },
        ],
        order: [['presentation_date', 'DESC']],
      });

      let totalPages = Math.ceil(billList.count / pageSizeElements);
      return baseService.getServiceResponse(
        200,
        'Success',
        billList.rows,
        totalPages,
        billList.count,
        pageNumber < totalPages - 1,
      );
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
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
      return baseService.getServiceResponse(200, 'Success', billDetail);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doGetBillList,
    doGetBill,
  };
};
