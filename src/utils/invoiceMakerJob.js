const moment = require("jalali-moment");
const customer = require("../controllers/customer");
const { CustomerSubscriptions, Invoice, History } = require("../database");
const logger = require("../logger");

module.exports.invoiceMakerJob = async () => {
  try {
    const now = moment().format("jYYYY/jMM/jDD HH:mm:ss");
    logger.info(`job is runing at ${now}`);

    const customerSubscriptions = await CustomerSubscriptions.get({
      isActive: true,
    });

    await Promise.all(
      customerSubscriptions.map(async (customerSubscription) => {
        const lastInvoice = (
          await Invoice.getLastOne(customerSubscription.id)
        )?.[0];
        if (
          !lastInvoice &&
          calculateTimeDifference(now, customerSubscription.createdAt) >= 10
        ) {
          await Invoice.add(
            {
              customerSubscriptionId: customerSubscription.id,
              startDate: customerSubscription.createdAt,
              endDate: moment(
                customerSubscription.createdAt,
                "jYYYY/jMM/jDD HH:mm:ss"
              )
                .add(10, "m")
                .format("jYYYY/jMM/jDD HH:mm:ss"),
            },
            {
              price: customerSubscription.price,
              customerId: customerSubscription.customerId,
            }
          );
        } else if (calculateTimeDifference(now, lastInvoice.endDate) >= 10) {
          await Invoice.add(
            {
              customerSubscriptionId: customerSubscription.id,
              startDate: lastInvoice.endDate,
              endDate: moment(lastInvoice.endDate, "jYYYY/jMM/jDD HH:mm:ss")
                .add(10, "m")
                .format("jYYYY/jMM/jDD HH:mm:ss"),
            },
            {
              price: customerSubscription.price,
              customerId: customerSubscription.customerId,
            }
          );
        }

        // if customer subscription is expired base on it's durationDate
        // whitch is 1 month by default we make subscription deActive
        if (customerSubscription.duration < now) {
          await CustomerSubscriptions.updateOne(
            { isActive: false },
            customerSubscription.id
          );

          await History.add({
            customerId: customerSubscription.id,
            action: "expire subscription",
            description: `subscription number: ${customerSubscription.id}`,
          });
          return;
        }
      })
    );
  } catch (error) {
    logger.error(`error happend in adding subscription ${error}`);
  }
};

const calculateTimeDifference = (date1, date2) => {
  return moment(date1, "jYYYY/jMM/jDD HH:mm:ss").diff(
    moment(date2, "jYYYY/jMM/jDD HH:mm:ss"),
    "minutes"
  );
};
