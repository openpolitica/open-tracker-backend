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
    case 'parliamentary-group':
      return services.parliamentaryGroupService;
    case 'search':
      return services.searchService;
  }
};
