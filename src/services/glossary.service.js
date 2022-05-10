'use strict';

const setupBaseService = require('./base.service');
const { Sequelize } = require('sequelize');

module.exports = function setupGlossaryService({
  GlossaryModel,
  CategoryModel,
}) {
  let baseService = new setupBaseService();

  async function doGetTermList({ slug }) {
    try {
      let where = slug ? { glossary_id: slug } : {};
      const termList = await GlossaryModel.findAll({
        where,
        include: [
          {
            model: CategoryModel,
            as: 'category',
            required: false,
          },
        ],
        order: [['glossary_id', 'ASC']],
      });
      return baseService.setResponse(termList);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  async function doGetTerm({ slug }) {
    try {
      const where = slug ? { glossary_id: slug } : {};
      const termDetail = await GlossaryModel.findOne({
        where,
        include: [
          {
            model: CategoryModel,
            as: 'category',
            separate: false,
          },
        ],
      });
      return baseService.setResponse(termDetail);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  async function doGetCategoryList({ slug }) {
    try {
      let where = slug ? { category_id: slug } : {};
      const categoryList = await CategoryModel.findAll({
        where,
        attributes: {
          include: [
            [
              Sequelize.fn('COUNT', Sequelize.col('terms.glossary_id')),
              'count',
            ],
          ],
        },
        include: [
          {
            model: GlossaryModel,
            as: 'terms',
            attributes: [],
            required: false,
          },
        ],
        group: ['CategoryModel.category_id'],
        order: [['category_id', 'ASC']],
      });
      return baseService.setResponse(categoryList);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  async function doGetCategory({ slug }) {
    try {
      const where = slug ? { category_id: slug } : {};
      const categoryDetail = await CategoryModel.findOne({
        where,
        include: [
          {
            model: GlossaryModel,
            as: 'terms',
            separate: true,
          },
        ],
      });
      return baseService.setResponse(categoryDetail);
    } catch (error) {
      baseService.throwErrorResponse(error);
    }
  }

  return {
    doGetTermList,
    doGetTerm,
    doGetCategoryList,
    doGetCategory,
  };
};
