const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const CARD_DICT = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const POWER_TO_TYPE = {
  0: 'HIGH CARD',
  1: 'ONE PAIR',
  1.5: 'TWO PAIR',
  2: 'THREE OF A KIND',
  2.5: 'FULL HOUSE',
  3: 'FOUR OF A KIND',
  4: 'FIVE OF A KIND',
};

// Power levels:
// Five of a kind = 4
// Four of a kind = 3
// Full house = 2.5
// Three of a kind = 2
// Two pair = 1.5
// One pair = 1
const getPower = (cardCount) => {
  const keys = Object.keys(cardCount);
  let power = 0;
  if (keys.length > 1) {
    power -= 0.5;
  }

  for (const key of keys) {
    power += cardCount[key];
  }
  return power;
};

const cardDetails = [];
for (const ln of input) {
  const [cardsList, bid] = ln.trim().split(' ');
  const cards = cardsList.split('');

  const cardCount = {};
  cards.reduce((result, current) => {
    if (result[current] === undefined) {
      result[current] = 0;
    } else if (cardCount[current] === undefined) {
      cardCount[current] = 1;
    } else {
      cardCount[current] += 1;
    }

    return result;
  }, {});

  const cardDetail = {
    cards: [...cards],
    power: getPower(cardCount),
    bid: Number(bid),
  };
  cardDetails.push(cardDetail);

  console.log(
    `Card ${cardDetail.cards.join('')} => ${
      POWER_TO_TYPE[String(cardDetail.power)]
    }`
  );
}

cardDetails.sort((a, b) => {
  if (a.power < b.power) {
    return -1;
  } else if (a.power > b.power) {
    return 1;
  }

  for (let i = 0; i < a.cards.length; i++) {
    const cardA = a.cards[i];
    const cardB = b.cards[i];

    if (CARD_DICT[cardA] < CARD_DICT[cardB]) {
      return -1;
    } else if (CARD_DICT[cardA] > CARD_DICT[cardB]) {
      return 1;
    }
  }

  return 0;
});

let totalWinnings = 0;
for (let i = 1; i <= cardDetails.length; i++) {
  totalWinnings += cardDetails[i - 1].bid * i;
}

console.log(`Total winnings: ${totalWinnings}`);
