'use strict';

const setupServices = require('./');

let services;

module.exports = async function serviceContainer(serviceName) {
  if (!services) {
    services = await setupServices();
  }
  // Return requested service
  switch (serviceName) {
    case 'congressperson':
      return services.congresspersonService;
    case 'location':
      return services.locationService;
    case 'committee':
      return services.committeeService;
    case 'parliamentary-group':
      return services.parliamentaryGroupService;
    case 'bill':
      return services.billService;
    case 'bill-status':
      return services.billStatusService;
    case 'legislature':
      return services.legislatureService;
    case 'search':
      return services.searchService;
  }
};
