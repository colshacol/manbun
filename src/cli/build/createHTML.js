import fs from 'fs'
import prettier from 'prettier'

import { stringifyJSON } from '../utilities/general'
import { prepareScriptForHTML } from './utilities'
import { COMPONENT_TYPE_MAP } from '../consts'

const getDefinition = (componentConfig) => {
  return {
    id: componentConfig.id,
    label: componentConfig.label,
    className: componentConfig.className,
    renderable: componentConfig.renderable,
    dependencies: componentConfig.dependencies
  }
}

const cleanHTML = (html) => {
  return html.replace(/ *</g, '<')
}

const getSourceCSS = (taskData) => {
  const cssFileExists = fs.existsSync(taskData.inputFilePathCSS)

  return cssFileExists
    ? prettier.format(fs.readFileSync(taskData.inputFilePathCSS, 'utf8'), { parser: 'css' })
    : ''
}

export const createHTML = (taskData) => {
  const { configFile } = taskData

  const type = COMPONENT_TYPE_MAP[configFile.type]
  const definitionString = stringifyJSON(getDefinition(configFile))
  const attributesString = stringifyJSON(configFile.attributes || [])
  const attributesLayoutString = stringifyJSON(configFile.attributes_layout || [])
  const attributesDisplayString = stringifyJSON(configFile.attributes_display_rules || [])
  const cssString = getSourceCSS(taskData)
  const scriptString = prepareScriptForHTML(taskData)

  const html = prettier.format(`
    <!DOCTYPE ${type}>
    <definition>\n${definitionString}\n</definition>
    ${attributesString.trim().length > 10 ? `<attributes>\n${attributesString}\n</attributes>` : ''}
    ${attributesLayoutString.trim().length > 10 ? `<attributes_layout>\n${attributesLayoutString}\n</attributes_layout>` : ''}
    ${attributesDisplayString.trim().length > 10 ? `<attributes_display_rules>\n${attributesString}\n</attributes_display_rules>` : ''}
    <style>\n${cssString}\n</style>
    <script>\n${scriptString}\n</script>
  `, { parser: 'html' })

  fs.writeFileSync(taskData.outputFilePathHTML, html, 'utf8')
}