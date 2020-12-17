const input = require('../lib/utils.js').lines(__dirname)

class Chip {
  constructor (size) {
    this.size = size
    this.mask = new Array(size).fill(0)
    this.memory = new Map()
  }

  setMask (mask) {
    this.mask = mask.split('').map(bit => bit === 'X' ? bit : parseInt(bit, 10))
  }

  read (instruction) {
    const [assignee, value] = instruction.split(' = ')

    if (assignee === 'mask') {
      this.setMask(value)
    } else {
      const address = parseInt(assignee.split('[')[1].split(']')[0], 10)
      this.write(address, parseInt(value, 10))
    }
  }

  write (address, int) {
    console.log('writing', address, int)
    if (!this.memory.has(address)) {
      this.memory.set(address, new Buffer(this.size))
    }

    this.memory.get(address).write(int, this.mask)
  }
}

class Buffer {
  constructor (size) {
    this.bits = new Array(size).fill(0)
  }

  decimalToBits (decimal) {
    const bits = new Array(this.bits.length).fill(0)

    for (let i = this.bits.length - 1, remainder = decimal; remainder > 0; i--) {
      const val = Math.pow(2, i)

      if (val > remainder) {
        bits[i] = 0
      } else {
        remainder = remainder - val
        bits[i] = 1
      }
    }

    return bits.reverse()
  }

  write (int, mask) {
    const valueBits = this.decimalToBits(int)

    this.bits = this.bits.map((current, i) => {
      switch (mask[i]) {
        case 1:
        case 0:
          return mask[i]

        case 'X':
          return valueBits[i]

        default:
          return current
      }
    })
  }

  valueOf () {
    return [...this.bits].reverse().reduce((sum, pos, exponent) => {
      return pos === 1 ? sum + Math.pow(2, exponent) : sum
    }, 0)
  }
}

const instance = new Chip(36)

input.forEach(instruction => {
  console.log(instruction)
  instance.read(instruction)
  instance.memory.forEach((buffer, addr) => {
    console.log(`[${addr}] ${buffer.valueOf()}`)
  })
})

console.log([...instance.memory.values()].map(buffer => buffer.valueOf()).reduce((a, b) => a + b))
