const { Router } = require("express");
const {
  getAllInvoicesForOneSubscription,
  getAllInvoices,
} = require("../../controllers/invoice");

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

// get all invoices for one customer subscription
invoiceRouter.get(
  "/:id",
  isAuth,
  invoiceValidator("GETONE"),
  errorHandler,
  getAllInvoicesForOneSubscription
);

module.exports = invoiceRouter;
