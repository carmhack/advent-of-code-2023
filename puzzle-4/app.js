const fs = require("fs").promises;
const path = require("path");

function checkWinningNumbers(winningNumbers, myNumbers) {
  let points = 0;
  let count = 0;
  let totalNumbers = myNumbers.length;
  for(let i = 0; i < totalNumbers; i++) {
    const number = myNumbers[i];
    if (winningNumbers.includes(number)) {
      if (points === 0) {
        points++;
      } else {
        points = points * 2;
      }
      count++;
    }
  }
  return [count, points];
}

function makeCopies(cards, game, count) {
  for(let i = game+1; i <= count+game; i++) {
    if (!cards.hasOwnProperty(i)) {
      cards[i] = 1;
    }
    cards[i] = cards[i] + 1;
    //console.log(`Game ${i} updated to ${cards[i]}`)
  }
}

function solveTwo(lines) {
  let solution = 0;

  const cards = {};
  const totalLines = lines.length;
  
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    let [game, sets] = line.split(": ");
    game = parseInt(game.match(/\d+/)[0]);
    sets = sets.split(" | ");
    
    if (!cards.hasOwnProperty(game)) {
      cards[game] = 1;
    }
    for(let k = 0; k < cards[game]; k++) {
      // console.log(`check on game ${game}, iteration ${k}`);
      const winningNumbers = sets[0].split(" ").filter(elem => Number.isInteger(parseInt(elem)));
      const myNumbers = sets[1].split(" ").filter(elem => Number.isInteger(parseInt(elem)));
  
      const [count, points] = checkWinningNumbers(winningNumbers, myNumbers);
      makeCopies(cards, game, count);
    }
    //console.log(`At game ${game} cards are:`);
    //console.log(cards);
  }
  //console.log(`At the end, cards are:`);
  //console.log(cards);
  Object.keys(cards).forEach(key => {
    solution += parseInt(cards[key]);
  })

  return solution;
}

function solveOne(lines) {
  let solution = 0;
  const totalLines = lines.length;
  
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    let [_, sets] = line.split(": ");
    sets = sets.split(" | ");
    
    const winningNumbers = sets[0].split(" ").filter(elem => Number.isInteger(parseInt(elem)));
    const myNumbers = sets[1].split(" ").filter(elem => Number.isInteger(parseInt(elem)));

    const [count, points] = checkWinningNumbers(winningNumbers, myNumbers);
    solution += +points;
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