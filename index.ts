import {
  IElf,
  processLineByLine,
  convertReadLinesToElves,
  findElfWithMostCalories,
  sortElvesByMostCalories,
} from "./elves";
import readline from "readline";

let elves: Array<IElf> = [];

async function setup() {
  const readLines: readline.Interface = await processLineByLine(
    "./inputs/input.txt"
  );
  elves = await convertReadLinesToElves(readLines);
}

async function part_1() {
  const foundElf = findElfWithMostCalories(elves);
  console.log(
    `Elf with most calories is ${foundElf.order} and has total of ${foundElf.calories} cals`
  );
}

async function part_2() {
  const sortedElves = sortElvesByMostCalories(elves);
  const calorieSumOfTopThree: number = sortedElves
    .splice(0, 3)
    .reduce((sum, elf) => {
      return (sum += elf.calories);
    }, 0);
  console.log(
    `The top three elves with most calories have a combined ${calorieSumOfTopThree}`
  );
}

(async () => {
  await setup();
  part_1();
  part_2();
})();
