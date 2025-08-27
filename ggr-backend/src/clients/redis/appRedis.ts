import initRedisConnection from 'src/app-packages/redis/base';

// Environment variables used in this file
const REDIS_CONFIG = {
  host: process.env.REDIS_GROOTFORM_HOST,
  port: process.env.REDIS_GROOTFORM_PORT,
  password: process.env.REDIS_GROOTFORM_PASSWORD,
};

export default (() => {
  // REMOVE THIS IF YOU NEED REDIS INITIALIZATION
  return;
  return initRedisConnection('appRedis', REDIS_CONFIG);
})();
