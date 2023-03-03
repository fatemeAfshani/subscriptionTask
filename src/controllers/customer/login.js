const jwt = require("jsonwebtoken");

const customerDB = require("../../database/customer");
const logger = require("../../logger");
const { checkPassword } = require("../../utils/index");

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const customer = (await customerDB.get({ username }))?.[0];
    if (!customer) {
      return res.status(401).send({ message: "invalid login" });
    } else {
      const passwordMatch = await checkPassword(password, customer.password);
      if (!passwordMatch) {
        return res.status(401).send({ message: "invalid login" });
      }
      const token = jwt.sign(
        {
          data: {
            username,
            credit: customer.credit,
            id: customer.id,
          },
        },
        process.env.JWT_TOKEN,
        { expiresIn: "1h" }
      );
      logger.info(`customer with username: ${username} and token: ${token}`);
      res.status(200).send({ username, token });
    }
  } catch (error) {
    logger.error(`error happend in login customer ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
