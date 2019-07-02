import path from 'path'

import { CWD } from './consts'

export const cwdResolve = (relativePath) => {
  return path.resolve(CWD, relativePath)
}