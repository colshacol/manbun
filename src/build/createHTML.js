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
  // TODO
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
    const {${componentName} = require('${componentName}/${componentName}');
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