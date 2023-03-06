const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Subscription Task ",
      version: "1.0.0",
      description: "A simple customer subscription project",
    },
  },
  apis: [
    "./src/routes/customer/*.js",
    "./src/routes/subscription/*.js",
    "./src/routes/invoice/*.js",
  ],
};

module.exports.openapiSpecification = swaggerJsdoc(options);
