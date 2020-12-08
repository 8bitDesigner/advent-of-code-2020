const fs = require('fs')
const path = require('path')

const [, , day, part] = process.argv

const validDay = str => str && str.match(/\d\d?/)
const validPart = part => ['1', '2'].includes(part)
const pad = day => day.length === 2 ? day : '0' + day

function run (day, part, announce = true) {
  if (announce) {
    console.log(`Day ${day}, part ${part}`)
  }

  require(path.join(__dirname, pad(day), `${part}.js`))
}

try {
  if (validDay(day) && validPart(part)) {
    run(day, part, false)
  } else if (validDay(day)) {
    run(day, 1)
    console.log('')
    run(day, 2)
  } else {
    fs.readdirSync('./').filter(file => validDay(file)).forEach(folder => {
      run(folder, 1)
      console.log('')
      run(folder, 2)
      console.log('')
    })
  }
} catch (e) {
  console.error(e.message)
}
