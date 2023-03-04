const { query } = require("express-validator");

module.exports.invoiceValidator = (method) => {
  switch (method) {
    case "GETALL": {
      return [
        query("limit", "invalid limit").optional().isInt(),
        query("offset", "invalid offset").optional().isInt(),
      ];
    }

    default: {
      return [];
    }
  }
};
