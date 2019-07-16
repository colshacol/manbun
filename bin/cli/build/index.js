"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rollup = require("rollup");

var _createHTML = require("./createHTML");

var _createServer = require("./createServer");

var _utilities = require("./utilities");

var _plugins = require("./plugins");

var _consts = require("../consts");

var bundleComponent =
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
              input: configuration.inputFilePathJS,
              external: _consts.EXTERNALS,
              plugins: (0, _plugins.plugins)()
            });

          case 2:
            bundle = _context.sent;
            _context.next = 5;
            return bundle.write({
              sourcemap: true,
              file: configuration.outputFilePathJS,
              format: 'cjs'
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function bundleComponent(_x) {
    return _ref.apply(this, arguments);
  };
}();

var buildFromSourcePath =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(sourcePath) {
    var configuration;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            configuration = (0, _utilities.createConfiguration)(sourcePath);
            bundleComponent(configuration);
            (0, _createHTML.createHTML)(configuration);
            (0, _createServer.createServer)(configuration);
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log('[ manbun ] ERROR:\n\n');
            throw new Error(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function buildFromSourcePath(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var build =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(options, data) {
    var sourcePaths;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sourcePaths = (0, _utilities.getSourcePaths)();
            sourcePaths.forEach(
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(sourcePath) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return buildFromSourcePath(sourcePath);

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }());
            console.log('[ manbun ] COMPLETE');

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function build(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.build = build;