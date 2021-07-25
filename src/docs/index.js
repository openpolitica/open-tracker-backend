const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');

// Swagger
const swagger_v1 = require('./v1/swagger.json');
router.use(['/v1', '/'], swaggerUi.serve, swaggerUi.setup(swagger_v1));

module.exports = router;
