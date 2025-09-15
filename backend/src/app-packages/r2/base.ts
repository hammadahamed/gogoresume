import {
  S3Client,
  S3ClientConfig,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
  NotFound,
} from '@aws-sdk/client-s3';
import { Logger } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
import { GetPresignedUrlOptions, R2Config, UploadOptions } from './r2.types';

export class R2Service {
  private readonly client: S3Client;
  private readonly logger: Logger;
  private readonly bucket: string;
  private readonly publicUrl?: string;

  constructor(name: string, config: R2Config) {
    this.logger = new Logger(`R2 - ${name}`);
    this.bucket = config.bucket;
    this.publicUrl = config.publicUrl;

    const clientConfig: S3ClientConfig = {
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    };

    this.client = new S3Client(clientConfig);
    this.logger.log(`Initialized R2 client for bucket: ${this.bucket}`);
  }

  /**
   * Upload a file to R2
   * @param key The key (path) where the file will be stored
   * @param data The file data (Buffer, Readable, or Blob)
   * @param options Upload options (contentType, metadata, isPublic)
   * @returns The URL of the uploaded file
   */
  async upload(
    key: string,
    data: Buffer | Readable | Blob,
    options: UploadOptions = {},
  ): Promise<string> {
    try {
      // Validate content type
      if (!options.contentType) {
        throw new Error('Content type is required');
      }

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/svg+xml',
        'image/webp',
      ];

      if (!allowedTypes.includes(options.contentType)) {
        throw new Error('Invalid content type');
      }

      const upload = new Upload({
        client: this.client,
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: data,
          ContentType: options.contentType,
          Metadata: {
            ...options.metadata,
            'x-amz-server-side-encryption': 'AES256',
          },
          // Only allow public access if explicitly specified
          ACL: options.isPublic ? 'public-read' : 'private',
        },
      });

      await upload.done();

      // Only return public URL if the file is public
      const fileUrl = options.isPublic
        ? this.publicUrl
          ? `${this.publicUrl}/${key}`
          : `https://${this.bucket}.r2.cloudflarestorage.com/${key}`
        : null;

      this.logger.log(`Successfully uploaded file: ${key}`);
      return fileUrl || key; // Return key if file is private
    } catch (error) {
      this.logger.error(`Error uploading file ${key}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete a file from R2
   * @param key The key (path) of the file to delete
   */
  async delete(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      await this.client.send(command);
      this.logger.log(`Successfully deleted file: ${key}`);
    } catch (error) {
      this.logger.error(`Error deleting file ${key}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get a presigned URL for a file
   * @param key The key (path) of the file
   * @param options Options for the presigned URL
   * @returns The presigned URL
   */
  async getPresignedUrl(
    key: string,
    options: GetPresignedUrlOptions = {},
  ): Promise<string> {
    try {
      const {
        expiresIn = 3600,
        operation = 'getObject',
        contentType,
      } = options;

      // Validate content type for uploads
      if (operation === 'putObject') {
        if (!contentType) {
          throw new Error('Content type is required for upload operations');
        }

        // Only allow specific content types
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/svg+xml',
          'image/webp',
        ];

        if (!allowedTypes.includes(contentType)) {
          throw new Error('Invalid content type for upload');
        }
      }

      const command =
        operation === 'putObject'
          ? new PutObjectCommand({
              Bucket: this.bucket,
              Key: key,
              ContentType: contentType,
              // Ensure uploaded files are private by default
              ACL: 'private',
              // Add security headers
              Metadata: {
                'x-amz-server-side-encryption': 'AES256',
              },
            })
          : new GetObjectCommand({
              Bucket: this.bucket,
              Key: key,
            });

      // Set appropriate expiration times based on operation
      const urlExpiration =
        operation === 'putObject'
          ? 300 // 5 minutes for upload URLs
          : expiresIn;

      return await getSignedUrl(this.client, command, {
        expiresIn: urlExpiration,
      });
    } catch (error) {
      this.logger.error(
        `Error generating presigned URL for ${key}: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Check if a file exists in R2 using HeadObject (metadata only)
   * @param key The key (path) of the file to check
   * @returns Promise<{ exists: boolean, metadata?: { contentType: string, contentLength: number } }>
   */
  async checkExists(key: string): Promise<{
    exists: boolean;
    metadata?: { contentType: string; contentLength: number };
  }> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      const response = await this.client.send(command);
      return {
        exists: true,
        metadata: {
          contentType: response.ContentType || 'application/octet-stream',
          contentLength: response.ContentLength || 0,
        },
      };
    } catch (error) {
      // Only return false for NoSuchKey errors
      if (error instanceof NotFound) {
        return { exists: false };
      }
      // Re-throw other errors (network issues, permissions, etc)
      throw error;
    }
  }

  /**
   * Get the public URL for a file
   * @param key The key (path) of the file
   * @returns The public URL
   */
  getPublicUrl(key: string): string {
    return this.publicUrl
      ? `${this.publicUrl}/${key}`
      : `https://${this.bucket}.r2.cloudflarestorage.com/${key}`;
  }
}

export function initR2Connection(name: string, config: R2Config): R2Service {
  return new R2Service(name, config);
}

export default initR2Connection;
