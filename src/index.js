require("./config");

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const moment = require("jalali-moment");
const CronJob = require("cron").CronJob;
const swaggerUi = require("swagger-ui-express");

const customerRouter = require("./routes/customer");
const subscriptionRouter = require("./routes/subscription");
const logger = require("./logger");
const { invoiceMakerJob } = require("./utils/invoiceMakerJob");
const invoiceRouter = require("./routes/invoice");
const { openapiSpecification } = require("./swagger");

const job = new CronJob("*/10 * * * *", invoiceMakerJob);
job.start();

const app = express();

app.use(express.json());
app.use(helmet());

morgan.token("body", (req) => JSON.stringify(req.body));
morgan.token("date", () => moment().format("jYYYY/jMM/jDD HH:mm:ss"));

app.use(
  morgan(
    '[:date] ":method :url HTTP/:http-version" :body :status - :response-time ms - :remote-addr - :res[content-length] '
  )
);

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 30 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});

if (process.env.ENVIRONMENT === "prod") app.use(limiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/customer", customerRouter);
app.use("/subscription", subscriptionRouter);
app.use("/invoice", invoiceRouter);

app.use((err, req, res, _) => {
  logger.error(`error handler: ${err}`);
  res.status(500).send({ message: "error happened" });
});

module.exports = app;
