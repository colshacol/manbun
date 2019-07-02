import path from 'path'

import { CWD } from './consts'

export const cwdResolve = (relativePath) => {
  return path.resolve(CWD, relativePath)
}

export const stringifyJSON = (object) => {
  return JSON.stringify(object, null, 2)
}