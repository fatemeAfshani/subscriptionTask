const { Router } = require("express");
const { login } = require("../../controllers/customer/login");
const { register } = require("../../controllers/customer/register");

const { errorHandler } = require("../../utils/middlewares/errorHandler");
const { UserValidator } = require("./validator");

const customerRouter = new Router();

customerRouter.post(
  "/register",
  UserValidator("REGISTER"),
  errorHandler,
  register
);

customerRouter.post("/login", UserValidator("LOGIN"), errorHandler, login);

module.exports = customerRouter;
