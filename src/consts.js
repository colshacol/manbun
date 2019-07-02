import path from 'path'

export const EXTERNALS = ['react', 'react-dom']

export const NAMED_EXPORTS = {
  react: ['Component', 'PureComponent', 'createElement', 'default', 'useState', 'useContext', 'useMemo', 'createRef', 'useEffect'],
}

export const SOURCE_COMPONENTS_PATH = path.resolve(process.cwd(), 'source/components')