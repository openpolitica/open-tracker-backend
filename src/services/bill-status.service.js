'use strict';

const setupBaseService = require('./base.service');
const { Sequelize } = require('sequelize');

module.exports = function setupLegislatureService({
  BillModel,
  BillStatusModel,
}) {
  let baseService = new setupBaseService();

  async function doGetBillStatusList({ slug: bill_status_slug }) {
    try {
      let where = bill_status_slug ? { bill_status_slug } : {};
      const billStatusList = await BillStatusModel.findAll({
        where,
        attributes: {
          include: [[Sequelize.fn('COUNT', Sequelize.col('bill.id')), 'count']],
        },
        include: [
          {
            model: BillModel,
            as: 'bill',
            attributes: [],
            // To left join, including location that doesn't have
            // active congresspeople
            required: false,
          },
        ],
        group: ['BillStatusModel.bill_status_id'],
        order: [['bill_status_name', 'ASC']],
      });
      return baseService.setResponse(billStatusList);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  async function doGetBillStatus({ slug, id }) {
    try {
      const where = slug
        ? { bill_status_slug: slug }
        : id
        ? { bill_status_id: id }
        : {};
      const billStatusDetail = await BillStatusModel.findOne({
        where,
        include: [
          {
            model: BillModel,
            as: 'bill',
            //Separate query for join, if it's not used, trims the response fields
            separate: true,
            order: [['presentation_date', 'ASC']],
          },
        ],
      });
      return baseService.setResponse(billStatusDetail);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  return {
    doGetBillStatusList,
    doGetBillStatus,
  };
};
