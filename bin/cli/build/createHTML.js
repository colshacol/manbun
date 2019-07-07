"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHTML = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _prettier = _interopRequireDefault(require("prettier"));

var _general = require("../utilities/general");

var _utilities = require("./utilities");

var _consts = require("../consts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getDefinition = function getDefinition(configFile) {
  var isRenderable = ['component', 'page'].includes(configFile.type);
  return {
    id: configFile.id,
    label: configFile.label,
    className: configFile.serverName,
    renderable: isRenderable,
    dependencies: configFile.dependencies
  };
};

var getSourceCSS = function getSourceCSS(taskData) {
  var cssFileExists = _fs["default"].existsSync(taskData.inputFilePathCSS);

  var cssContent = cssFileExists ? _fs["default"].readFileSync(taskData.inputFilePathCSS, 'utf8') : '';
  return _prettier["default"].format(cssContent, {
    parser: 'css'
  });
};

var createHTML = function createHTML(taskData) {
  var configFile = taskData.configFile;
  var type = _consts.COMPONENT_TYPE_MAP[configFile.type];
  var definitionString = (0, _general.stringify)(getDefinition(configFile));
  var attributesString = (0, _general.stringify)(configFile.attributes || '');
  var attributesLayoutString = (0, _general.stringify)(configFile.attributes_layout || '');
  var attributesDisplayString = (0, _general.stringify)(configFile.attributes_display_rules || '');
  var cssString = getSourceCSS(taskData);
  var scriptString = (0, _utilities.prepareScriptForHTML)(taskData);

  var html = _prettier["default"].format("\n    <!DOCTYPE ".concat(type, ">\n    <definition>\n").concat(definitionString, "\n</definition>\n    ").concat(attributesString ? "<attributes>\n".concat(attributesString, "\n</attributes>") : '', "\n    ").concat(attributesLayoutString ? "<attributes_layout>\n".concat(attributesLayoutString, "\n</attributes_layout>") : '', "\n    ").concat(attributesDisplayString ? "<attributes_display_rules>\n".concat(attributesString, "\n</attributes_display_rules>") : '', "\n    <style>\n").concat(cssString, "\n</style>\n    <script>\n").concat(scriptString, "\n</script>\n  "), {
    parser: 'html'
  });

  _fs["default"].writeFileSync(taskData.outputFilePathHTML, html, 'utf8');
};

exports.createHTML = createHTML;