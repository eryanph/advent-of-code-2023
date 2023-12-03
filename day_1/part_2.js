const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const numberTextDict = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const isNumber = (char) => {
  return /^\d$/.test(char);
};

const isPossibleNumberText = (str) => {
  const numberTexts = 'one,two,three,four,five,six,seven,eight,nine';

  if (numberTexts.indexOf(str) > -1) {
    return true;
  }
  return false;
};

const roundToPossibleNumberText = (str, trimEnd = false) => {
  if (str === '') {
    return '';
  }
  if (isPossibleNumberText(str)) {
    return str;
  }

  if (trimEnd) {
    return roundToPossibleNumberText(str.slice(0, -1), true);
  } else {
    return roundToPossibleNumberText(str.slice(1));
  }
};

const isNumberText = (str) => {
  return /^(one|two|three|four|five|six|seven|eight|nine)/.test(str);
};

let total = 0;
for (const str of input) {
  let firstNumText = '';
  let firstNum;
  let firstNumIndex = '';
  for (let i = 0; i < str.length; i++) {
    if (isNumber(str[i])) {
      firstNum = Number(str[i]);
      firstNumIndex = i;
      break;
    }

    firstNumText += str[i];
    firstNumText = roundToPossibleNumberText(firstNumText);
    if (isNumberText(firstNumText)) {
      firstNum = numberTextDict[firstNumText];
      firstNumIndex = i;
      break;
    }
  }

  let lastNumText = '';
  let lastNum;
  for (let i = str.length - 1; i > 0; i--) {
    if (isNumber(str[i])) {
      if (firstNumIndex < i) {
        lastNum = Number(str[i]);
      }
      break;
    }

    lastNumText = str[i] + lastNumText;
    lastNumText = roundToPossibleNumberText(lastNumText, true);
    if (isNumberText(lastNumText)) {
      lastNum = numberTextDict[lastNumText];
      break;
    }
  }
  lastNum = lastNum === undefined ? firstNum : lastNum;

  if (firstNum !== undefined && lastNum !== undefined) {
    const value = firstNum * 10 + lastNum;
    total += value;
  }
}

console.log(`The total is: ${total}`);
