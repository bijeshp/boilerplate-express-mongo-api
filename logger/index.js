import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logDirPath = path.join(__dirname, '../../logs');

// Create the log directory if it does not exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
// Logger configuration
const loggerConfig = {
  console: {
    format: winston.format.simple(),
    json: true,
    colorize: true,
    level: 'debug',
    handleExceptions: true,
  },
  file: {
    level: 'info',
    name: 'file.info',
    filename: `${logDirPath}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `${logDirPath}/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
};

// setup the logger
const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(loggerConfig.console),
    new winston.transports.File(loggerConfig.errorFile),
    new winston.transports.File(loggerConfig.file),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default winstonLogger;
