const { Invoice } = require("../../database");
const logger = require("../../logger");

module.exports.getAllInvoices = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const customer = req.customer;

    const invoices = await Invoice.getALL(
      { customerId: customer.id },
      limit,
      +offset * +limit
    );

    res.status(200).send({ invoices });
  } catch (error) {
    logger.error(`error happend in getting invoices ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
