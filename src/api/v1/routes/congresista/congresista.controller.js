const setupBaseController = require('../base.controller');

let baseController = new setupBaseController();

//Call service container

const getCongresistas = async (request, response) => {
  return response
    .status(200)
    .json({
      "test": "hello"
    });
}

module.exports = {
  getCongresistas
}