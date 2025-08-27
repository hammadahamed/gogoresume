import { Logger } from '@nestjs/common';
import mongoose, { Connection, ConnectOptions } from 'mongoose';

export function initMongoConnection(
  name: string,
  mongoUri: string,
  connOptions?: any,
): Connection {
  const logger = new Logger(`MongoDB - ${name}`);
  const defaultOptions: ConnectOptions = {
    maxPoolSize: connOptions?.maxConnectionPool || 10, // Default to 10 connections
    socketTimeoutMS: connOptions?.socketTimeoutMS || 30000, // Default 30 seconds
  };

  if (!mongoUri) {
    logger.error(`URI ${name} not found.`);
    throw new Error(`Missing URI: ${name}`);
  }

  logger.log(`Connecting to ${name}...`);

  const connection = mongoose.createConnection(mongoUri, defaultOptions);

  connection.on('connected', () => {
    logger.log(`Connection to ${name} successful.`);
  });

  connection.on('error', (error) => {
    logger.error(`Error in connection to ${name}: ${error.message}`);
  });

  connection.on('disconnected', () => {
    logger.warn(`Connection to ${name} was disconnected.`);
  });

  connection.on('reconnected', () => {
    logger.log(`Reconnected to ${name}.`);
  });

  return connection;
}

export default initMongoConnection;
