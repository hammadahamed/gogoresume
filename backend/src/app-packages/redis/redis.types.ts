export interface IRedisRoot {
  use: boolean;
  data?: IRedisRootData;
}

export interface IRedisRootData {
  host: string;
  port: number;
  password?: string; // Password is optional
}

export enum ExpiryTime {
  THIRTY_SECONDS = 30,
  ONE_MINUTE = 60,
  FIVE_MINUTES = 60 * 5,
  TEN_MINUTES = 60 * 10,
  FIFTEEN_MINUTES = 60 * 15,
  ONE_HOUR = 60 * 60,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 60 * 60 * 24 * 7,
  ONE_MONTH = 60 * 60 * 24 * 30,
}
