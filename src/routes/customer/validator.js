const { body } = require("express-validator");

const userDB = require("../../database/customer");

module.exports.UserValidator = (method) => {
  switch (method) {
    case "REGISTER": {
      return [
        body("username", "invalid username")
          .isString()
          .notEmpty()
          .custom(async (username) => {
            const user = (await userDB.get({ username }))?.[0];
            if (user) {
              return Promise.reject("user already exist with this username");
            }
          }),
        body("password", "invalid password").isString().isLength({ min: 3 }).notEmpty(),
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
