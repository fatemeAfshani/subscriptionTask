const { CustomerSubscriptions, Invoice, Customer } = require("../../database");
const logger = require("../../logger");

module.exports.getAllInvoicesForOneSubscription = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const customer = req.customer;
    const { id: customerSubscriptionId } = req.params;

    const customerSubscription = (
      await CustomerSubscriptions.get({ id: customerSubscriptionId })
    )?.[0];
    if (!customerSubscription)
      return res
        .status(404)
        .send({ message: "customer subscription doesn't exist with this id" });
    if (customerSubscription.customerId !== customer.id)
      return res
        .status(404)
        .send({ message: "you dont have this subscription" });

    const invoices = await Invoice.getALL(
      { customerId: customer.id, customerSubscriptionId },
      limit,
      +offset * +limit
    );

    const customerData = (await Customer.get({ id: customer.id }))?.[0];

    res.status(200).send({ userCredit: customerData.credit, invoices });
  } catch (error) {
    logger.error(`error happend in getting customer subscriptions ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
