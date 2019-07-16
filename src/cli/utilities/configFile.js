import fs from 'fs'
import warning from 'warning'

import { pathsExist, readFile } from './filesystem';
import { cwdResolve } from './general';
import { CWD } from '../consts'

const validateConfigFileExists = (configFilePath) => {
  const exists = pathsExist([configFilePath])
  if (!exists) throw Error(`${configFilePath} is required but does not exist.`)
}

export const getConfigFile = (componentName) => {
  const relativePath = `source/components/${componentName}/.dsconfig.json`
  const configFilePath = cwdResolve(relativePath)

  validateConfigFileExists(configFilePath)
  const configFile = require(configFilePath)
  // validateConfigFileData(configFile)

  return configFile
}