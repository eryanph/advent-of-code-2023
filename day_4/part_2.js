const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const extractCardNumber = (cardDetails) =>
  Number(cardDetails.replace(/  +/g, ' ').split(' ')[1]);

const cardCount = {};
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

  if (cardCount[String(cardNumber)] !== undefined) {
    cardCount[String(cardNumber)] += 1;
  } else {
    cardCount[String(cardNumber)] = 1;
  }

  let matchCount = 0;
  for (const winningNumber of winningNumbersList) {
    for (const actualNumber of actualNumbersList) {
      if (actualNumber === winningNumber) {
        matchCount++;
        break;
      }
    }
  }

  const cardMultiplier = 1 * cardCount[String(cardNumber)];
  for (let i = 1; i <= matchCount; i++) {
    if (cardCount[String(cardNumber + i)] !== undefined) {
      cardCount[String(cardNumber + i)] += cardMultiplier;
    } else {
      cardCount[String(cardNumber + i)] = cardMultiplier;
    }
  }

  console.log(
    `Card ${cardNumber} has ${cardCount[String(cardNumber)]} copies.`
  );
}

const totalCards = Object.values(cardCount).reduce((t, count) => t + count, 0);
console.log(`total amount of cards: ${totalCards}`);
