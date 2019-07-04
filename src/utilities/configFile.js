import fs from 'fs'
import invariant from 'invariant'
import warning from 'warning'

import { pathsExist, readFile } from './filesystem';
import { cwdResolve } from './general';
import { CWD } from '../consts'

const validateConfigFileExists = (configFilePath) => {
  const exists = pathsExist([configFilePath])
  invariant(exists, `${configFilePath} is required but does not exist.`)
}

export const getConfigFile = (componentName) => {
  const relativePath = `source/components/${componentName}/_config.json`
  const configFilePath = cwdResolve(relativePath)

  validateConfigFileExists(configFilePath)
  const configFile = require(configFilePath)
  // validateConfigFileData(configFile)

  return configFile
}