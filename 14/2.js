const input = require('../lib/utils.js').lines(__dirname)

function expand (address) {
  if (address.indexOf('X') > -1) {
    const offset = address.indexOf('X')
    const prefix = address.slice(0, offset)
    const suffix = address.slice(offset + 1, address.length)

    return [
      [...prefix, 0, ...suffix],
      [...prefix, 1, ...suffix]
    ].flatMap(expand)
  } else {
    return [address]
  }
}

class Chip {
  constructor (size) {
    this.size = size
    this.memory = new Map()
    this.mask = new Array(this.size).fill(0)
  }

  decimalToBits (decimal) {
    const bits = new Array(this.size).fill(0)

    for (let i = this.size - 1, remainder = decimal; remainder > 0; i--) {
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

  setMask (mask) {
    this.mask = mask.split('').map(bit => bit === 'X' ? bit : parseInt(bit, 10))
  }

  read (instruction) {
    const [assignee, value] = instruction.split(' = ')

    if (assignee === 'mask') {
      this.setMask(value)
    } else {
      const addressInt = parseInt(assignee.split('[')[1].split(']')[0], 10)
      const addressBits = this.decimalToBits(parseInt(addressInt, 10))
      const valueBits = this.decimalToBits(parseInt(value, 10))

      this.decode(addressBits).forEach(newAddress => {
        this.write(parseInt(newAddress.join(''), 2), valueBits)
      })
    }
  }

  decode (addressBits) {
    const mapped = this.mask.map((bit, pos) => {
      if (bit === 0) {
        return addressBits[pos]
      } else if (bit === 1) {
        return 1
      } else {
        return bit
      }
    })

    return expand(mapped)
  }

  write (address, bits) {
    this.memory.set(address, bits)
  }

  sum () {
    return [...instance.memory.values()]
      .map(buffer => parseInt(buffer.join(''), 2))
      .reduce((a, b) => a + b)
  }
}

const instance = new Chip(36)

input.forEach(instruction => {
  instance.read(instruction)
})

console.log(instance.sum())
