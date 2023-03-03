const { Router } = require("express");

const { register, login } = require("../../controllers/customer");
const { errorHandler } = require("../../utils/middlewares/errorHandler");
const { customerValidator } = require("./validator");

const customerRouter = new Router();

customerRouter.post(
  "/register",
  customerValidator("REGISTER"),
  errorHandler,
  register
);

customerRouter.post("/login", customerValidator("LOGIN"), errorHandler, login);

module.exports = customerRouter;
