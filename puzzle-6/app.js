const fs = require("fs").promises;
const path = require("path");

function solveTwo(lines) {
  let solution = 1;
  const totalLines = lines.length;
  let time = -1;
  let recordDistance = -1;
  
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    
    let [_, sets] = line.split(": ");
    sets = parseInt([...sets.matchAll(/\d+/g)].join(""));
    if (i === 0) {
      time = sets;
    } else {
      recordDistance = sets;
    }
  }

  let points = 0;
  for(let k = 0; k <= time; k++) {
    // console.log(`Hold the button for ${k} milliseconds, reaching a distance of ${k * (time-k)} millimeters`)
    const distance = k * (time-k);
    if (distance > recordDistance) {
      points++;
    }
  }
  solution *= points;
  
  return solution;
}

function solveOne(lines) {
  let solution = 1;
  const totalLines = lines.length;
  let times = [];
  let distances = [];
  
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    
    let [_, sets] = line.split(": ");
    sets = [...sets.matchAll(/\d+/g)].map(item => parseInt(item[0]));
    if (i === 0) {
      times = sets;
    } else {
      distances = sets;
    }
  }

  const totalRaces = times.length;
  for (let i = 0; i < totalRaces; i++) {
    const time = times[i];
    const recordDistance = distances[i];
    let points = 0;
    for(let k = 0; k <= time; k++) {
      // console.log(`Hold the button for ${k} milliseconds, reaching a distance of ${k * (time-k)} millimeters`)
      const distance = k * (time-k);
      if (distance > recordDistance) {
        points++;
      }
    }
    solution *= points;
  }
  
  return solution;
}

async function main() {
  const filePath = path.join(__dirname, 'input.txt');
  const input = await fs.readFile(filePath, { encoding: "utf-8" });
  const lines = input.split("\n");

  const solutionOne = solveOne(lines);
  console.log(solutionOne);
  const solutionTwo = solveTwo(lines);
  console.log(solutionTwo);
}

main();