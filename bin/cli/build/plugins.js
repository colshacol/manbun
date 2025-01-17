"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugins = void 0;

var _rollupPluginNodeResolve = _interopRequireDefault(require("rollup-plugin-node-resolve"));

var _rollupPluginBabel = _interopRequireDefault(require("rollup-plugin-babel"));

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

var _rollupPluginFilesize = _interopRequireDefault(require("rollup-plugin-filesize"));

var _rollupPluginImage = _interopRequireDefault(require("rollup-plugin-image"));

var _rollupPluginPostcss = _interopRequireDefault(require("rollup-plugin-postcss"));

var _postcssCssnext = _interopRequireDefault(require("postcss-cssnext"));

var _consts = require("../consts");

var plugins = function plugins() {
  var browser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return [(0, _rollupPluginImage["default"])(), (0, _rollupPluginFilesize["default"])(), (0, _rollupPluginBabel["default"])({
    runtimeHelpers: true
  }), (0, _rollupPluginNodeResolve["default"])({
    preferBuiltins: true,
    browser: browser
  }), (0, _rollupPluginCommonjs["default"])({
    namedExports: _consts.NAMED_EXPORTS
  }), (0, _rollupPluginPostcss["default"])({
    plugins: [(0, _postcssCssnext["default"])()]
  })];
};

exports.plugins = plugins;