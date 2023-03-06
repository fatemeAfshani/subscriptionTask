module.exports = {
  add: require("./add").add,
  update: require("./update").update,
  buy: require("./buy").buy,
  getCustomerSubscriptions: require("./getCustomerSubscriptions")
    .getCustomerSubscriptions,
  deactiveSubscription: require("./deActiveSubscription").deactiveSubscription,
  getSubscriptions: require("./getSubscriptions").getSubscriptions,
};
