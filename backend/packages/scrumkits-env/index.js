const path = require("path");
const nconf = require("nconf");

let configPath = path.join(__dirname, "..", "..", "..", "config");

// if (process.env.NODE_ENV === "production") configPath = "/etc/secrets/";

const DEV_ENVIRONMENT = "development";

function getEnvironment() {
  const environment = process.env.NODE_ENV;
  console.log("🚀 ~ getEnvironment ~ environment:", environment);

  if (environment) {
    return environment;
  }

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = DEV_ENVIRONMENT;
  }

  return DEV_ENVIRONMENT;
}

nconf.file({ file: path.join(configPath, `config.${getEnvironment()}.json`) });

module.exports = nconf;
