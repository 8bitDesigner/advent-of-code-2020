const lines = require('../lib/utils.js').lines(__dirname)
const questions = lines.map(line => {
  return line.split('').filter(t => t !== ' ').map(token => {
    const parsed = parseInt(token, 10)
    return isNaN(parsed) ? token : parsed
  })
})

function arrayify (tokens) {
  while (tokens.lastIndexOf('(') > -1) {
    const opening = tokens.lastIndexOf('(')
    const closing = tokens.slice(opening, tokens.length).indexOf(')')
    const inner = tokens.slice(opening + 1, opening + closing)

    tokens.splice(opening, inner.length + 2, inner)
  }

  return tokens
}

function solve (array) {
  const stack = [...array]

  while (stack.length > 1) {
    let a = stack.shift()
    const operator = stack.shift()
    let b = stack.shift()

    if (Array.isArray(a)) {
      a = solve(a)
    }

    if (Array.isArray(b)) {
      b = solve(b)
    }

    if (operator === '*') {
      stack.unshift(a * b)
    } else if (operator === '+') {
      stack.unshift(a + b)
    }
  }

  return stack.pop()
}

console.log(
  questions.map(question => solve(arrayify(question))).reduce((a, b) => a + b)
)
