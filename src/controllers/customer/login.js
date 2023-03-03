const jwt = require("jsonwebtoken");

const { Customer } = require("../../database");
const logger = require("../../logger");
const { checkPassword } = require("../../utils/index");

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const customer = (await Customer.get({ username }))?.[0];
    if (!customer) {
      return res.status(401).send({ message: "invalid login" });
    } else {
      const passwordMatch = await checkPassword(password, customer.password);
      if (!passwordMatch) {
        return res.status(401).send({ message: "invalid login" });
      }
      const token = createToken(customer);
      logger.info(`customer with username: ${username} and token: ${token}`);
      res.status(200).send({ username, token });
    }
  } catch (error) {
    logger.error(`error happend in login customer ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};

const createToken = ({ username, credit, id }) => {
  return jwt.sign(
    {
      data: {
        username,
        credit,
        id,
      },
    },
    process.env.JWT_TOKEN,
    { expiresIn: "1h" }
  );
};
