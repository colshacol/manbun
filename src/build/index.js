import { rollup } from 'rollup'

import { copyHTMLFile, getSourcePaths, createConfiguration } from './utilities'
import { plugins } from './plugins'
import { EXTERNALS } from '../consts'

export const build = async (options, data) => {
  const sourcePaths = getSourcePaths()

  try {
    for (const sourcePath of sourcePaths) {
      const configuration = createConfiguration(sourcePath)

      const bundle = await rollup({
        input: configuration.inputFilePathJS,
        external: EXTERNALS,
        plugins
      })

      console.log('BUNDLE PAST')

      await bundle.write({
        sourcemap: true,
        file: configuration.outputFilePathJS,
        format: 'cjs'
      })

      copyHTMLFile(configuration)
      console.log('[ nambun ] SUCCESS')
    }
  } catch (error) {
    console.log('[ manbun ] ERROR\n\n')
    console.log(error.stack)
    throw new Error(error)
  }
}
