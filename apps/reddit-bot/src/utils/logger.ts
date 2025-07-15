import winston from 'winston';
import chalk from 'chalk';
import { format as dateFormat } from 'date-fns';

// Custom console format with colors
const consoleFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let coloredLevel: string;
  
  switch (level) {
    case 'error':
      coloredLevel = chalk.red('[ERROR]');
      break;
    case 'warn':
      coloredLevel = chalk.yellow('[WARN]');
      break;
    case 'info':
      coloredLevel = chalk.blue('[INFO]');
      break;
    case 'debug':
      coloredLevel = chalk.gray('[DEBUG]');
      break;
    case 'success':
      coloredLevel = chalk.green('[SUCCESS]');
      break;
    default:
      coloredLevel = `[${level.toUpperCase()}]`;
  }
  
  const formattedTime = chalk.gray(dateFormat(new Date(timestamp), 'HH:mm:ss'));
  const metaString = Object.keys(metadata).length > 0 ? chalk.gray(JSON.stringify(metadata)) : '';
  
  return `${formattedTime} ${coloredLevel} ${message} ${metaString}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'reddit-bot' },
  transports: [
    // Console transport with colors
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        consoleFormat
      )
    }),
    // File transport for errors
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: 'combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ],
});

// Add custom success level
logger.levels = {
  ...winston.config.npm.levels,
  success: 2.5 // Between info (3) and warn (2)
};

// Type the custom level
interface CustomLogger extends winston.Logger {
  success: winston.LeveledLogMethod;
}

// Export typed logger
export default logger as CustomLogger;