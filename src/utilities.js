import shell from 'shelljs'
import path from 'path'

import { SOURCE_COMPONENTS_PATH } from './consts'

type ConfigurationType = {
  [property: string]: string
}

const cwd = process.cwd()

const copyHTMLFile = (configuration: ConfigurationType): void => {
  shell.cp(
    '-u',
    configuration.inputFilePathHTML,
    configuration.outputFilePathHTML
  )
}

const getSourcePaths = (): string[] => {
  const dirs = shell.ls('-d', `${SOURCE_COMPONENTS_PATH}/*`);
  return Array.from(dirs)
}

const cwdResolve = (relativePath) => {
  return path.resolve(cwd, relativePath)
}

const createConfiguration = (relativeSourcePath: string): ConfigurationType => {
  const componentName = relativeSourcePath.substr(relativeSourcePath.lastIndexOf('/'))
  const sourcePath = cwdResolve(relativeSourcePath)

  const inputDirectoryPath = cwdResolve(`./${sourcePath}/${componentName}`)
  const outputDirectoryPath = cwdResolve(`./components/${componentName}`)

  const inputFilePathJS = `${inputDirectoryPath}.js`
  const inputFilePathHTML = `${inputDirectoryPath}.html`
  const outputFilePathJS = `${outputDirectoryPath}.js`
  const outputFilePathHTML = `${outputDirectoryPath}.html`

  return {
    sourcePath,
    componentName,
    inputDirectoryPath,
    inputFilePathJS,
    inputFilePathHTML,
    outputDirectoryPath,
    outputFilePathJS,
    outputFilePathHTML
  }
}
