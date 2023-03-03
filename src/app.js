const app = require("./index.js");
const logger = require("./logger");

app.listen(process.env.PORT, () => {
  logger.info(`app is up and running on port ${process.env.PORT}`);
});
