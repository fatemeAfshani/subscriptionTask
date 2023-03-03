const jwt = require("jsonwebtoken");
const logger = require("../logger");
const customerDB = require("../../database/customer");

module.exports.isAuth = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization")?.replace("Bearer ", "");
    const { data } = jwt.verify(authorization, process.env.JWT_TOKEN);
    if (!data) return res.sendStatus(401);

    const user = (
      await customerDB.get({ username: data.username, id: data.id })
    )?.[0];
    if (!user) return res.sendStatus(401);

    req.token = authorization;
    req.user = user;
    next();S
  } catch (error) {
    logger.error(`error in authorization middleware, ${error}`);
    return res.sendStatus(401);
  }
};