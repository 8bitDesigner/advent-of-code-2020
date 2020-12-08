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

console.log(run(program))
