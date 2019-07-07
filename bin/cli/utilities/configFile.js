"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _invariant = _interopRequireDefault(require("invariant"));

var _warning = _interopRequireDefault(require("warning"));

var _filesystem = require("./filesystem");

var _general = require("./general");

var _consts = require("../consts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateConfigFileExists = function validateConfigFileExists(configFilePath) {
  var exists = (0, _filesystem.pathsExist)([configFilePath]);
  (0, _invariant["default"])(exists, "".concat(configFilePath, " is required but does not exist."));
};

var getConfigFile = function getConfigFile(componentName) {
  var relativePath = "source/components/".concat(componentName, "/.dsconfig.json");
  var configFilePath = (0, _general.cwdResolve)(relativePath);
  validateConfigFileExists(configFilePath);

  var configFile = require(configFilePath); // validateConfigFileData(configFile)


  return configFile;
};

exports.getConfigFile = getConfigFile;