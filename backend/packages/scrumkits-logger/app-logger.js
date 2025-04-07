const winston = require("winston");
const { httpContext } = require("scrumkits-middleware");
const fs = require("fs");
const path = require("path");
const config = require("scrumkits-env");

function applicationLogger(namespace, customTag) {
  const logDir = path.join(__dirname, "..", "..", "logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const logPath = path.join(logDir, `${namespace}.log`);
  const errorLogPath = path.join(logDir, "errors.log");
  const loggerFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (data) =>
        `\n${new Date().toISOString()} | REQUEST_ID (${data.reqId}) Level:${
          data.level
        }\n[+] Message: ${data.message}`
    )
  );

  const transports = [
    new winston.transports.File({
      filename: logPath,
      handleExceptions: true,
      json: false,
      maxsize: 10485760, // 10MB
      maxFiles: 5,
      format: loggerFormat,
    }),
    new winston.transports.File({
      filename: errorLogPath,
      level: "error",
      handleExceptions: true,
      json: false,
      maxsize: 10485760, // 10MB
      maxFiles: 5,
      format: loggerFormat,
    }),
  ];

  if (config.get("environment") === "development") {
    transports.push(
      new winston.transports.Console({
        level: "debug",
        handleExceptions: true,
        json: false,
        format: loggerFormat,
      })
    );
  }

  const winstonLogger = winston.createLogger({
    transports,
    exitOnError: false,
  });

  const stream = {
    write(message, encoding) {
      winstonLogger.info(message);
    },
  };

  winstonLogger.stream = stream;

  // Wrap Winston logger to print reqId in each log
  const formatMessage = (message) => {
    const reqId = httpContext.get("requestId") || "";
    return { reqId, message };
  };

  const logger = {
    log(level, message) {
      winstonLogger.log(level, formatMessage(message));
    },
    error(message) {
      winstonLogger.error(formatMessage(message));
    },
    warn(message) {
      winstonLogger.warn(formatMessage(message));
    },
    verbose(message) {
      winstonLogger.verbose(formatMessage(message));
    },
    info(message) {
      winstonLogger.info(formatMessage(message));
    },
    debug(message) {
      winstonLogger.debug(formatMessage(message));
    },
    silly(message) {
      winstonLogger.silly(formatMessage(message));
    },
  };

  return logger;
}

module.exports = applicationLogger;
