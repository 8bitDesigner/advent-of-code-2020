const lines = require('../lib/utils.js').lines(__dirname).map(n => parseInt(n, 10))
const asc = (a, b) => a < b ? -1 : a > b ? 1 : 0

const adaptors = [0, ...lines, Math.max(...lines) + 3].sort(asc)

function walk (current, cache = new Map()) {
  const target = adaptors[adaptors.length - 1]

  if (adaptors.indexOf(current) === -1) {
    return 0
  } else if (current === target) {
    return 1
  } else if (cache.has(current)) {
    return cache.get(current)
  } else {
    const size = walk(current + 1) + walk(current + 2) + walk(current + 3)
    cache.set(current, size)

    return size
  }
}

console.log(walk(0))
