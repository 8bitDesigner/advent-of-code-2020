const lines = require('../lib/utils.js').lines(__dirname)
const questions = lines.map(line => {
  return line.split('').filter(t => t !== ' ').map(token => {
    const parsed = parseInt(token, 10)
    return isNaN(parsed) ? token : parsed
  })
})

// Turns parentheticals into subarrays
// eg: [1 + 2 (3 + 4)] => [1 + 2 + [3 + 4]]
function arrayify (tokens) {
  while (tokens.lastIndexOf('(') > -1) {
    const opening = tokens.lastIndexOf('(')
    const closing = tokens.slice(opening, tokens.length).indexOf(')')
    const inner = tokens.slice(opening + 1, opening + closing)

    tokens.splice(opening, inner.length + 2, inner)
  }

  return tokens
}

// Walks through array finding each instance of a given sign, replacing it,
// the lefthand element, and the righthand element with the result
// Calls out to `solve` when it encounters a subarray
function resolve (array, sign, func) {
  while (array.indexOf(sign) > -1) {
    const last = array.indexOf(sign)
    let a = array[last - 1]
    let b = array[last + 1]

    if (Array.isArray(a)) {
      a = solve(a)
    }

    if (Array.isArray(b)) {
      b = solve(b)
    }

    array.splice(last - 1, 3, func(a, b))
  }
}

function solve (array) {
  resolve(array, '+', (a, b) => a + b)
  resolve(array, '*', (a, b) => a * b)

  return array.pop()
}

console.log(
  questions.map(question => solve(arrayify(question))).reduce((a, b) => a + b)
)

