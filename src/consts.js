import path from 'path'
import prettier from 'prettier'

export const CWD = process.cwd()
export const PKG = require(`${CWD}/package.json`)
export const EXTERNALS = ['react', 'react-dom', 'ds.base']
export const SOURCE_COMPONENTS_PATH = path.resolve(CWD, 'source/components')

export const NAMED_EXPORTS = {
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
  ]
}

export const PATHS_TO_VALIDATE = [
  '/source/components/$$COMPONENT_NAME/_config.json',
  '/source/components/$$COMPONENT_NAME/$$COMPONENT_NAME.js',
  '/source/components/$$COMPONENT_NAME/$$COMPONENT_NAME.css'
]

export const COMPONENT_TYPE_MAP = {
  page: 'f8component',
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
  var React = require('react');
  var ReactDOM = require('react-dom');
  var Component = require('$$COMPONENT_NAME/$$COMPONENT_NAME');

  exports.component = ComponentUI.create({
  onLoad: function(data) {
          var props = {};
          var ComponentNew = React.createFactory(Component);
          ReactDOM.render(ComponentNew(props), this.container[0]);
      },

      onUnload: function() {
          ReactDOM.unmountComponentAtNode(this.container[0]);
      },
  });
`, { parser: 'babel' })