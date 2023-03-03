const { validationResult } = require("express-validator");

module.exports.errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()?.[0]?.msg });
  }
  next();
};
