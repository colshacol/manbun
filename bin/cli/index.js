#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("regenerator-runtime/runtime");

var _meow = _interopRequireDefault(require("meow"));

var _setup = require("./setup");

var _build = require("./build");

var _consts = require("./consts");

var CLI_CONFIGURATION = {
  flags: {
    help: {
      type: 'boolean'
    }
  }
};
var HELP_OUTPUT = "\nUsage\n  $ manbun <command> [...options]\n\nCommands\n  setup           Scaffolds the directories and sets up new bundle repos.\n  build           Builds source files to their final DS resting places.\n\nOptions\n  --help          Shows you this wonderful help menu.\n\nExamples\n  $ manbun setup\n  $ manbun --help\n";
var cli = (0, _meow["default"])(HELP_OUTPUT, CLI_CONFIGURATION);
var command = cli.input[0];
var options = {
  pkg: _consts.PKG,
  flags: cli.flags
};
command === 'setup' && (0, _setup.setup)(options);
command === 'build' && (0, _build.build)(options);