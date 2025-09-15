import { Logger } from '@nestjs/common';
import { ExpiryTime } from './redis.types'; // Assuming ExpiryTime is defined elsewhere

export class RedisUtils {
  private readonly logger = new Logger(RedisUtils.name);
  constructor(private redisClient) {}

  // Get a value by key
  async getValue(key: string): Promise<string | null> {
    try {
      return await this.redisClient.get(key);
    } catch (error) {
      this.logger.error(
        `Error getting key "${key}" from Redis: ${error.message}`,
      );
      return null;
    }
  }

  // Set a value by key with optional expiration
  async setValue(
    key: string,
    value: string,
    expireInSeconds: ExpiryTime = ExpiryTime.FIVE_MINUTES,
  ): Promise<string> {
    try {
      await this.redisClient.setex(key, expireInSeconds, value);
      return value;
    } catch (error) {
      this.logger.error(
        `Error setting key "${key}" in Redis: ${error.message}`,
      );
      throw error;
    }
  }

  // Delete a value by key
  async deleteValue(key: string): Promise<number> {
    try {
      return await this.redisClient.del(key);
    } catch (error) {
      this.logger.error(
        `Error deleting key "${key}" from Redis: ${error.message}`,
      );
      return 0;
    }
  }

  // Increment a key's value
  async increment(key: string, expireInSeconds?: ExpiryTime): Promise<number> {
    try {
      const value = await this.redisClient.incr(key);
      if (expireInSeconds && value === 1) {
        await this.redisClient.expire(key, expireInSeconds);
      }
      return value;
    } catch (error) {
      this.logger.error(
        `Error incrementing key "${key}" in Redis: ${error.message}`,
      );
      throw error;
    }
  }

  // Set the expiry time of a key
  async setExpiry(key: string, expireInSeconds: ExpiryTime): Promise<void> {
    try {
      await this.redisClient.expire(key, expireInSeconds);
    } catch (error) {
      this.logger.error(
        `Error setting expiry for key "${key}" in Redis: ${error.message}`,
      );
      throw error;
    }
  }
}
