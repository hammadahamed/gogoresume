import * as zlib from 'zlib';

/**
 * Compresses a JSON object to a compressed string using gzip
 * @param data Any JSON-serializable object
 * @returns Promise with compressed string
 */
export const compressData = (data: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const jsonString = JSON.stringify(data);
    zlib.gzip(jsonString, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      // Convert binary buffer to base64 string for storage
      resolve(result.toString('base64'));
    });
  });
};

/**
 * Decompresses a compressed string back to a JSON object
 * @param compressedString Base64 encoded compressed string
 * @returns Promise with decompressed object
 */
export const decompressData = (compressedString: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Convert base64 string back to buffer
    const buffer = Buffer.from(compressedString, 'base64');
    zlib.gunzip(buffer, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonString = result.toString();
        const data = JSON.parse(jsonString);
        resolve(data);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
};
