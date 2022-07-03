import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
const path = require( 'path')
export default {
  input: path.join(__dirname, './index.js'),
  output: {
    file: 'lib/index.min.js',
    format: 'cjs',
    name: 'DzHttp'
  },
  plugins: [
    nodeResolve({
      resolveOnly: ['js-cookie'],
    }),
    commonjs(),
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