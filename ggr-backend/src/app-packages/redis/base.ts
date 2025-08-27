import Redis, { RedisOptions } from 'ioredis';
import { Logger } from '@nestjs/common';

export function initRedisConnection(name: string, config) {
  const logger = new Logger(`Redis - ${name}`);

  const options: RedisOptions = {
    host: config.host,
    port: config.port,
    password: config.password,
    enableOfflineQueue: true,
    enableReadyCheck: true,
    retryStrategy: (times) => Math.min(times * 100, 1000),
  };

  const client = new Redis(options);

  client.on('error', (err) => {
    logger.error(`[Redis] Error in ${name}: ${JSON.stringify(err)}`);
  });

  client.on('connect', () => {
    logger.log(`[Redis] Connected to ${name}`);
  });

  client.on('ready', () => {
    logger.log(`[Redis] ${name} is ready`);
  });

  client.on('reconnecting', (a) => {
    logger.warn(`[Redis] Reconnecting to ${name}: ${JSON.stringify(a)}`);
  });

  //   Wait for connection to be ready
  //   await client.ping();
  //   logger.log(`[Redis] Connection to ${name} established`);

  return client;
}

export default initRedisConnection;
