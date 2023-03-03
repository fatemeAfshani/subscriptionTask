const { createLogger, format, transports } = require("winston");
const moment = require("jalali-moment");

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: moment().format("jYYYY/jMM/jDD HH:mm:ss") }),
    format.printf(({ level, message, timestamp }) => {
      return ` ${level}: [${timestamp}] ${message}`;
    })
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
