const fs = require('fs')
const path = require('path')
const numbers = fs.readFileSync(path.join(__dirname, './input'), 'utf8').trim().split(',').map(n => parseInt(n, 10))

const spoken = new Map(numbers.map((n, idx) => ([n, [idx + 1]])))
let last = numbers[numbers.length - 1]

for (let iteration = (numbers.length + 1); iteration < 30000001; iteration++) {
  const lastCount = spoken.get(last)
  let toSpeak

  if (!lastCount || lastCount.length === 1) {
    toSpeak = 0
  } else {
    toSpeak = lastCount[1] - lastCount[0]
  }

  const seenCount = spoken.get(toSpeak)

  if (!seenCount) {
    spoken.set(toSpeak, [iteration])
  } else {
    if (seenCount.length > 1) {
      seenCount[0] = seenCount[1]
    }

    seenCount[1] = iteration
  }

  last = toSpeak
}

console.log(last)
