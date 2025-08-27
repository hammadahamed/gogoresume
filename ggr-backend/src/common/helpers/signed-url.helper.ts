import { RedisUtils } from 'src/app-packages/redis/redisUtils';
import { ExpiryTime } from 'src/app-packages/redis/redis.types';
import appRedis from 'src/clients/redis/appRedis';
import appR2 from 'src/clients/r2/appR2';
import { getSignedUrlCacheKey } from '../r2-keys.helper';

const redisService = new RedisUtils(appRedis);
const URL_EXPIRY = ExpiryTime.ONE_HOUR * 2;

export async function getOrCreateSignedUrl(
  key: string,
  mediaItemId: string,
): Promise<string> {
  const cacheKey = getSignedUrlCacheKey(mediaItemId);

  // Try to get from Redis
  const cachedUrl = await redisService.getValue(cacheKey);
  if (cachedUrl) {
    return cachedUrl; // If value exists, it means TTL hasn't expired
  }

  // Generate new signed URL
  const signedUrl = await appR2.getPresignedUrl(key, {
    operation: 'getObject',
    expiresIn: URL_EXPIRY,
  });

  // Cache the URL with TTL
  await redisService.setValue(cacheKey, signedUrl, URL_EXPIRY - 120);

  return signedUrl;
}

export async function getOrCreateBulkSignedUrls(
  mediaKeyMap: Record<string, string>,
): Promise<Record<string, string>> {
  const urlMap: Record<string, string> = {};
  const mediaIds = Object.keys(mediaKeyMap);

  // Create mapping of mediaId to its cache key
  const cacheKeys: Record<string, string> = {};
  for (const mediaId of mediaIds) {
    cacheKeys[mediaId] = getSignedUrlCacheKey(mediaId);
  }

  // Create promises for all Redis lookups
  const lookupPromises = Object.entries(cacheKeys).map(
    async ([mediaId, cacheKey]) => {
      const cachedUrl = await redisService.getValue(cacheKey);
      return { mediaId, cachedUrl };
    },
  );

  // Execute all promises in parallel and get results
  const results = await Promise.all(lookupPromises);

  // Process results
  const missingIds: string[] = [];
  for (const { mediaId, cachedUrl } of results) {
    if (cachedUrl) {
      urlMap[mediaId] = cachedUrl;
    } else {
      missingIds.push(mediaId);
    }
  }

  if (missingIds.length > 0) {
    // Generate and cache new URLs for missing items
    await Promise.all(
      missingIds.map(async (id) => {
        const signedUrl = await appR2.getPresignedUrl(mediaKeyMap[id], {
          operation: 'getObject',
          expiresIn: URL_EXPIRY,
        });

        // Cache the new URL
        await redisService.setValue(cacheKeys[id], signedUrl, URL_EXPIRY);

        urlMap[id] = signedUrl;
      }),
    );
  }

  return urlMap;
}
