"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allAreOfType = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var allAreOfType = function allAreOfType(target, type) {
  return target.every(function (item) {
    return type === 'array' ? Array.isArray(item) : _typeof(item) === type;
  });
};

exports.allAreOfType = allAreOfType;