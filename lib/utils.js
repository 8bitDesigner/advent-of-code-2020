const fs = require('fs')
const path = require('path')

module.exports.lines = function (pwd) {
  return fs.readFileSync(path.join(pwd, './input'), 'utf8').split('\n')
}

module.exports.groups = function (pwd) {
  return fs.readFileSync(path.join(pwd, './input'), 'utf8').split('\n\n')
}
