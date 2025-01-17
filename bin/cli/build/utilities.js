"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareScriptForHTML = exports.prepareServerScript = exports.createConfiguration = exports.getSourcePaths = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _path = _interopRequireDefault(require("path"));

var _changeCase = _interopRequireDefault(require("change-case"));

var _general = require("../utilities/general");

var _configFile = require("../utilities/configFile");

var _consts = require("../consts");

var getSourcePaths = function getSourcePaths() {
  var dirs = _shelljs["default"].ls('-d', "".concat(_consts.SOURCE_COMPONENTS_PATH, "/*"));

  return Array.from(dirs);
};

exports.getSourcePaths = getSourcePaths;

var createConfiguration = function createConfiguration(relativeSourcePath) {
  var _ref;

  var substringStartIndex = relativeSourcePath.lastIndexOf('/') + 1;
  var componentName = relativeSourcePath.substr(substringStartIndex);

  var dsComponentName = _changeCase["default"].snake(componentName);

  var sourcePath = (0, _general.cwdResolve)(relativeSourcePath);
  var configFile = (0, _configFile.getConfigFile)(componentName);
  var inputFilePathJS = "".concat(sourcePath, "/").concat(componentName, ".js");
  var inputFilePathCSS = "".concat(sourcePath, "/").concat(componentName, ".css");
  var inputFilePathServer = "".concat(sourcePath, "/server/index.js");
  var outputComponentsPath = (0, _general.cwdResolve)('./components');
  var outputDirectoryPath = "".concat(outputComponentsPath, "/").concat(dsComponentName);
  var outputModulesPath = "".concat(outputDirectoryPath, "/content/modules");
  var outputFilePathJS = "".concat(outputModulesPath, "/").concat(componentName, ".js");
  var outputFilePathHTML = "".concat(outputDirectoryPath, "/").concat(componentName, "Client.html");
  var outputFilePathServer = "".concat(outputDirectoryPath, "/").concat(componentName, "Server.js");
  return _ref = {
    inputFilePathServer: inputFilePathServer,
    dsComponentName: dsComponentName,
    configFile: configFile,
    sourcePath: sourcePath,
    componentName: componentName
  }, (0, _defineProperty2["default"])(_ref, "sourcePath", sourcePath), (0, _defineProperty2["default"])(_ref, "inputFilePathJS", inputFilePathJS), (0, _defineProperty2["default"])(_ref, "inputFilePathCSS", inputFilePathCSS), (0, _defineProperty2["default"])(_ref, "outputDirectoryPath", outputDirectoryPath), (0, _defineProperty2["default"])(_ref, "outputFilePathJS", outputFilePathJS), (0, _defineProperty2["default"])(_ref, "outputFilePathHTML", outputFilePathHTML), (0, _defineProperty2["default"])(_ref, "outputFilePathServer", outputFilePathServer), _ref;
};

exports.createConfiguration = createConfiguration;

var injectComponentName = function injectComponentName(target, configuration) {
  var a = target.replace(/(\$\$COMPONENT_NAME)/g, configuration.componentName);
  return a.replace(/(\$\$DS_COMPONENT_NAME)/g, configuration.dsComponentName);
};

var prepareServerScript = function prepareServerScript(configuration) {
  return injectComponentName(_consts.SERVER_FILE_CONTENT, configuration);
};

exports.prepareServerScript = prepareServerScript;

var prepareScriptForHTML = function prepareScriptForHTML(configuration) {
  return injectComponentName(_consts.HTML_SCRIPT_CONTENT, configuration);
};

exports.prepareScriptForHTML = prepareScriptForHTML;

var validateConfig = function validateConfig(configFile) {
  if (!configFile.type) {
    throw new Error("[ manbun ] ERROR: ".concat(configFile.componentName, ".json type property is required."));
  }

  if (!configFile.id) {
    throw new Error("[ manbun ] ERROR: ".concat(configFile.componentName, ".json id property is required."));
  }

  if (!configFile.label) {
    throw new Error("[ manbun ] ERROR: ".concat(configFile.componentName, ".json label property is required."));
  }

  if (!configFile.className) {
    throw new Error("[ manbun ] ERROR: ".concat(configFile.componentName, ".json className property is required."));
  }

  if (!configFile.renderable) {
    throw new Error("[ manbun ] ERROR: ".concat(configFile.componentName, ".json renderable property is required."));
  }

  if (configFile.attributes && !Array.isArray(configFile.attributes)) {
    throw new Error("[ manbun ] ERROR: ".concat(configFile.componentName, ".json attributes value must be an array."));
  }

  if (configFile.attributes && !Array.isArray(configFile.attributes_layout)) {
    throw new Error("[ manbun ] ERROR: ".concat(configFile.componentName, ".json type attributes_layout value must be an array."));
  }

  if (configFile.attributes && !Array.isArray(configFile.attributes_display_rules)) {
    throw new Error("[ manbun ] ERROR: ".concat(configFile.componentName, ".json attributes_display_rules value must be an array."));
  }
};