const { body, param } = require("express-validator");

const { Subscription } = require("../../database");

module.exports.subscriptionValidator = (method) => {
  switch (method) {
    case "ADD": {
      return [
        body("name", "invalid name")
          .isString()
          .notEmpty()
          .custom(async (name) => {
            const subscription = (await Subscription.get({ name }))?.[0];
            if (subscription) {
              return Promise.reject(
                "subscription  already exist with this name"
              );
            }
          }),
        body("price", "invalid price").isInt(),
      ];
    }
    case "UPDATE": {
      return [
        param("id", "invalid subsription id").isInt(),
        body("price", "invalid price").isInt().optional().notEmpty(),
        body("name", "invalid name")
          .isString()
          .optional()
          .notEmpty()
          .custom(async (subscriptionName) => {
            const subscription = await Subscription.get({
              name: subscriptionName,
            });
            if (subscription?.[0]) {
              return Promise.reject(
                "subscription with this name already exist"
              );
            }
          }),
      ];
    }
    default: {
      return [];
    }
  }
};
