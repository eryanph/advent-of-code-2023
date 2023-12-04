const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const extractCardNumber = (cardDetails) =>
  Number(cardDetails.replace(/  +/g, ' ').split(' ')[1]);

let totalPoints = 0;
for (let line of input) {
  line = line.trim();
  const [cardDetails, numbers] = line.split(': ');

  const cardNumber = extractCardNumber(cardDetails);
  const splittedNumbers = numbers.split(' | ');
  const winningNumbersList = splittedNumbers[0]
    .trim()
    .replace(/  +/g, ' ')
    .split(' ');
  const actualNumbersList = splittedNumbers[1]
    .trim()
    .replace(/  +/g, ' ')
    .split(' ');

  let cardPoints;
  for (const winningNumber of winningNumbersList) {
    for (const actualNumber of actualNumbersList) {
      if (actualNumber === winningNumber) {
        if (cardPoints === undefined) {
          cardPoints = 1;
        } else {
          cardPoints *= 2;
        }
        break;
      }
    }
  }

  totalPoints += cardPoints === undefined ? 0 : cardPoints;
  console.log(
    `${cardNumber} has ${cardPoints === undefined ? 0 : cardPoints} points.`
  );
}

console.log(`total points: ${totalPoints}`);
