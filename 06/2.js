const lines = require('../lib/utils.js').lines(__dirname, '\n\n')
const groups = lines.map(group => group.split('\n').map(l => new Set(l.split('').sort())))

console.log(
  groups.map(group => {
    const allLetters = [...new Set(group.flatMap(p => [...p]))]
    return new Set(allLetters.filter(l => group.every(p => p.has(l)))).size
  }).reduce((a, b) => a + b)
)
