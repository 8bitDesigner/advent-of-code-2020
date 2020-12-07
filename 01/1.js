const lines = require('../lib/utils').lines(__dirname).map(l => parseInt(l, 10))
let found

lines.forEach(line => {
  lines.forEach(other => {
    if (line === other) return
    if (found) return
    if (line + other === 2020) { found = [line, other] }
  })
})

console.log(found[0] * found[1])
