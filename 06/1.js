const groups = require('../lib/utils.js').lines(__dirname, '\n\n')

console.log(groups.map(group => {
  return new Set(group.split('\n').flatMap(l => l.split(''))).size
}).reduce((a, b) => a + b))
