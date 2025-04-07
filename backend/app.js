// global.logger = require("scrumkits-logger")("scrumkits");
global.logger = console;
global.activePointingClientsMap = {};
global.activeRetroClientsMap = {};

const { errorHandler } = require("scrumkits-error-handler");
const express = require("express");
const {
  requestResponseLogger,
  httpContext,
  setRequestId,
} = require("scrumkits-middleware");

const { authHandler } = require("./service/middlewares/auth");

const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
console.log("🚀 ~ PORT:", PORT);
// const config = require("scrumkits-env");

// if (config.get("environment") !== "production") {
app.use(cors());
// }

app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(httpContext.middleware);
app.use(setRequestId);
app.use(requestResponseLogger(logger));
app.use(authHandler);
app.use("/", require("./service/routes"));

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`👋 Server is running on port ${PORT}`);
});

module.exports = app;
