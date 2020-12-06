const fs = require('fs')
const groups = fs.readFileSync('./input', 'utf8').split('\n\n')

console.log(groups.map(group => {
  return new Set(group.split('\n').flatMap(l => l.split(''))).size
}).reduce((a, b) => a + b))
