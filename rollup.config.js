import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss'
const path = require( 'path')
export default {
  input: path.join(__dirname, './index.js'),
  output: [{
    file: 'lib/index.min.umd.js',
    format: 'umd',
    name: 'DzHttp'
  }, {
    file: 'lib/index.es.js',
    format: 'esm',
    name: 'DzHttp'
  }],
  plugins: [
    commonjs(),
    nodeResolve({
      browser: true
    }),
    postcss({
      plugins: []
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          "modules": false,
          "useBuiltIns": "usage",
          "corejs": "3.18.3"
        }]
      ],
    }),
    terser()
  ]
}