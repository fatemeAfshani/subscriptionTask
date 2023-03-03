const { Router } = require("express");
const { add, update, buy, getSubscriptions } = require("../../controllers/subscription");
const { isAuth } = require("../../utils/middlewares/auth");

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

subscriptionRouter.get(
  "/buy/:id",
  isAuth,
  subscriptionValidator("BUY"),
  errorHandler,
  buy
);

subscriptionRouter.get(
  "/",
  isAuth,
  subscriptionValidator("GETALL"),
  errorHandler,
  getSubscriptions
);

module.exports = subscriptionRouter;
