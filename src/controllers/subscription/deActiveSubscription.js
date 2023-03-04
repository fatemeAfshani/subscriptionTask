const { CustomerSubscriptions } = require("../../database");
const logger = require("../../logger");

module.exports.deactiveSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = req.customer

    const customerSubscription = (await CustomerSubscriptions.get({id}))?.[0]
    if(!customerSubscription) return res.status(404).send({message: "customer subscription doesn\'t exist with this id"})
    if(customerSubscription.customerId !== customer.id) return res.status(403).send({message: "you dont access to this data"})
    if(!customerSubscription.isActive) return res.status(400).send({message: "customer subscription is already deactivated"})

   await CustomerSubscriptions.updateOne({isActive: false}, id);


          res.status(200).send({ message: 'customer subscription successfully deactivated'});

  } catch (error) {
    logger.error(`error happend in deactiving subscription ${error}`);
    res.status(500).send({ message: "error happened" });
  }
};
