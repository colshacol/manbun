"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = void 0;

var _rollup = require("rollup");

var _createHTML = require("./createHTML");

var _plugins = require("./plugins");

var _consts = require("../consts");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createServer =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(configuration) {
    var bundle;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
              sourcemap: false,
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