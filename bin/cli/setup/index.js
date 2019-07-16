"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _utilities = require("./utilities");

var createDirectories = function createDirectories() {
  (0, _utilities.createDirectory)('./components');
  (0, _utilities.createDirectory)('./security');
  (0, _utilities.createDirectory)('./auth');
  (0, _utilities.createDirectory)('./widgets');
  (0, _utilities.createDirectory)('./content');
  (0, _utilities.createDirectory)('./actions');
};

var createGitKeeps = function createGitKeeps() {
  (0, _utilities.createGitKeep)('./components');
  (0, _utilities.createGitKeep)('./security');
  (0, _utilities.createGitKeep)('./auth');
  (0, _utilities.createGitKeep)('./widgets');
  (0, _utilities.createGitKeep)('./content');
  (0, _utilities.createGitKeep)('./actions');
};

var setup = function setup(context) {
  console.log('[ manbun ] SETUP STARTING');
  createDirectories();
  createGitKeeps();
  (0, _utilities.createReadme)();
  console.log('[ manbun ] SETUP SUCCESSFUL');
};

exports.setup = setup;