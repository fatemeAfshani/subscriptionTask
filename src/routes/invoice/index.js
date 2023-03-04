const { Router } = require("express");

const { getAllInvoices } = require("../../controllers/invoice/getAll");
const { isAuth } = require("../../utils/middlewares/auth");
const { errorHandler } = require("../../utils/middlewares/errorHandler");
const { invoiceValidator } = require("./validator");

const invoiceRouter = new Router();

invoiceRouter.get(
  "/",
  isAuth,
  invoiceValidator("GETALL"),
  errorHandler,
  getAllInvoices
);

module.exports = invoiceRouter;
