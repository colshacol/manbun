import path from 'path'
import prettier from 'prettier'

export const CWD = process.cwd()
export const PKG = require(`${CWD}/package.json`)
export const EXTERNALS = ['react', 'react-dom', 'ds.base', 'core']
export const SOURCE_COMPONENTS_PATH = path.resolve(CWD, 'source/components')

export const NAMED_EXPORTS = {
  'ds.base/PageComponent': [
    'default',
  ],

  'react-is': ["ForwardRef", "isFragment", "isPortal", "isStrictMode", "isElement", "isValidElementType", "isConcurrentMode", "typeOf", "isContextProvider", "isContextConsumer"],

  react: [
    'Component',
    'PureComponent',
    'createElement',
    'default',
    'useState',
    'useContext',
    'useMemo',
    'createRef',
    'useEffect'
  ],

  "source/components/POSClover/components/index.js": [
    'Alert',
    'Badge',
    'Box',
    "Button",
    "Checkbox",
    "ContentSwitcher",
    "FileTree",
    "Heading",
    "Icon",
    "Image",
    "Input",
    "Label",
    "Link",
    "List",
    "Menu",
    "Modal",
    "Pane",
    "Pill",
    "PopOver",
    "Radio",
    "Select",
    "ShadowRoot",
    "Spacer",
    "Spinner",
    "Style",
    "Switch",
    "Table",
    "Text",
    "TextArea",
    "Toast",
    "Video"
  ],

  "ensemble": [
    'Alert',
    'Badge',
    'Box',
    "Button",
    "Checkbox",
    "ContentSwitch",
    "FileTree",
    "Heading",
    "Icon",
    "Image",
    "Input",
    "Label",
    "Link",
    "List",
    "Menu",
    "Modal",
    "Pane",
    "Pill",
    "PopOver",
    "Radio",
    "Select",
    "ShadowRoot",
    "Spacer",
    "Spinner",
    "Style",
    "Switch",
    "Table",
    "Text",
    "TextArea",
    "Toast",
    "Video"
  ]
}

export const PATHS_TO_VALIDATE = [
  '/source/components/$$COMPONENT_NAME/.dsconfig.json',
  '/source/components/$$COMPONENT_NAME/$$COMPONENT_NAME.js',
  '/source/components/$$COMPONENT_NAME/$$COMPONENT_NAME.css'
]

export const COMPONENT_TYPE_MAP = {
  page: 'f8component',
  component: 'f8component',
  widget: 'f8widget',
  action: 'f8action',
  security: 'f8security'
}

export const SERVER_FILE_CONTENT = prettier.format(`
  var PageComponent = require('ds.base/PageComponent');

  var $$COMPONENT_NAMEServer = PageComponent.create({
    type: '$$COMPONENT_NAMEServer',
    
    '/': function(attributes, vars) {
      return new StatusResponse('good', {});
      }
  });

  module.exports = $$COMPONENT_NAMEServer;
`, { parser: 'babel' })

export const HTML_SCRIPT_CONTENT = prettier.format(`
  var { $$COMPONENT_NAME } = require('$$DS_COMPONENT_NAME/$$COMPONENT_NAME');
  exports.component = ComponentUI.createReactComponent($$COMPONENT_NAME );
`, { parser: 'babel' })