'use strict';

const setupBaseService = require('./base.service');
const { Sequelize } = require('sequelize');

module.exports = function setupLegislatureService({
  LegislatureModel,
  BillModel,
}) {
  let baseService = new setupBaseService();

  async function doGetLegislatureList({ slug: legislature_slug }) {
    try {
      let where = legislature_slug ? { legislature_slug } : {};
      const legislatureList = await LegislatureModel.findAll({
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
        group: ['LegislatureModel.legislature_id'],
        order: [['legislature_order', 'DESC']],
      });
      return baseService.getServiceResponse(200, 'Success', legislatureList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  async function doGetLegislature({ slug, id }) {
    try {
      const where = slug
        ? { legislature_slug: slug }
        : id
        ? { legislature_id: id }
        : {};
      const legislatureDetail = await LegislatureModel.findOne({
        where,
        include: [
          {
            model: BillModel,
            as: 'bill',
            //Separate query for join, if it's not used, trims the response fields
            separate: true,
            order: [['number', 'DESC']],
          },
        ],
      });
      return baseService.getServiceResponse(200, 'Success', legislatureDetail);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doGetLegislatureList,
    doGetLegislature,
  };
};
