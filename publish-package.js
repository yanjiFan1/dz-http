const path = require('path');
const { spawnSync } = require('child_process')
const { writeFileSync } = require('fs')
const pkg = require('./package.json')

pkg.main = 'lib/index.min.js'
let pkgContent = JSON.stringify(pkg, null, 2)
writeFileSync(path.join(__dirname, './package.json'), pkgContent)

const commond = process.platform === 'win32' ? 'npm.cmd' : 'npm'

spawnSync(commond, ['run', 'bump'], { stdio: 'inherit'})