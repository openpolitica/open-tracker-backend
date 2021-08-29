'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCongresistaService({
  CongresspersonModel,
  PoliticalPartyModel,
  ParliamentaryGroupModel,
  RoleModel,
  LocationModel,
  ExtraDataModel,
  IncomeModel,
  DataECModel,
  EducationModel,
  ExperienceModel,
  GoodsMovableModel,
  GoodsImmovableModel,
  JudgmentECModel,
  AffiliationModel,
  CongresspersonXParliamentaryGroupModel,
  CongresspersonXPartyModel,
}) {
  let baseService = new setupBaseService();

  async function doListCongressperson() {
    try {
      const congresspersonList = await CongresspersonModel.findAll({
        include: [
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
              { model: RoleModel, as: 'role_detail' },
            ],
          },
          {
            model: CongresspersonXPartyModel,
            as: 'congressperson_parties',
            attributes: ['start_date', 'end_date'],
            separate: true,
            include: [
              {
                model: PoliticalPartyModel,
                as: 'political_party',
              },
            ],
          },
          {
            model: LocationModel,
            as: 'location',
          },
        ],
        order: [
          ['id_name', 'ASC'],
          ['id_first_surname', 'ASC'],
        ],
      });
      return baseService.getServiceResponse(200, 'Success', congresspersonList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  async function doGetCongresspersonDetail({ cv_id, id_dni }) {
    try {
      const where = cv_id ? { cv_id } : { id_dni };
      const congresspersonDetail = await CongresspersonModel.findAll({
        where,
        include: [
          {
            model: ExtraDataModel,
            as: 'extra_data',
          },
          {
            model: IncomeModel,
            as: 'income',
          },
          {
            model: DataECModel,
            as: 'data_ec',
          },
          {
            model: EducationModel,
            as: 'education',
          },
          {
            model: ExperienceModel,
            as: 'experience',
          },
          {
            model: GoodsMovableModel,
            as: 'goods_movable',
          },
          {
            model: GoodsImmovableModel,
            as: 'goods_immovable',
          },
          {
            model: JudgmentECModel,
            as: 'judgments',
          },
          {
            model: AffiliationModel,
            as: 'affiliations',
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
              { model: RoleModel, as: 'role_detail' },
            ],
          },
          {
            model: CongresspersonXPartyModel,
            as: 'congressperson_parties',
            attributes: ['start_date', 'end_date'],
            separate: true,
            include: [
              {
                model: PoliticalPartyModel,
                as: 'political_party',
              },
            ],
          },
          {
            model: LocationModel,
            as: 'location',
          },
        ],
      });
      return baseService.getServiceResponse(
        200,
        'Success',
        congresspersonDetail,
      );
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doListCongressperson,
    doGetCongresspersonDetail,
  };
};
