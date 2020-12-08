/* eslint-disable no-fallthrough */
const program = require('../lib/utils.js').lines(__dirname)

function toInt (str) {
  const [, sign, num] = str.match(/([+-])(\d+)/)
  const int = parseInt(num, 10)
  return sign === '-' ? int * -1 : int
}

function run (program, position = 0, accumulator = 0, seen = []) {
  const [command, arg] = program[position].split(' ')
  let nextPosition
  seen.push(position)

  switch (command) {
    case 'jmp':
      nextPosition = position + toInt(arg)
      break

    case 'acc':
      accumulator += toInt(arg)

    case 'nop':
    default:
      nextPosition = position + 1
  }

  if (seen.includes(nextPosition)) {
    return {
      exitCode: 1,
      value: accumulator,
      errorMessage: `Infinite loop detected on line \`${nextPosition}\``
    }
  } else if (nextPosition === program.length) {
    return {
      exitCode: 0,
      value: accumulator
    }
  } else {
    return run(program, nextPosition, accumulator, seen)
  }
}

const indices = program.map((line, index) => {
  const command = line.split(' ')[0]
  return ['jmp', 'nop'].includes(command) ? index : undefined
}).filter(x => x)

function rewrite (line) {
  let [command, arg] = line.split(' ')

  if (command === 'jmp') {
    command = 'nop'
  } else if (command === 'nop') {
    command = 'jmp'
  }

  return [command, arg].join(' ')
}

let result = run(program)

while (result.exitCode !== 0) {
  const lineNumber = indices.shift()
  const newProgram = [...program]
  newProgram[lineNumber] = rewrite(newProgram[lineNumber])
  result = run(newProgram)
}

console.log(result)
