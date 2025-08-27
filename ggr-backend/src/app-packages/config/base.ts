import * as nconf from 'nconf';
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * Initialize and return an nconf instance for a given configuration name.
 * @param name The name of the configuration file (e.g., 'app', 'database', etc.)
 * @returns An initialized nconf instance for the given configuration file.
 */
export function initConfig(name: string): nconf.Provider {
  const environment = process.env.NODE_ENV || 'staging';
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'configs',
    `${name}.${environment}.json`,
  );

  const configInstance = new nconf.Provider();
  configInstance.env().file({ file: filePath });
  console.log(
    `[Config] Loaded configuration "${name}" for environment: ${environment}`,
  );

  return configInstance;
}

// Export environment variables directly
export function initEnv() {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config();
  } else {
    dotenv.config({
      path: path.join(__dirname, '..', '..', '..', `.env.staging`),
    });
  }

  const environment = process.env.NODE_ENV || 'staging';
  // Load environment variables from .env file
  console.log(
    `[Config] Loaded environment variables for environment: ${environment}`,
  );

  // Return process.env directly
  return process.env;
}
