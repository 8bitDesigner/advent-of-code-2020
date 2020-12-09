const lines = require('../lib/utils.js').lines(__dirname).map(s => parseInt(s, 10))
const isnt = x => y => x !== y

function findOutlier (searchLength, index) {
  const range = lines.slice(index - searchLength, index)
  const target = lines[index]

  const factors = range.reduce((factors, num) => {
    if (factors.length) { return factors }
    const other = range.filter(isnt(num)).find(n => n + num === target)
    return other ? [num, other] : factors
  }, [])

  if (factors.length) {
    return findOutlier(searchLength, index + 1)
  } else {
    return target
  }
}

console.log(findOutlier(25, 25))
