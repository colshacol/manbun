import fs from 'fs'
import cleanCSS from 'cssbeautify'

import { stringifyJSON } from '../utilities'
import { COMPONENT_TYPE_MAP } from '../consts'

const getDefinition = (componentConfig) => {
  return {
    id: componentConfig.id,
    label: componentConfig.label,
    className: componentConfig.className,
    renderable: componentConfig.renderable
  }
}

const cleanHTML = (html) => {
  return html.replace(/ *</g, '<')
}

const validateConfig = (componentConfig) => {
  if (!componentConfig.type) {
    throw new Error(`[ manbun ] ERROR: ${componentConfig.componentName}.json type property is required.`)
  }

  if (!componentConfig.id) {
    throw new Error(`[ manbun ] ERROR: ${componentConfig.componentName}.json id property is required.`)
  }

  if (!componentConfig.label) {
    throw new Error(`[ manbun ] ERROR: ${componentConfig.componentName}.json label property is required.`)
  }

  if (!componentConfig.className) {
    throw new Error(`[ manbun ] ERROR: ${componentConfig.componentName}.json className property is required.`)
  }

  if (!componentConfig.renderable) {
    throw new Error(`[ manbun ] ERROR: ${componentConfig.componentName}.json renderable property is required.`)
  }

  if (!Array.isArray(componentConfig.attributes)) {
    throw new Error(`[ manbun ] ERROR: ${componentConfig.componentName}.json attributes value must be an array.`)
  }

  if (!Array.isArray(componentConfig.attributes_layout)) {
    throw new Error(`[ manbun ] ERROR: ${componentConfig.componentName}.json type attributes_layout value must be an array.`)
  }

  if (!Array.isArray(componentConfig.attributes_display_rules)) {
    throw new Error(`[ manbun ] ERROR: ${componentConfig.componentName}.json attributes_display_rules value must be an array.`)
  }
}

const getSourceCSS = (configuration) => {
  const cssFileExists = fs.existsSync(configuration.inputFilePathCSS)

  return cssFileExists
    ? cleanCSS(fs.readFileSync(configuration.inputFilePathCSS, 'utf8'))
    : ''
}

const getScriptHTML = (configuration) => {
  const { componentName } = configuration

  return `
    const {${componentName}} = require('${componentName}/${componentName}');
    exports.component = ComponentUI.createReactComponent(${componentName});
  `
}

export const createHTML = (configuration) => {
  const componentConfig = require(configuration.configFilePath)
  validateConfig(componentConfig)

  const type = COMPONENT_TYPE_MAP[componentConfig.type]
  const definitionString = stringifyJSON(getDefinition(componentConfig))
  const attributesString = stringifyJSON(componentConfig.attributes || [])
  const attributesLayoutString = stringifyJSON(componentConfig.attributes_layout || [])
  const attributesDisplayString = stringifyJSON(componentConfig.attributes_display_rules || [])
  const cssString = getSourceCSS(configuration)
  const scriptString = getScriptHTML(configuration)

  const html = cleanHTML(`
    <!DOCTYPE ${type}>
    <definition>\n${definitionString}\n</definition>
    <attributes>\n${attributesString}\n</attributes>
    <attributes_layout>\n${attributesLayoutString}\n</attributes_layout>
    <attributes_display_rules>\n${attributesDisplayString}\n</attributes_display_rules>
    <style>\n${cssString}\n</style>
    <script>\n${scriptString}\n</script>
  `)

  fs.writeFileSync(configuration.outputFilePathHTML, html, 'utf8')
}