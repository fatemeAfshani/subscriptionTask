const { Router } = require("express");
const { add, update } = require("../../controllers/subscription");

const { errorHandler } = require("../../utils/middlewares/errorHandler");
const { subscriptionValidator } = require("./validator");

const subscriptionRouter = new Router();

subscriptionRouter.post(
  "/add",
  subscriptionValidator("ADD"),
  errorHandler,
  add
);

subscriptionRouter.patch(
  "/:id",
  subscriptionValidator("UPDATE"),
  errorHandler,
  update
);

module.exports = subscriptionRouter;
