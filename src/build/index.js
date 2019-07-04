import 'regenerator-runtime/runtime'
import { rollup } from 'rollup'

import { createHTML } from './createHTML'
import { createServer } from './createServer'
import { getSourcePaths, createConfiguration } from './utilities'
import { plugins } from './plugins'
import { EXTERNALS } from '../consts'

const buildFromSourcePath = async (sourcePath) => {
  try {
    const configuration = createConfiguration(sourcePath)

    const bundle = await rollup({
      input: configuration.inputFilePathJS,
      external: EXTERNALS,
      plugins
    })

    await bundle.write({
      sourcemap: true,
      file: configuration.outputFilePathJS,
      format: 'cjs'
    })

    console.log(`[ manbun ] BUNDLED ${configuration.componentName}`)

    createHTML(configuration)
    console.log(`[ manbun ] CREATED HTML FOR ${configuration.componentName}`)

    createServer(configuration)
    console.log(`[ manbun ] CREATED SERVER FOR ${configuration.componentName}`)

  } catch (error) {
    console.log('[ manbun ] ERROR:\n\n')
    throw new Error(error)
  }
}

export const build = async (options, data) => {
  const sourcePaths = getSourcePaths()

  sourcePaths.forEach(async sourcePath => {
    await buildFromSourcePath(sourcePath)
  })

  console.log('[ nambun ] SUCCESS')
}
