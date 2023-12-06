const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

let time;
let distance;
for (const ln of input) {
  const line = ln.trim().replace(/ +(?= )/g, '');

  const splitted = line.split(':');
  if (splitted[0] === 'Time') {
    time = Number(splitted[1].trim().replaceAll(' ', ''));
  } else if (splitted[0] === 'Distance') {
    distance = Number(splitted[1].trim().replaceAll(' ', ''));
  }
}

const getQuadraticFormula = (time, distance) => {
  const a = -1 * (-1 * time);
  const b = Math.sqrt(Math.pow(-1 * time, 2) - 4 * 1 * distance);
  const c = 2;

  // (a +- b) / c
  return [a, b, c];
};

// (a +- b) / c
const [a, b, c] = getQuadraticFormula(time, distance);
let minimumHold = Math.ceil((a - b) / c);
let maximumHold = Math.floor((a + b) / c);

// calibration, should not exact at distance at 0s
const minimumSpeed = minimumHold;
if (distance === minimumSpeed * (time - minimumHold)) {
  minimumHold += 1;
}
const maximumSpeed = maximumHold;
if (distance === maximumSpeed * (time - maximumHold)) {
  maximumHold -= 1;
}

const numberOfWays = maximumHold - minimumHold + 1;
console.log(
  `time=${time}, distance=${distance}:\t${minimumHold}, ${maximumHold}`
);
console.log(`Number of ways to beat the race: ${numberOfWays}`);
