const { body, param } = require("express-validator");

const { Customer } = require("../../database");

module.exports.customerValidator = (method) => {
  switch (method) {
    case "REGISTER": {
      return [
        body("username", "invalid username")
          .isString()
          .notEmpty()
          .custom(async (username) => {
            const customer = (await Customer.get({ username }))?.[0];
            if (customer) {
              return Promise.reject(
                "customer already exist with this username"
              );
            }
          }),
        body("password", "invalid password")
          .isString()
          .isLength({ min: 3 })
          .notEmpty(),
        body("credit", "invalid credit").isInt(),
      ];
    }
    case "LOGIN": {
      return [
        body("username", "invalid username").isString().notEmpty(),
        body("password", "invalid password").isString().notEmpty(),
      ];
    }
      
    default: {
      return [];
    }
  }
};
