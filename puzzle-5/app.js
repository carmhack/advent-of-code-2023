const fs = require("fs").promises;
const path = require("path");

function getMappings(seeds, input) {
  const structures = {};
  structures[0] = [seeds.join(" ")];
  for (let i = 1; i <= 7; i++) {
    const [, ...data] = input[i].split("\n")
    structures[i] = [...data];
  }
  return structures;
}

function solve(input) {
  let solution = 0;

  const seedToLocation = {};

  const seeds = input[0].split(": ")[1].split(" ").map(Number);
  const structures = getMappings(seeds, input);

  for(let i = 0; i < structures[0].length; i++) {
    const row = structures[0][0].split(" ");
    for(let j = 0; j < row.length; j++) {
      const seed = row[j];
      seedToLocation[seed] = seed;
    }
  }

  seeds.forEach(seed => {
    for(let key = 1; key <= 7; key++) {
      let alreadyFound = false;
      structures[key].forEach(row => {
        const items = row.split(" ");
        const value = +seedToLocation[seed];
        const destinationStart = +items[0];
        const sourceStart = +items[1];
        const iterations = +items[2];
        if (value >= sourceStart && value < sourceStart + iterations && !alreadyFound) {
          seedToLocation[seed] = destinationStart + (value - sourceStart);
          alreadyFound = true;
        } else {
          seedToLocation[seed] = value;
        }
        //console.log(`Iterate on seed: ${seed}, row: ${items}`);
        //console.log(`Current seedToLocation: ${seedToLocation[seed]}`);
      })
    }
  })
  console.log(seedToLocation);

  Object.keys(seedToLocation).forEach(key => {
    if (solution === 0) {
      solution = seedToLocation[key];
    } else {
      if (seedToLocation[key] < solution) {
        solution = seedToLocation[key];
      }
    }
  })

  return solution;
}

async function main() {
  const filePath = path.join(__dirname, 'input.txt');
  const input = await fs.readFile(filePath, { encoding: "utf-8" });
  const data = input.split("\n\n");

  const solution = solve(data);
  console.log(solution);
}

main();