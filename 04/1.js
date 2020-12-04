const fs = require('fs')
const lines = fs.readFileSync('./input', 'utf8').split('\n\n')

const passports = lines.map(lines => {
  return lines.split('\n').flatMap(l => l.split(' ')).map(l => l.split(':'))
})

console.log(passports.filter(passport => {
  const fields = passport.map(([a, b]) => a).sort().join('').replace('cid', '')
  return fields === 'byrecleyrhclhgtiyrpid'
}).length)
