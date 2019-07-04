import shell from 'shelljs'
import path from 'path'

import { cwdResolve } from '../utilities/general'
import { getConfigFile } from '../utilities/configFile'
import { SOURCE_COMPONENTS_PATH, CWD, HTML_SCRIPT_CONTENT, SERVER_FILE_CONTENT } from '../consts'

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
  const dsComponentName = relativeSourcePath.substr(substringStartIndex)
  const sourcePath = cwdResolve(relativeSourcePath)

  const configFile = getConfigFile(dsComponentName)
  const { componentName } = configFile

  const inputFilePathJS = `${sourcePath}/${componentName}.js`
  const inputFilePathCSS = `${sourcePath}/${componentName}.css`
  const inputFilePathServer = `${sourcePath}/server/index.js`

  const outputDirectoryPath = cwdResolve(`./components/${dsComponentName}`)
  const outputFilePathJS = `${outputDirectoryPath}/content/modules/${componentName}.js`
  const outputFilePathHTML = `${outputDirectoryPath}/${componentName}Client.html`
  const outputFilePathServer = `${outputDirectoryPath}/${componentName}Server.js`


  return {
    inputFilePathServer,
    dsComponentName,
    configFile,
    sourcePath,
    componentName,
    sourcePath,
    inputFilePathJS,
    inputFilePathCSS,
    outputDirectoryPath,
    outputFilePathJS,
    outputFilePathHTML,
    outputFilePathServer
  }
}

const injectComponentName = (target, configuration) => {
  const a = target.replace(/(\$\$COMPONENT_NAME)/g, configuration.componentName)
  return a.replace(/(\$\$DS_COMPONENT_NAME)/g, configuration.dsComponentName)
}

export const prepareServerScript = (configuration) => {
  return injectComponentName(SERVER_FILE_CONTENT, configuration)
}

export const prepareScriptForHTML = (configuration) => {
  return injectComponentName(HTML_SCRIPT_CONTENT, configuration)
}


const validateConfig = (configFile) => {
  if (!configFile.type) {
    throw new Error(`[ manbun ] ERROR: ${configFile.componentName}.json type property is required.`)
  }

  if (!configFile.id) {
    throw new Error(`[ manbun ] ERROR: ${configFile.componentName}.json id property is required.`)
  }

  if (!configFile.label) {
    throw new Error(`[ manbun ] ERROR: ${configFile.componentName}.json label property is required.`)
  }

  if (!configFile.className) {
    throw new Error(`[ manbun ] ERROR: ${configFile.componentName}.json className property is required.`)
  }

  if (!configFile.renderable) {
    throw new Error(`[ manbun ] ERROR: ${configFile.componentName}.json renderable property is required.`)
  }

  if (configFile.attributes && !Array.isArray(configFile.attributes)) {
    throw new Error(`[ manbun ] ERROR: ${configFile.componentName}.json attributes value must be an array.`)
  }

  if (configFile.attributes && !Array.isArray(configFile.attributes_layout)) {
    throw new Error(`[ manbun ] ERROR: ${configFile.componentName}.json type attributes_layout value must be an array.`)
  }

  if (configFile.attributes && !Array.isArray(configFile.attributes_display_rules)) {
    throw new Error(`[ manbun ] ERROR: ${configFile.componentName}.json attributes_display_rules value must be an array.`)
  }
}
