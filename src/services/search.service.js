'use strict';

const setupBaseService = require('./base.service');
const { Op } = require('sequelize');

module.exports = function setupCongresistaService({
  CongresspersonModel,
  PoliticalPartyModel,
  ParliamentaryGroupModel,
  CommissionModel,
}) {
  let baseService = new setupBaseService();

  async function doGetSearchResultList({ query, limit = 3 }) {
    try {
      const wildcardQuery = '%' + query + '%';

      const congressperson = await CongresspersonModel.findAll({
        where: {
          [Op.or]: [
            {
              id_name: {
                [Op.iLike]: wildcardQuery,
              },
            },
            {
              id_first_surname: {
                [Op.iLike]: wildcardQuery,
              },
            },
            {
              id_second_surname: {
                [Op.iLike]: wildcardQuery,
              },
            },
          ],
        },
        limit,
      });

      const political_party = await PoliticalPartyModel.findAll({
        where: {
          [Op.or]: [
            {
              political_party_jne_name: {
                [Op.iLike]: wildcardQuery,
              },
            },
            {
              political_party_name: {
                [Op.iLike]: wildcardQuery,
              },
            },
          ],
        },
        limit,
      });

      const parliamentary_group = await ParliamentaryGroupModel.findAll({
        where: {
          parliamentary_group_name: {
            [Op.iLike]: wildcardQuery,
          },
        },
        limit,
      });

      const commission = await CommissionModel.findAll({
        where: {
          commission_name: {
            [Op.iLike]: wildcardQuery,
          },
        },
        limit,
      });

      const searchResultList = {
        congressperson,
        political_party,
        parliamentary_group,
        commission,
      };
      return baseService.getServiceResponse(200, 'Success', searchResultList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doGetSearchResultList,
  };
};