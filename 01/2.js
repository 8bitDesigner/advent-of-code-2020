const lines = require('../lib/utils').lines(__dirname).map(l => parseInt(l, 10))
let found

lines.forEach(first => {
  lines.forEach(second => {
    lines.forEach(third => {
      if (found) return
      if (first === second || first === third || second === third) return
      if (first + second + third === 2020) found = [first, second, third]
    })
  })
})

console.log(found[0] * found[1] * found[2])
