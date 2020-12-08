const fs = require('fs')
const path = require('path')

module.exports = function (dirname, separator = '\n') {
  const filePath = path.join(dirname, './input')
  return fs.readFileSync(filePath, 'utf8').trim().split(separator)
}
