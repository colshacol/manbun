"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = exports.cwdResolve = void 0;

var _path = _interopRequireDefault(require("path"));

var _kindOf = _interopRequireDefault(require("kind-of"));

var _consts = require("../consts");

var cwdResolve = function cwdResolve(relativePath) {
  return _path["default"].resolve(_consts.CWD, relativePath);
};

exports.cwdResolve = cwdResolve;

var stringify = function stringify(target) {
  if ((0, _kindOf["default"])(target) === 'string') {
    return target;
  }

  if ((0, _kindOf["default"])(target) === 'number') {
    return String(number);
  }

  if ((0, _kindOf["default"])(target) === 'boolean') {
    return target ? 'true' : 'false';
  }

  if ((0, _kindOf["default"])(target) === 'function') {
    return target.toString();
  }

  if ((0, _kindOf["default"])(target) === 'array') {
    return JSON.stringify(target, null, 2);
  }

  if ((0, _kindOf["default"])(target) === 'object') {
    return JSON.stringify(target, null, 2);
  }

  try {
    return JSON.stringify(target);
  } catch (error) {
    return target;
  }
};

exports.stringify = stringify;