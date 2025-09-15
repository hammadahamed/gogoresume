export const REDIS_KEY_PREFIX = 'media-lib';

export function getMediaKey(workspaceId: string, fileName: string): string {
  return `workspaces/${workspaceId}/media-library/${Date.now()}-${fileName}`;
}

export function getSignedUrlCacheKey(mediaItemId: string): string {
  return `${REDIS_KEY_PREFIX}:${mediaItemId}`;
}
