const lines = require('../lib/utils.js').lines(__dirname, '\n\n')

const passports = lines.map(lines => {
  return lines.split('\n').flatMap(l => l.split(' ')).map(l => l.split(':'))
})

const between = (min, max, str) => {
  const val = parseInt(str, 10)
  return val >= min && val <= max
}

const Validator = {
  byr (str) {
    return between(1920, 2002, str)
  },

  iyr (str) {
    return between(2010, 2020, str)
  },

  eyr (str) {
    return between(2020, 2030, str)
  },

  hgt (str) {
    if (str.match(/^\d+in$/)) {
      return between(59, 76, str.replace('in', ''))
    } else if (str.match(/^\d+cm$/)) {
      return between(150, 193, str.replace('cm', ''))
    } else {
      return false
    }
  },

  hcl (str) {
    return !!str.match(/^#[0-9a-f]{6}$/)
  },

  ecl (str) {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(str)
  },

  pid (str) {
    return !!str.match(/^[0-9]{9}$/)
  },

  cid () {
    return true
  }
}

console.log(passports.filter(passport => {
  const validFields = 'byrecleyrhclhgtiyrpid'
  const fields = passport.filter(([a, b]) => a && b)
  const fieldList = fields.map(([a, b]) => a).sort().join('').replace('cid', '')

  return fieldList === validFields && fields.every(([key, val]) => Validator[key](val))
}).length)
