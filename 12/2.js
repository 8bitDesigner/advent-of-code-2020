const lines = require('../lib/utils.js').lines(__dirname)

const times = (num, callback) => new Array(num).fill('').forEach(callback)

class Waypoint {
  constructor (coords) {
    const [x, y] = coords
    this.x = x
    this.y = y
  }

  move (direction, distance) {
    if (direction === 'N') {
      this.y = this.y + distance
    } else if (direction === 'S') {
      this.y = this.y - distance
    } else if (direction === 'E') {
      this.x = this.x + distance
    } else if (direction === 'W') {
      this.x = this.x - distance
    }

    return this
  }

  turn (direction, degrees) {
    const count = degrees / 90

    if (direction === 'R') {
      times(count, () => this.right90())
    } else if (direction === 'L') {
      times(count, () => this.left90())
    }

    return this
  }

  right90 () {
    const y = this.y
    const x = this.x

    this.x = y
    this.y = x * -1
  }

  left90 () {
    const y = this.y
    const x = this.x

    this.x = y * -1
    this.y = x
  }
}

function parseCommand (string) {
  const [, direction, count] = string.match(/^(\w)(\d+)/)
  return [direction, parseInt(count, 10)]
}

function travel (waypoint, position, commands) {
  const [, finalPosition] = commands.map(parseCommand).reduce((state, input) => {
    const [command, distance] = input
    const [waypoint, position] = state
    const [x, y] = position

    switch (command) {
      case 'L':
      case 'R':
        return [waypoint.turn(command, distance), position]

      case 'N':
      case 'S':
      case 'E':
      case 'W':
        return [waypoint.move(command, distance), position]

      case 'F':
        return [waypoint, [x + (waypoint.x * distance), y + (waypoint.y * distance)]]

      default:
        return [waypoint, position]
    }
  }, [waypoint, position])

  return finalPosition[0] + finalPosition[1]
}

console.log(travel(new Waypoint([10, 1]), [0, 0], lines))
