const [ruleGroup, messageGroup] = require('../lib/utils.js').lines(__dirname, '\n\n')
const messages = messageGroup.split('\n').map(string => string.split(''))
const letterRegex = /^"(a|b)"$/

function handleLetter (definition) {
  const letter = definition.match(letterRegex)[1]

  return function testLetter (value) {
    if (Array.isArray(value)) {
      return letter === value[0] ? value.slice(1, value.length) : false
    } else {
      return value
    }
  }
}

function handleMulti (rules, definition) {
  const lookups = definition.split(' ').map(n => parseInt(n, 10))

  return function testMulti (value) {
    return lookups.reduce((result, ruleNum) => {
      if (!Array.isArray(value)) {
        return value
      } else {
        return rules.get(ruleNum)(result)
      }
    }, value)
  }
}

function handleOr (rules, definition) {
  const pipe = definition.indexOf('|')
  const left = definition.slice(0, pipe).trim()
  const right = definition.slice(pipe + 1, definition.length).trim()

  return function testOr (value) {
    if (!Array.isArray(value)) {
      return value
    } else {
      const leftVal = handleMulti(rules, left)([...value])
      const rightVal = handleMulti(rules, right)([...value])

      if (leftVal) {
        return leftVal
      } else if (rightVal) {
        return rightVal
      } else {
        return false
      }
    }
  }
}

function ruleMaker (rules, definition) {
  if (definition.match(letterRegex)) {
    return handleLetter(definition)
  } else if (definition.indexOf('|') > -1) {
    return handleOr(rules, definition)
  }
}

const rules = new Map()

ruleGroup.split('\n').forEach(line => {
  const [number, definition] = line.split(': ')
  rules.set(parseInt(number, 10), ruleMaker(rules, definition))
})

function validate (message) {
  const result = rules.get(0)(message)
  return Array.isArray(result) && result.length === 0
}

console.log(messages.filter(message => validate(message)).length)
