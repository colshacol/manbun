import path from 'path'

export const CWD = process.cwd()
export const PKG = require(`${CWD}/package.json`)
export const EXTERNALS = ['react', 'react-dom']
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

export const COMPONENT_TYPE_MAP = {
  page: 'f8component',
  widget: 'f8widget',
  action: 'f8action',
  security: 'f8security'
}
