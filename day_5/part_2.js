const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

let parsePointer = 0;
const ranges = [];
const seeds = [];

const getDetails = (line) => {
  const details = line.split(' ');
  const destination = Number(details[0]);
  const source = Number(details[1]);
  const count = Number(details[2]);

  if (ranges[parsePointer - 1] === undefined) {
    ranges[parsePointer - 1] = [];
  }
  ranges[parsePointer - 1].push([destination, source, count]);
};

for (let line of input) {
  line = line.trim();
  if (line === '') {
    parsePointer++;
    continue;
  }

  if (parsePointer === 0) {
    const data = line
      .split(': ')[1]
      .split(' ')
      .map((d) => Number(d));

    // Initialize seed map
    for (let j = 0; j < data.length; j += 2) {
      const start = data[j];
      const range = data[j + 1];

      seeds.push({ from: start, to: start + range });
    }
  } else if (parsePointer === 1 && line.indexOf('map') < 0) {
    // seed-to-soil
    getDetails(line);
  } else if (parsePointer === 2 && line.indexOf('map') < 0) {
    // soil-to-fertilizer
    getDetails(line);
  } else if (parsePointer === 3 && line.indexOf('map') < 0) {
    // fertilizer-to-water
    getDetails(line);
  } else if (parsePointer === 4 && line.indexOf('map') < 0) {
    // water-to-light
    getDetails(line);
  } else if (parsePointer === 5 && line.indexOf('map') < 0) {
    // light-to-temperature
    getDetails(line);
  } else if (parsePointer === 6 && line.indexOf('map') < 0) {
    // temperature-to-humidity
    getDetails(line);
  } else if (parsePointer === 7 && line.indexOf('map') < 0) {
    // humidity-to-location
    getDetails(line);
  }
}

const computeRange = (givenRange) => {
  const resultRange = [];
  const group = ranges.pop();

  while (givenRange.length) {
    const r = givenRange.pop();

    let hasRange = false;
    for (const range of group) {
      const [destination, source, count] = range;

      const min = Math.max(r.from, source);
      const max = Math.min(r.to, source + count);

      if (min < max) {
        resultRange.push({
          from: min - source + destination,
          to: max - source + destination,
        });

        if (min > r.from) {
          givenRange.push({ from: r.from, to: min });
        }
        if (r.to > max) {
          givenRange.push({ from: max, to: r.to });
        }
        hasRange = true;
        break;
      }
    }

    if (!hasRange) {
      resultRange.push({ from: r.from, to: r.to });
    }
  }

  return resultRange;
};

ranges.reverse();
// seed-to-soil
const soilRange = computeRange(seeds);
// soil-to-fertilizer
const fertilizerRange = computeRange(soilRange);
// fertilizer-to-water
const waterRange = computeRange(fertilizerRange);
// water-to-light
const lightRange = computeRange(waterRange);
// light-to-temperature
const temperatureRange = computeRange(lightRange);
// temperature-to-humidity
const humidityRange = computeRange(temperatureRange);
// humidity-to-location
const locationRange = computeRange(humidityRange);

let lowestLocation;
for (const location of locationRange) {
  lowestLocation =
    lowestLocation === undefined
      ? location.from
      : lowestLocation < location.from
      ? lowestLocation
      : location.from;
}

console.log(`Lowest location: ${lowestLocation}`);
