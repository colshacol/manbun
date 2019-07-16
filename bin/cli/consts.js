"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTML_SCRIPT_CONTENT = exports.SERVER_FILE_CONTENT = exports.COMPONENT_TYPE_MAP = exports.PATHS_TO_VALIDATE = exports.NAMED_EXPORTS = exports.SOURCE_COMPONENTS_PATH = exports.EXTERNALS = exports.PKG = exports.CWD = void 0;

var _path = _interopRequireDefault(require("path"));

var _prettier = _interopRequireDefault(require("prettier"));

var CWD = process.cwd();
exports.CWD = CWD;

var PKG = require("".concat(CWD, "/package.json"));

exports.PKG = PKG;
var EXTERNALS = ['react', 'react-dom', 'ds.base', 'core'];
exports.EXTERNALS = EXTERNALS;

var SOURCE_COMPONENTS_PATH = _path["default"].resolve(CWD, 'source/components');

exports.SOURCE_COMPONENTS_PATH = SOURCE_COMPONENTS_PATH;
var NAMED_EXPORTS = {
  'ds.base/PageComponent': ['default'],
  'react-is': ["ForwardRef", "isFragment", "isPortal", "isStrictMode", "isElement", "isValidElementType", "isConcurrentMode", "typeOf", "isContextProvider", "isContextConsumer"],
  react: ['Component', 'PureComponent', 'createElement', 'default', 'useState', 'useContext', 'useMemo', 'createRef', 'useEffect'],
  "source/components/POSClover/components/index.js": ['Alert', 'Badge', 'Box', "Button", "Checkbox", "ContentSwitcher", "FileTree", "Heading", "Icon", "Image", "Input", "Label", "Link", "List", "Menu", "Modal", "Pane", "Pill", "PopOver", "Radio", "Select", "ShadowRoot", "Spacer", "Spinner", "Style", "Switch", "Table", "Text", "TextArea", "Toast", "Video"],
  "ensemble": ['Alert', 'Badge', 'Box', "Button", "Checkbox", "ContentSwitch", "FileTree", "Heading", "Icon", "Image", "Input", "Label", "Link", "List", "Menu", "Modal", "Pane", "Pill", "PopOver", "Radio", "Select", "ShadowRoot", "Spacer", "Spinner", "Style", "Switch", "Table", "Text", "TextArea", "Toast", "Video"]
};
exports.NAMED_EXPORTS = NAMED_EXPORTS;
var PATHS_TO_VALIDATE = ['/source/components/$$COMPONENT_NAME/.dsconfig.json', '/source/components/$$COMPONENT_NAME/$$COMPONENT_NAME.js', '/source/components/$$COMPONENT_NAME/$$COMPONENT_NAME.css'];
exports.PATHS_TO_VALIDATE = PATHS_TO_VALIDATE;
var COMPONENT_TYPE_MAP = {
  page: 'f8component',
  component: 'f8component',
  widget: 'f8widget',
  action: 'f8action',
  security: 'f8security'
};
exports.COMPONENT_TYPE_MAP = COMPONENT_TYPE_MAP;

var SERVER_FILE_CONTENT = _prettier["default"].format("\n  var PageComponent = require('ds.base/PageComponent');\n\n  var $$COMPONENT_NAMEServer = PageComponent.create({\n    type: '$$COMPONENT_NAMEServer',\n    \n    '/': function(attributes, vars) {\n      return new StatusResponse('good', {});\n      }\n  });\n\n  module.exports = $$COMPONENT_NAMEServer;\n", {
  parser: 'babel'
});

exports.SERVER_FILE_CONTENT = SERVER_FILE_CONTENT;

var HTML_SCRIPT_CONTENT = _prettier["default"].format("\n  var { $$COMPONENT_NAME } = require('$$DS_COMPONENT_NAME/$$COMPONENT_NAME');\n  exports.component = ComponentUI.createReactComponent($$COMPONENT_NAME );\n", {
  parser: 'babel'
});

exports.HTML_SCRIPT_CONTENT = HTML_SCRIPT_CONTENT;