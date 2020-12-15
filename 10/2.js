const lines = require('../lib/utils.js').lines(__dirname).map(n => parseInt(n, 10))
const asc = (a, b) => a < b ? -1 : a > b ? 1 : 0
const adaptors = [0, ...lines, Math.max(...lines) + 3].sort(asc)

function walk (list, current, target, cache = new Map()) {
  if (list.indexOf(current) === -1) {
    return 0
  } else if (current === target) {
    return 1
  } else if (cache.has(current)) {
    return cache.get(current)
  } else {
    cache.set(current, (
      walk(list, current + 1, target, cache) +
      walk(list, current + 2, target, cache) +
      walk(list, current + 3, target, cache)
    ))

    return cache.get(current)
  }
}

console.log(
  walk(
    adaptors,
    0,
    adaptors[adaptors.length - 1]
  )
)
