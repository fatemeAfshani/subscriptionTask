const { query, param } = require("express-validator");

module.exports.invoiceValidator = (method) => {
  switch (method) {
    case "GETALL": {
      return [
        query("limit", "invalid limit").optional().isInt(),
        query("offset", "invalid offset").optional().isInt(),
      ];
    }

    case "GETONE": {
      return [
        query("limit", "invalid limit").optional().isInt(),
        query("offset", "invalid offset").optional().isInt(),
        param("id", "invalid subsription id").isString(),
      ];
    }

    default: {
      return [];
    }
  }
};
