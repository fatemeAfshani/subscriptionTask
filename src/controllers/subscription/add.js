const { Subscription } = require("../../database");
const logger = require("../../logger");

module.exports.add = async (req, res) => {
  try {
    const { name, price } = req.body;

    const subscription = (
      await Subscription.add({
        name,
        price,
      })
    )?.[0];

    logger.info(
      `new subscription created with name: ${name} and price: ${price}`
    );
    res.status(201).send({ name, price, id: subscription.id });
  } catch (error) {
    logger.error(`error happend in adding subscription ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
