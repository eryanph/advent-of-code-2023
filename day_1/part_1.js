const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const isNumber = (char) => {
  return /^\d$/.test(char);
};

let total = 0;
for (const str of input) {
  let firstNum;
  let firstNumIndex;
  for (let i = 0; i < str.length; i++) {
    if (isNumber(str[i])) {
      firstNum = Number(str[i]);
      firstNumIndex = i;
      break;
    }
  }

  let lastNum;
  for (let i = str.length - 1; i > firstNumIndex; i--) {
    if (isNumber(str[i])) {
      lastNum = Number(str[i]);
      break;
    }
  }
  lastNum = lastNum === undefined ? firstNum : lastNum;

  const value = firstNum * 10 + lastNum;
  console.log(`${str}: ${value}`);
  total += value;
}

console.log(`The total is: ${total}`);
