import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import fileSize from 'rollup-plugin-filesize'

import { NAMED_EXPORTS } from '../consts'

export const plugins = [
  fileSize(),
  babel({ runtimeHelpers: true }),

  resolve({
    preferBuiltins: true,
    browser: true,
  }),

  commonjs({
    namedExports: NAMED_EXPORTS
  }),
]