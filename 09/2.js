const lines = require('../lib/utils.js').lines(__dirname).map(s => parseInt(s, 10))
const target = 36845998
const sum = arr => arr.reduce((a, b) => a + b)

function search (windowSize) {
  return lines.reduce((found, line, index) => {
    if (found || index < windowSize) { return found }

    const range = lines.slice(index - windowSize, index)

    return sum(range) === target ? range : found
  }, false)
}

let range

for (let windowSize = 2; windowSize < lines.length; windowSize++) {
  if (range) { break }
  range = search(windowSize, windowSize)
}

if (range) {
  console.log(Math.min(...range) + Math.max(...range))
} else {
  console.error('Could not find contiguous block summing to ', target)
}
