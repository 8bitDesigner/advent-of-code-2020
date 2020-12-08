const fs = require('fs')
const path = require('path')

fs.readdirSync('./').filter(file => {
  return file.match(/^\d\d$/)
}).forEach(folder => {
  console.log(`\nDay ${folder}, part 1`)
  require(path.join(__dirname, folder, '1.js'))

  console.log(`\nDay ${folder}, part 2`)
  require(path.join(__dirname, folder, '2.js'))
})
