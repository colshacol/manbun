import { rollup } from 'rollup'

import { createHTML } from './createHTML'
import { plugins } from './plugins'
import { EXTERNALS } from '../consts'

export const createServer = async (configuration) => {
  const bundle = await rollup({
    input: configuration.inputFilePathServer,
    external: EXTERNALS,
    plugins: plugins(),
  })

  await bundle.write({
    sourcemap: false,
    file: configuration.outputFilePathServer,
    format: 'cjs'
  })
}