import * as fs from "fs";
import readline from "readline";

export interface IElf {
  order: number;
  calories: number;
}

export async function processLineByLine(
  pathToFile: string
): Promise<readline.Interface> {
  const fileStream = fs.createReadStream(pathToFile);
  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
}

export async function convertReadLinesToElves(
  lines: readline.Interface
): Promise<IElf[]> {
  let elves: Array<IElf> = [];
  let sum: number = 0;
  let index: number = 1;
  for await (const line of lines) {
    if (line === "") {
      elves.push({ order: index, calories: sum });
      sum = 0;
      index++;
    } else {
      sum += Number(line);
    }
  }
  return elves;
}

export function findElfWithMostCalories(elves: IElf[]) {
  if (elves.length === 0) {
    throw new Error("No elves found, RIP!");
  }
  const arr = [...elves.map((e) => e.calories)];
  const foundMax: number = Math.max(...arr);
  const indexOfFoundMax: number = arr.indexOf(foundMax);
  console.log(foundMax, indexOfFoundMax);
  return elves[indexOfFoundMax];
}

export function sortElvesByMostCalories(elves: IElf[]) {
  if (elves.length === 0) {
    throw new Error("No elves found, RIP!");
  }
  return elves.sort((elf1: IElf, elf2: IElf) => elf2.calories - elf1.calories);
}
