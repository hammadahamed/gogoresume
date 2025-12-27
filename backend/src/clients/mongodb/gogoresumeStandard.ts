import initMongoConnection from 'src/app-packages/mongodb/base';
import initEnv from '../config/appConfig';
initEnv();
// Environment variables used in this file
const MONGO_URI = process.env.MONGO_GOGORESUME_URI;

export default (() => {
  return initMongoConnection('appMongo', MONGO_URI, {
    //   maxConnectionPool: process.env.MONGO_CONNECTION_POOL
    //     ? parseInt(process.env.MONGO_CONNECTION_POOL)
    //     : undefined,
  });
})();
