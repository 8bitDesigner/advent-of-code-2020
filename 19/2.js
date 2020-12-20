const [ruleGroup, messageGroup] = require('../lib/utils.js').lines(__dirname, '\n\n')
const messages = messageGroup.split('\n').map(string => string.split(''))
const letterRegex = /^"(a|b)"$/

// 377 too high

function handleLetter (definition) {
  const letter = definition.match(letterRegex)[1]

  return function testLetter (array) {
    return letter === array[0] ? array.slice(1, array.length) : false
  }
}

function handleMulti (rules, definition) {
  const lookups = definition.split(' ').map(n => parseInt(n, 10))

  return function testMulti (value) {
    return lookups.reduce((result, ruleNum) => {
      if (value === false || value.length === 0) {
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
    if (value === false || value.length === 0) {
      return value
    } else {
      const leftVal = handleMulti(rules, left)([...value])
      const rightVal = handleMulti(rules, right)([...value])

      return leftVal || rightVal || false
    }
  }
}

function ruleMaker (rules, ruleNum, definition) {
  let func

  if (definition.match(letterRegex)) {
    func = handleLetter(definition)
  } else if (definition.indexOf('|') > -1) {
    func = handleOr(rules, definition)
  } else {
    func = handleMulti(rules, definition)
  }

  return (...args) => {
    const result = func(...args)
    console.log(`(${ruleNum}: ${definition}) ${args} -> ${result}`)
    return result
  }
}

const rules = new Map()

ruleGroup.split('\n').forEach(line => {
  const [number, definition] = line.split(': ')
  rules.set(parseInt(number, 10), ruleMaker(rules, number, definition))
})

// Patch the rules
rules.set(8, ruleMaker(rules, 8, '42 | 42 8'))
rules.set(11, ruleMaker(rules, 11, '42 31 | 42 11 31'))

function validate (message) {
  const result = rules.get(0)(message)
  return Array.isArray(result) && result.length === 0
}

const valid = messages.filter(message => validate(message))
valid.forEach(message => console.log(`Validated! ${message.join('')}`))
console.log(valid.length)
