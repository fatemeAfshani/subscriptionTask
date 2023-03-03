const jwt = require("jsonwebtoken");
const logger = require("../../logger");
const customerDB = require("../../database/customer");

module.exports.isAuth = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization")?.replace("Bearer ", "");
    if (!authorization) return res.sendStatus(401);
    const { data } = jwt.verify(authorization, process.env.JWT_TOKEN);
    if (!data) return res.sendStatus(401);

    const customer = (
      await customerDB.get({ username: data.username, id: data.id })
    )?.[0];
    if (!customer) return res.sendStatus(401);

    req.token = authorization;
    req.customer = customer;
    next();
  } catch (error) {
    logger.error(`error in authorization middleware, ${error}`);
    return res.sendStatus(401);
  }
};
