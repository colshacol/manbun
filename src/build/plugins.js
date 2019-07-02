import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import fileSize from 'rollup-plugin-filesize'
import image from 'rollup-plugin-image'

import { NAMED_EXPORTS } from '../consts'

export const plugins = [
  image(),
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