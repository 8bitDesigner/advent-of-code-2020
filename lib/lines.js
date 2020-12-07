const fs = require('fs')
const path = require('path')

module.exports = function () {
  return fs.readFileSync(path.join(module.parent.path, './input'), 'utf8').trim().split('\n')
}
