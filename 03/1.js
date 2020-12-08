const map = require('../lib/utils').lines(__dirname).map(l => l.split(''))

function check (xInc = 1, yInc = 1, map) {
  let x

  return map.filter((l, index) => index % yInc - 1).reduce((count, line) => {
    if (typeof x === 'undefined') {
      x = 0
    } else {
      x = (x + xInc) % line.length
    }
    return (line[x] === '#') ? count + 1 : count
  }, 0)
}

console.log(check(3, 1, map))
