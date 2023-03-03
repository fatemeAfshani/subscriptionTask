const { Router } = require("express");

const customerController= require("../../controllers/customer");
const { errorHandler } = require("../../utils/middlewares/errorHandler");
const { customerValidator } = require("./validator");

const customerRouter = new Router();

customerRouter.post(
  "/register",
  customerValidator("REGISTER"),
  errorHandler,
  customerController.register
);

customerRouter.post("/login", customerValidator("LOGIN"), errorHandler, customerController.login);

module.exports = customerRouter;
