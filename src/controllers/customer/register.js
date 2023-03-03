const customerDB = require("../../database/customer");
const historyDB = require("../../database/customersActivityHistory");
const logger = require("../../logger");
const { enCodePassword } = require("../../utils/index");

module.exports.register = async (req, res) => {
  try {
    const { username, password, credit } = req.body;

    const hashedPassword = enCodePassword(password);
    const customer = (await customerDB.addUser({
      username,
      password: hashedPassword,
      credit,
    }))?.[0];
    await historyDB.add({
      customerId: customer?.id,
      action: "register",
      description: `initial credit: ${credit}`,
    });
    logger.info(`customer registered with username: ${username}`);
    res.status(200).send({ username, credit });
  } catch (error) {
    logger.error(`error happend in registring customer ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
