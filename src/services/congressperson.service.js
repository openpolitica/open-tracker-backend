'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCongresistaService({
  CongresspersonModel,
  PoliticalPartyModel,
  ParliamentaryGroupModel,
  RoleModel,
  LocationModel,
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
      });
      return baseService.getServiceResponse(200, 'Success', congresspersonList);
    } catch (err) {
      console.error('Error: ', err);
      return baseService.getServiceResponse(500, err.message);
    }
  }

  return {
    doListCongressperson,
  };
};
