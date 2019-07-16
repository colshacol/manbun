"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allAreOfType = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var allAreOfType = function allAreOfType(target, type) {
  return target.every(function (item) {
    return type === 'array' ? Array.isArray(item) : (0, _typeof2["default"])(item) === type;
  });
};

exports.allAreOfType = allAreOfType;