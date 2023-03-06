const { Subscription } = require("../../database");
const logger = require("../../logger");

module.exports.getSubscriptions = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const subscriptions = await Subscription.getAll(
      {},
      limit,
      +offset * +limit
    );

    res.status(200).send({ subscriptions });
  } catch (error) {
    logger.error(`error happend in getting subscriptions ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
