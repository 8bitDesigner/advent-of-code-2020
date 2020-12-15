const lines = require('../lib/utils.js').lines(__dirname)

function turn (heading, direction, degrees) {
  const headings = ['N', 'E', 'S', 'W']
  let index = headings.indexOf(heading)

  if (direction === 'R') {
    index = (index + (degrees / 90)) % headings.length
  } else {
    index = (index - (degrees / 90)) % headings.length
    if (index < 0) {
      index = headings.length + index
    }
  }

  return headings[index]
}

function travel (heading, commands) {
  return commands.map(command => {
    const [, direction, count] = command.match(/^(\w)(\d+)/)
    return [direction, parseInt(count, 10)]
  }).map(([command, count]) => {
    if (['R', 'L'].includes(command)) {
      heading = turn(heading, command, count)
      return [heading, 0]
    } else if (command === 'F') {
      return [heading, count]
    } else {
      return [command, count]
    }
  }).reduce(function ([x, y], [command, distance]) {
    switch (command) {
      case 'N': return [x, y + distance]
      case 'S': return [x, y - distance]
      case 'E': return [x + distance, y]
      case 'W': return [x - distance, y]
      default: return [x, y]
    }
  }, [0, 0])
}

console.log(travel('E', lines).map(n => Math.abs(n)).reduce((a, b) => a + b))
