"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReadme = exports.createGitKeep = exports.createDirectory = void 0;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _general = require("../utilities/general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createDirectory = function createDirectory(relativePath) {
  var finalPath = (0, _general.cwdResolve)(relativePath);

  var alreadyExists = _shelljs["default"].test('-e', finalPath);

  !alreadyExists && _shelljs["default"].mkdir(finalPath);
};

exports.createDirectory = createDirectory;

var createGitKeep = function createGitKeep(relativePath) {
  var finalPath = "".concat((0, _general.cwdResolve)(relativePath), "/.gitkeep");

  var alreadyExists = _shelljs["default"].test('-e', finalPath);

  !alreadyExists && _shelljs["default"].ShellString('').toEnd(finalPath);
};

exports.createGitKeep = createGitKeep;

var createReadme = function createReadme() {
  var packageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var finalPath = (0, _general.cwdResolve)('README.md');

  var alreadyExists = _shelljs["default"].test('-e', finalPath);

  !alreadyExists && _shelljs["default"].ShellString("# ".concat(packageName)).toEnd(finalPath);
};

exports.createReadme = createReadme;