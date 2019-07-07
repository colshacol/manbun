import path from 'path'

import { CWD } from '../consts'

export const cwdResolve = (relativePath) => {
  return path.resolve(CWD, relativePath)
}

export const stringify = (target) => {
  if (kind(target) === 'string') {
    return target
  }

  if (kind(target) === 'number') {
    return String(number)
  }

  if (kind(target) === 'boolean') {
    return target ? 'true' : 'false'
  }

  if (kind(target) === 'function') {
    return target.toString()
  }

  if (kind(target) === 'array') {
    return JSON.stringify(target, null, 2)
  }

  if (kind(target) === 'object') {
    return JSON.stringify(target, null, 2)
  }

  try {
    return JSON.stringify(target)
  } catch (error) {
    return target
  }
}