import { rollup } from 'rollup'

import { createHTML } from './createHTML'
import { createServer } from './createServer'
import { getSourcePaths, createConfiguration } from './utilities'
import { plugins } from './plugins'
import { EXTERNALS } from '../consts'

const bundleComponent = async (configuration) => {
  const bundle = await rollup({
    input: configuration.inputFilePathJS,
    external: EXTERNALS,
    plugins: plugins()
  })

  await bundle.write({
    sourcemap: true,
    file: configuration.outputFilePathJS,
    format: 'cjs'
  })
}

const buildFromSourcePath = async (sourcePath) => {
  try {
    const configuration = createConfiguration(sourcePath)
    bundleComponent(configuration)
    createHTML(configuration)
    createServer(configuration)
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

  console.log('[ manbun ] COMPLETE')
}
