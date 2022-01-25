'use strict';

const setupBaseService = require('./base.service');
const { Sequelize } = require('sequelize');

module.exports = function setupLegislatureService({
  LegislatureModel,
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
      return baseService.getServiceResponse(200, 'Success', billStatusList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
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
      return baseService.getServiceResponse(200, 'Success', billStatusDetail);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doGetBillStatusList,
    doGetBillStatus,
  };
};