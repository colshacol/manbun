"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rollup = require("rollup");

var _createHTML = require("./createHTML");

var _plugins = require("./plugins");

var _consts = require("../consts");

var createServer =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(configuration) {
    var bundle;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _rollup.rollup)({
              input: configuration.inputFilePathServer,
              external: _consts.EXTERNALS,
              plugins: (0, _plugins.plugins)()
            });

          case 2:
            bundle = _context.sent;
            _context.next = 5;
            return bundle.write({
              sourcemap: true,
              file: configuration.outputFilePathServer,
              format: 'cjs'
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createServer(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createServer = createServer;