const moment = require("jalali-moment");
const {
  CustomerSubscriptions,
  History,
  Subscription,
} = require("../../database");
const logger = require("../../logger");

module.exports.buy = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = req.customer;

    const subscription = (await Subscription.get({ id }))?.[0];
    if (!subscription)
      return res.status(400).send({ message: "subscription does not exist" });

    const params = {
      customerId: customer.id,
      subscriptionId: subscription.id,
      price: subscription.price,
      isActive: true,
      createdAt: moment().format("jYYYY/jMM/jDD HH:mm:ss"),
      duration: moment().add(1, "M").format("jYYYY/jMM/jDD HH:mm:ss"),
    };
    const userSubscription = (await CustomerSubscriptions.add(params))?.[0];

    await History.add({
      customerId: customer.id,
      action: "buy subscription",
      description: `subscription number: ${subscription.id}`,
    });

    logger.info(`subscription ${subscription.id} added to user ${customer.id}`);

    res.status(200).send({ id: userSubscription.id });
  } catch (error) {
    logger.error(`error happend in adding subscription to user ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
