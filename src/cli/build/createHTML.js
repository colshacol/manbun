import fs from 'fs'
import prettier from 'prettier'

import { stringify } from '../../utilities/general'
import { prepareScriptForHTML } from './utilities'
import { COMPONENT_TYPE_MAP } from '../../consts'

const getDefinition = (configFile) => {
  const isRenderable = ['component', 'page'].includes(configFile.type)

  return {
    id: configFile.id,
    label: configFile.label,
    className: configFile.serverName,
    renderable: isRenderable,
    dependencies: configFile.dependencies
  }
}

const getSourceCSS = (taskData) => {
  const cssFileExists = fs.existsSync(taskData.inputFilePathCSS)

  const cssContent = cssFileExists
    ? fs.readFileSync(taskData.inputFilePathCSS, 'utf8')
    : ''

  return prettier.format(cssContent, { parser: 'css' })
}

export const createHTML = (taskData) => {
  const { configFile } = taskData
  const type = COMPONENT_TYPE_MAP[configFile.type]

  const definitionString = stringify(getDefinition(configFile))
  const attributesString = stringify(configFile.attributes || '')
  const attributesLayoutString = stringify(configFile.attributes_layout || '')
  const attributesDisplayString = stringify(configFile.attributes_display_rules || '')

  const cssString = getSourceCSS(taskData)
  const scriptString = prepareScriptForHTML(taskData)

  const html = prettier.format(`
    <!DOCTYPE ${type}>
    <definition>\n${definitionString}\n</definition>
    ${attributesString ? `<attributes>\n${attributesString}\n</attributes>` : ''}
    ${attributesLayoutString ? `<attributes_layout>\n${attributesLayoutString}\n</attributes_layout>` : ''}
    ${attributesDisplayString ? `<attributes_display_rules>\n${attributesString}\n</attributes_display_rules>` : ''}
    <style>\n${cssString}\n</style>
    <script>\n${scriptString}\n</script>
  `, { parser: 'html' })

  fs.writeFileSync(taskData.outputFilePathHTML, html, 'utf8')
}