const { promisify } = require("util");
const { sprintf } = require("sprintf-js");

const {
  RedisClient,
  RedisPubClient,
  RedisSubClient,
} = require("scrumkits-redis");

const MULTI_GET = "get";
const MULTI_DELETE = "del";
const MULTI_SET = "set";

class RedisWrapper {
  static async get(key) {
    const result = await RedisClient.get(key);
    return result;
  }

  static async getJSON(key) {
    const result = await RedisClient.get(key);
    return JSON.parse(result);
  }

  // 20 days in seconds = 1728000
  static async set(key, value) {
    await RedisClient.set(key, value);
  }

  // Default expiry is 1 day
  static async setWithExpiry(key, value, expiry = 86400) {
    await RedisClient.set(key, value, { EX: expiry });
  }

  // Default expiry is 1 day
  static async setJSONWithExpiry(key, value, expiry = 86400) {
    await RedisClient.set(key, JSON.stringify(value), { EX: expiry });
  }

  static async publish(channel, message) {
    await RedisPubClient.publish(channel, JSON.stringify(message));
  }

  static async subscribe(channel, callback) {
    await RedisSubClient.subscribe(channel, (message) => {
      callback(JSON.parse(message));
    });
  }

  static async unsubscribe(channel, callback) {
    await RedisSubClient.unsubscribe(channel, callback);
  }

  static getRedisKey(key, data) {
    try {
      return sprintf(key, data);
    } catch (error) {
      logger.error(error.stack);
      throw new Error("Invalid Redis key data");
    }
  }
}

module.exports = RedisWrapper;
