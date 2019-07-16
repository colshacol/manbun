import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import fileSize from 'rollup-plugin-filesize'
import image from 'rollup-plugin-image'
import postcss from 'rollup-plugin-postcss'
import cssNext from 'postcss-cssnext'

import { NAMED_EXPORTS } from '../consts'

export const plugins = (browser = true) => ([
  image(),
  fileSize(),
  babel({ runtimeHelpers: true }),

  resolve({
    preferBuiltins: true,
    browser,
  }),

  commonjs({
    namedExports: NAMED_EXPORTS
  }),

  postcss({
    plugins: [
      cssNext()
    ]
  })
])