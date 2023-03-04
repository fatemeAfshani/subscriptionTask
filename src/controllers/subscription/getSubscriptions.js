const { CustomerSubscriptions } = require("../../database");
const logger = require("../../logger");

module.exports.getSubscriptions = async (req, res) => {
  try {
    const { limit = 10, offset = 0, isActive } = req.query;
    const customer = req.customer;

    const params = { customerId: customer.id };
    if (isActive !== undefined) params.isActive = isActive;

    const subscriptions = await CustomerSubscriptions.getALL(
      params,
      limit,
      +offset * +limit
    );

    res.status(200).send({ subscriptions });
  } catch (error) {
    logger.error(`error happend in getting customer subscriptions ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
