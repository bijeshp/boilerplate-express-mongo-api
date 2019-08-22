'use strict';
import Joi from '@hapi/joi';
import assignIn from 'lodash/assignIn';
import find from 'lodash/find';
import defaults from 'lodash/defaults';
import ValidationError from './validation-error';

var defaultOptions = {
  contextRequest: false,
  allowUnknownHeaders: true,
  allowUnknownBody: true,
  allowUnknownQuery: true,
  allowUnknownParams: true,
  allowUnknownCookies: true,
  status: 400,
  statusText: 'Bad Request',
};
var globalOptions = {};

// maps the corresponding request object to an `express-validation` option
var unknownMap = {
  headers: 'allowUnknownHeaders',
  body: 'allowUnknownBody',
  query: 'allowUnknownQuery',
  params: 'allowUnknownParams',
  cookies: 'allowUnknownCookies',
};

const options = (opts) => {
  if (!opts) {
    globalOptions = {};
    return;
  }

  globalOptions = defaults({}, globalOptions, opts);
};

const validateRequest = (schema) => {
  if (!schema) throw new Error('Please provide a validation schema');

  return function(req, res, next) {
    var errors = [];

    // Set default options
    var options = defaults({}, schema.options || {}, globalOptions, defaultOptions);

    // NOTE: mutates `errors`
    ['headers', 'body', 'query', 'params', 'cookies'].forEach(function(key) {
      var allowUnknown = options[unknownMap[key]];
      var entireContext = options.contextRequest ? req : null;
      if (schema[key]) validate(errors, req[key], schema[key], key, allowUnknown, entireContext);
    });

    if (errors && errors.length === 0) return next();

    return next(new ValidationError(errors, options));
  };
};

/**
 * validate checks the current `Request` for validations
 * NOTE: mutates `request` in case the object is valid.
 */
const validate = (errObj, request, schema, location, allowUnknown, context) => {
  if (!request || !schema) return;

  var joiOptions = {
    context: context || request,
    allowUnknown: allowUnknown,
    abortEarly: false,
  };

  Joi.validate(request, schema, joiOptions, function(errors, value) {
    if (!errors || errors.details.length === 0) {
      assignIn(request, value); // joi responses are parsed into JSON
      return;
    }
    errors.details.forEach(function(error) {
      var errorExists = find(errObj, function(item) {
        if (item && item.field === error.path && item.location === location) {
          item.messages.push(error.message);
          item.types.push(error.type);
          return item;
        }
        return;
      });

      if (!errorExists) {
        errObj.push({
          field: error.path,
          location: location,
          messages: [error.message],
          types: [error.type],
        });
      }
    });
  });
};

validateRequest.ValidationError = ValidationError;

export default validateRequest;
