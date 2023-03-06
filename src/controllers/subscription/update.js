const { Subscription } = require("../../database");
const logger = require("../../logger");

module.exports.update = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;

    if (!name && !price)
      return res.status(400).send({ message: "nothing to update" });

    const result = await Subscription.updateOne(req.body, id);

    if (result) {
      res.sendStatus(200);
    } else {
      res.status(404).send({ message: "subscription not found" });
    }
  } catch (error) {
    logger.error(`error happend in updating subscription ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
