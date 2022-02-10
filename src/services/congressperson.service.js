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
  PlenaryModel,
  CongresspersonXParliamentaryGroupModel,
  CongresspersonXPartyModel,
  CommitteeModel,
  CommitteeTypeModel,
  CongresspersonXCommitteeModel,
  BillModel,
  BillAuthorshipModel,
  SocialNetworkModel,
  SocialNetworkXCongresspersonModel,
}) {
  let baseService = new setupBaseService();

  async function doGetCongresspersonList({ id_dni }) {
    try {
      const where = id_dni ? { id_dni } : {};
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
          {
            model: PlenaryModel,
            as: 'plenary',
          },
        ],
        where,
        order: [
          ['id_name', 'ASC'],
          ['id_first_surname', 'ASC'],
          ['id_second_surname', 'ASC'],
        ],
      });
      return baseService.getServiceResponse(200, 'Success', congresspersonList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  async function doGetCongresspersonDetail({ slug, id }) {
    try {
      const where = slug
        ? { congressperson_slug: slug }
        : id
        ? { cv_id: id }
        : {};
      const congresspersonDetail = await CongresspersonModel.findOne({
        where,
        benchmack: true,
        logging: console.log,
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
          {
            model: SocialNetworkXCongresspersonModel,
            as: 'social_networks',
            include: [
              {
                model: SocialNetworkModel,
                as: 'social_network',
              },
            ],
          },
          {
            model: PlenaryModel,
            as: 'plenary',
          },
          {
            model: CongresspersonXCommitteeModel,
            as: 'committees',
            include: [
              {
                model: CommitteeModel,
                as: 'committee',
                include: [
                  {
                    model: CommitteeTypeModel,
                    as: 'committee_type',
                  },
                ],
              },
              { model: RoleModel, as: 'role_detail' },
            ],
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
    doGetCongresspersonList,
    doGetCongresspersonDetail,
  };
};
