'use strict';

const setupBaseService = require('./base.service');
const { Op, col, fn, Sequelize } = require('sequelize');

module.exports = function setupCongresistaService({
  CongresspersonModel,
  PoliticalPartyModel,
  ParliamentaryGroupModel,
  CommitteeModel,
  LocationModel,
  PlenaryModel,
  CongresspersonXParliamentaryGroupModel,
}) {
  let baseService = new setupBaseService();

  async function doGetSearchResultList({ query, limit = 3 }) {
    try {
      const wildcardQuery = '%' + query.replace(/\s+/g, '%') + '%';

      const congressperson = await CongresspersonModel.findAll({
        where: {
          [Op.or]: [
            Sequelize.where(
              fn(
                'concat',
                col('id_name'),
                ' ',
                col('id_first_surname'),
                ' ',
                col('id_second_surname'),
              ),
              { [Op.iLike]: wildcardQuery },
            ),
            Sequelize.where(
              fn(
                'concat',
                col('id_first_surname'),
                ' ',
                col('id_second_surname'),
                ' ',
                col('id_name'),
              ),
              { [Op.iLike]: wildcardQuery },
            ),
            {
              congressperson_slug: {
                [Op.iLike]: wildcardQuery,
              },
            },
          ],
        },
        limit,
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
            model: ParliamentaryGroupModel,
            as: 'parliamentary_group',
            through: {
              attributes: [],
            },
          },
        ],
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
          [Op.or]: [
            {
              parliamentary_group_name: {
                [Op.iLike]: wildcardQuery,
              },
            },
            {
              parliamentary_group_slug: {
                [Op.iLike]: wildcardQuery,
              },
            },
          ],
        },
        limit,
        attributes: {
          include: [
            [fn('COUNT', col('congresspeople.cv_id')), 'congressperson_count'],
          ],
        },
        include: [
          {
            model: CongresspersonXParliamentaryGroupModel,
            as: 'congresspeople',
            attributes: [],
            where: {
              end_date: null,
            },
            // In order to make it work it have to avoid duplicates
            // https://github.com/sequelize/sequelize/issues/4446
            duplicating: false,
            // To left join, including parliamentary_group that doesn't have
            // active congresspeople
            required: false,
          },
        ],
        group: ['ParliamentaryGroupModel.parliamentary_group_id'],
      });

      const committee = await CommitteeModel.findAll({
        where: {
          committee_name: {
            [Op.iLike]: wildcardQuery,
          },
        },
        limit,
      });

      const searchResultList = {
        congressperson,
        political_party,
        parliamentary_group,
        committee,
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
