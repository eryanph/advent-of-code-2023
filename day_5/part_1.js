const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

let parsePointer = 0;
const seedMap = {};

const addToSeedMap = (key, destination, source, range, from) => {
  for (const seed of Object.keys(seedMap)) {
    const field = from === undefined ? Number(seed) : seedMap[seed][from];

    let value;
    if (source <= field && field < source + range) {
      const adjustment = field - source;
      value = destination + adjustment;
    }

    seedMap[seed][key] =
      value === undefined
        ? seedMap[seed][key] === undefined
          ? Number(field)
          : seedMap[seed][key]
        : value;
  }
};

const getMapDetails = (line, from, to) => {
  const details = line.split(' ');
  let destination = Number(details[0]);
  const source = Number(details[1]);
  const range = Number(details[2]);

  addToSeedMap(to, destination, source, range, from);
};

for (let line of input) {
  line = line.trim();
  if (line === '') {
    parsePointer++;
    continue;
  }

  if (parsePointer === 0) {
    const seeds = line
      .split(': ')[1]
      .split(' ')
      .map((d) => Number(d));

    // Initialize seed map
    for (const seed of seeds) {
      seedMap[seed] = {};
    }
  } else if (parsePointer === 1 && line.indexOf('map') < 0) {
    // seed-to-soil
    getMapDetails(line, undefined, 'soil');
  } else if (parsePointer === 2 && line.indexOf('map') < 0) {
    // soil-to-fertilizer
    getMapDetails(line, 'soil', 'fertilizer');
  } else if (parsePointer === 3 && line.indexOf('map') < 0) {
    // fertilizer-to-water
    getMapDetails(line, 'fertilizer', 'water');
  } else if (parsePointer === 4 && line.indexOf('map') < 0) {
    // water-to-light
    getMapDetails(line, 'water', 'light');
  } else if (parsePointer === 5 && line.indexOf('map') < 0) {
    // light-to-temperature
    getMapDetails(line, 'light', 'temperature');
  } else if (parsePointer === 6 && line.indexOf('map') < 0) {
    // temperature-to-humidity
    getMapDetails(line, 'temperature', 'humidity');
  } else if (parsePointer === 7 && line.indexOf('map') < 0) {
    // humidity-to-location
    getMapDetails(line, 'humidity', 'location');
  }
}

let lowestLocation;
for (const seed of Object.keys(seedMap)) {
  console.log(`Seed ${seed} location: ${seedMap[seed]['location']}`);
  lowestLocation =
    lowestLocation === undefined
      ? seedMap[seed]['location']
      : lowestLocation < seedMap[seed]['location']
      ? lowestLocation
      : seedMap[seed]['location'];
}

console.log(`Lowest location number: ${lowestLocation}`);
