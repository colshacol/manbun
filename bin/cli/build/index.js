"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = void 0;

var _rollup = require("rollup");

var _createHTML = require("./createHTML");

var _createServer = require("./createServer");

var _utilities = require("./utilities");

var _plugins = require("./plugins");

var _consts = require("../consts");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bundleComponent =
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
              input: configuration.inputFilePathJS,
              external: _consts.EXTERNALS,
              plugins: (0, _plugins.plugins)()
            });

          case 2:
            bundle = _context.sent;
            _context.next = 5;
            return bundle.write({
              sourcemap: false,
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
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(sourcePath) {
    var configuration;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(options, data) {
    var sourcePaths;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sourcePaths = (0, _utilities.getSourcePaths)();
            sourcePaths.forEach(
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(sourcePath) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
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