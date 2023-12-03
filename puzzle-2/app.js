const fs = require("fs").promises;
const path = require("path");

function solveOne(lines) {
  let solution = 0;
  const MAX_CUBES_PER_COLOR = {
    red: 12,
    green: 13,
    blue: 14
  }
  const totalLines = lines.length;
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    let [game, sets] = line.split(": ");

    game = parseInt(game.match(/\d+/)[0]);
    sets = sets.split("; ");

    let isSetValid = true;
    sets.forEach(set => {
      const cubes = set.split(", ");
      cubes.forEach(cube => {
        const [value, color] = cube.split(" ");
        if (parseInt(value) > MAX_CUBES_PER_COLOR[color]) {
          isSetValid = false;
        }
      })
    })

    if (isSetValid) {
      solution += game;
    }

    isSetValid = true;
  }

  return solution;
}

function solveTwo(lines) {
  let solution = 0;
  
  const totalLines = lines.length;
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    let [game, sets] = line.split(": ");

    game = parseInt(game.match(/\d+/)[0]);
    sets = sets.split("; ");

    const fewers = {
      red: 0,
      green: 0,
      blue: 0
    }
    sets.forEach(set => {
      const cubes = set.split(", ");
      cubes.forEach(cube => {
        const [value, color] = cube.split(" ");
        fewers[color] = Math.max(fewers[color], value);
      })
    })

    solution += fewers.red * fewers.green * fewers.blue;
  }

  return solution;
}


async function main() {
  const filePath = path.join(__dirname, 'input.txt');
  const input = await fs.readFile(filePath, { encoding: "utf-8" });
  const lines = input.split("\n");

  console.log(__dirname);
  const solutionOne = solveOne(lines);
  console.log(solutionOne);
  const solutionTwo = solveTwo(lines);
  console.log(solutionTwo);
}

main();