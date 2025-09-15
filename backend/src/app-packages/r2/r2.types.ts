export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl?: string;
}

export interface UploadOptions {
  contentType?: string;
  metadata?: Record<string, string>;
  isPublic?: boolean;
}

export interface GetPresignedUrlOptions {
  expiresIn?: number;
  operation?: 'getObject' | 'putObject';
  contentType?: string;
}
