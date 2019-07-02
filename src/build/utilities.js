import shell from 'shelljs'
import path from 'path'

import { cwdResolve } from '../utilities'
import { SOURCE_COMPONENTS_PATH, CWD } from '../consts'

type ConfigurationType = {
  [property: string]: string
}

export const copyHTMLFile = (configuration: ConfigurationType): void => {
  shell.cp(
    '-u',
    configuration.inputFilePathHTML,
    configuration.outputFilePathHTML
  )
}

export const getSourcePaths = (): string[] => {
  const dirs = shell.ls('-d', `${SOURCE_COMPONENTS_PATH}/*`);
  return Array.from(dirs)
}

export const createConfiguration = (relativeSourcePath: string): ConfigurationType => {
  const substringStartIndex = relativeSourcePath.lastIndexOf('/') + 1
  const componentName = relativeSourcePath.substr(substringStartIndex)
  const sourcePath = cwdResolve(relativeSourcePath)

  const inputFilePathJS = `${sourcePath}/${componentName}.js`
  const configFilePath = `${sourcePath}/${componentName}.json`
  const inputFilePathCSS = `${sourcePath}/${componentName}.css`

  const outputDirectoryPath = cwdResolve(`./components/${componentName}`)
  const outputFilePathJS = `${outputDirectoryPath}/${componentName}.js`
  const outputFilePathHTML = `${outputDirectoryPath}/${componentName}.html`

  return {
    sourcePath,
    componentName,
    sourcePath,
    inputFilePathJS,
    inputFilePathCSS,
    configFilePath,
    outputDirectoryPath,
    outputFilePathJS,
    outputFilePathHTML
  }
}

