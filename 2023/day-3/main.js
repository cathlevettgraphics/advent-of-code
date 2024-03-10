import fs from 'fs';
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

/**
 * 
............
.467..114...
....*.......
...35..633..
.......#....
.617*.......
......+.58..
...592......
.......755..
....$.*.....
..664.598...
............

 */

const findValidNumbers = (filePath) => {
  const rows = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((row) => row.split(''));

  // Add '.' to the beginning and end of each row and add array of '.' to the start and end of the array so we don't go out of bounds
  const appendedRows = () => {
    const rowOfPeriods = '.'.repeat(rows[0].length).split('');
    return [rowOfPeriods, ...rows, rowOfPeriods].map((row) => [
      '.',
      ...row,
      '.',
    ]);
  };

  const finalRows = appendedRows();

  // Check if character is a number
  const isNumber = (character) => {
    // console.log(!isNaN(Number(character)));
    return !isNaN(parseInt(character)); // Use Number rather than parseInt here
  };

  let currentNumber = '';
  let hasSpecialChar = false;
  let partNumbers = [];

  const specialChars = [
    '!',
    '@',
    '£',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '-',
    '_',
    '+',
    '=',
    '/',
  ];

  for (let rowIndex = 0; rowIndex < finalRows[0].length; rowIndex++) {
    for (let colIndex = 0; colIndex < finalRows.length; colIndex++) {
      const character = finalRows[rowIndex][colIndex];
      const nextCharacter = finalRows[rowIndex][colIndex + 1];

      if (isNumber(character)) {
        // first, append the number to our number tracker in state
        currentNumber += character;

        // then we store the value of it's neighbours
        const neighbours = [
          finalRows[rowIndex - 1][colIndex - 1],
          finalRows[rowIndex - 1][colIndex],
          finalRows[rowIndex - 1][colIndex + 1],
          finalRows[rowIndex][colIndex - 1],
          finalRows[rowIndex][colIndex + 1],
          finalRows[rowIndex + 1][colIndex - 1],
          finalRows[rowIndex + 1][colIndex],
          finalRows[rowIndex + 1][colIndex + 1],
        ];

        // check every neighbour to see if we have a special character
        // if we have at least one, this condition is truthy
        const characterCheck = neighbours.some((char) =>
          specialChars.includes(char),
        );

        // flip the boolean if at least one neighbour is a character
        if (characterCheck) {
          hasSpecialChar = true;
        }

        // if we hit a '.' check the number is valid, and push to final array
        if (!isNumber(nextCharacter)) {
          if (hasSpecialChar) {
            partNumbers.push(parseInt(currentNumber));
          }

          // reset now we have our number validated
          currentNumber = '';
          hasSpecialChar = false;
        }
      }
    }
  }
  // console.log({ partNumbers });
  const result = partNumbers.reduce((acc, curr) => acc + curr, 0);
  console.log({ result });
};

console.log(findValidNumbers('./input.txt'));
