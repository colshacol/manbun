import fs from 'fs'
import pretty from 'pretty'

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

export const createHTML = (configuration) => {
  const componentConfig = require(configuration.configFilePath)
  const type = COMPONENT_TYPE_MAP[componentConfig.type]
  const definitionString = stringifyJSON(getDefinition(componentConfig))
  const attributesString = stringifyJSON(componentConfig.attributes)
  const attributesLayoutString = stringifyJSON(componentConfig.attributes_layout)
  const attributesDisplayString = stringifyJSON(componentConfig.attributes_display_rules)

  const html = cleanHTML(`
    <!DOCTYPE ${type}>
    <definition>\n${definitionString}\n</definition>
    <attributes>\n${attributesString}\n</attributes>
    <attributes_layout>\n${attributesLayoutString}\n</attributes_layout>
    <attributes_display_rules>\n${attributesDisplayString}\n</attributes_display_rules>
  `)

  fs.writeFileSync(configuration.outputFilePathHTML, html, 'utf8')
}