import createError from 'http-errors';
import express from 'express';
import path from 'path';
import util from 'util';

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import debug from 'debug';
import compress from 'compression';
import config from './config';
import corsMiddleWare from './middlewares/cors';
import headerSecurityMiddleware from './middlewares/headerSecurity';

import winston from 'winston';
import morganLogger from 'morgan';
import expressWinston from 'express-winston';
import winstonLogger from './logger';

import APIError from './helpers/APIError';
import expressValidation from './utils/Validator';

import indexRouter from './routes';

const app = express();

if (config.env === 'development') {
  app.use(morganLogger('dev'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/*===================| Requests & Sessions |===================*/
app.use(express.json());
app.use(cookieParser());
app.use(compress());

/*===================| security |===================*/
app.use(corsMiddleWare);
app.use(headerSecurityMiddleware);

/*===================| Database |===================*/

//Set up default mongoose connection
const mongoDB = config.mongo.host;
mongoose.connect(mongoDB, { useNewUrlParser: true });
// PROTECTION : Depreciation Warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

/*===================| Logs |===================*/

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(
    expressWinston.logger(winstonLogger, {
      meta: true, // optional: log meta data about request (defaults to true)
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    }),
  );

  // Print mongoose logs in dev env
  if (config.mongooseDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
  }
}

/*===================| Routing |===================*/
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  let errorDetails = err;
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map((error) => error.messages.join('. ')).join(' and ');
    errorDetails = new APIError(unifiedErrorMessage, err.status, true);
  } else if (!(err instanceof APIError)) {
    errorDetails = new APIError(err.message, err.status, err.isPublic);
  }
  winstonLogger.log('error', errorDetails);
  return next(errorDetails);
});

// GET home page.
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*===================| Error and 404 Handling |===================*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger(winstonLogger));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {},
  }),
);

module.exports = app;

export default app;
