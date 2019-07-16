"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.pathsExist = void 0;

var _fs = _interopRequireDefault(require("fs"));

var pathsExist = function pathsExist(targets) {
  return targets.every(function (pathToTest) {
    return _fs["default"].existsSync(pathToTest);
  });
};

exports.pathsExist = pathsExist;

var readFile = function readFile(filePath) {
  var charset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';
  return _fs["default"].readFileSync(filePath, charset);
};

exports.readFile = readFile;