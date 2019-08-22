'use strict';
import map from 'lodash/map';
import flatten from 'lodash/flatten';

class ValidationError extends Error {
  constructor(errors, options) {
    super();
    this.message = 'validation error';
    this.errors = errors;
    this.flatten = options.flatten;
    this.status = options.status;
    this.statusText = options.statusText;
  }
  toJSON() {
    if (this.flatten) return flatten(map(this.errors, 'messages'));
    return {
      status: this.status,
      statusText: this.statusText,
      errors: this.errors,
    };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
}

// ValidationError.prototype = Object.create(Error.prototype);

// ValidationError.prototype.toString = function() {
//   return JSON.stringify(this.toJSON());
// };

// ValidationError.prototype.toJSON = function() {};

export default ValidationError;
