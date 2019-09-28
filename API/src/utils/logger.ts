import * as winston from 'winston';
import * as moment from 'moment';
import { env } from '../config';
import * as path from 'path';

const { printf, colorize } = winston.format;

const DailyRotateFile = require('winston-daily-rotate-file');

const winstonLogger = winston.createLogger({
  format: winston.format.combine(
    colorize(),
    printf(({ level, message, timestamp }) =>
      `${moment(timestamp).format('DD/MM/YYYY|HH:mm:ss')} - ${level}: ${message}`
    )
  ),
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      level: env.NODE_ENV === 'development' ? 'debug' : 'info'
    }),

    new DailyRotateFile({
      filename: path.resolve('./logs', 'log'),
      timestamp: () => moment().format('DD/MM/YYYY|HH:mm:ss'),
      datePattern: 'YYYY-MM-DD',
      prepend: true,
      level: env.NODE_ENV === 'development' ? 'debug' : 'info',
      zippedArchive: true
    })
  ]
});

const logger = {
  debug: (...messages: any[]) => {
    winstonLogger.debug(messages.join(' '));
  },

  info: (...messages: any[]) => {
    winstonLogger.info(messages.join(' '));
  },

  warn: (...messages: any[]) => {
    winstonLogger.warn(messages.join(' '));
  },

  error: (...messages: any[]) => {
    winstonLogger.error(messages.join(' '));
  },

  performance: async (payload: { gmhProcessId?: string; assetProcessId?: string; values: any }) => {
  }
};

export default logger;
