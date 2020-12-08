const fs = require('fs')
const path = require('path')

module.exports.lines = function (pwd, separator = '\n') {
  return fs.readFileSync(path.join(pwd, './input'), 'utf8').trim().split(separator)
}
