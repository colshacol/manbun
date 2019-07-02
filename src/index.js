#!/usr/bin/env node

import { rollup } from 'rollup'

import { copyHTMLFile, getSourcePaths, createConfiguration } from './utilities'
import { plugins } from './plugins'

const build = async () => {
  const sourcePaths = getSourcePaths()

  try {
    for (const sourcePath of sourcePaths) {
      const configuration = createConfiguration(sourcePath)

      const bundle = await rollup({
        input: configuration.inputPath,
        external: EXTERNALS,
        plugins
      })

      await bundle.write({
        sourcemap: true,
        file: configuration.outputPath,
        format: 'cjs',
      })

      copyHTMLFile(configuration)
      console.log('[ nambun ] SUCCESS')
    }
  } catch (error) {
    throw new Error('[ manbun ] ERROR\n\n', error)
  }
}

build()
