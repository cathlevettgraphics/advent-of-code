import fs from 'fs';

const formatLines = (line) => {
  const res = line.split(': ').map((line) => line.split(' | '));
  const numbers = res[1].map((item) => item.split(', '));
  const winningNumbers = numbers[0][0].split(' ');
  const actualNumbers = numbers[1][0].split(' ');
  return {
    winningNumbers,
    actualNumbers,
  };
};

const winningNumbers = (filepath) => {
  const lines = fs
    .readFileSync(filepath, 'utf-8')
    .split('\n')
    .map((line) => formatLines(line));

  const res = lines.map((line) => {
    const filteredLines = line.actualNumbers.filter(
      (num) => line.winningNumbers.includes(num) && num !== '',
    );

    // console.log(Math.pow(2, 0));
    return Math.floor(Math.pow(2, filteredLines.length - 1));
  });

  const answer = res.reduce((curr, acc) => curr + acc, 0);
  console.log({ answer });
};

console.log(winningNumbers('./input.txt'));

/*
Card 1: four winning numbers: (48, 83, 17, and 86) worth 8 points
Card 2: two winning numbers (32 and 61) worth 2 points.
Card 3: two winning numbers (1 and 21) worth 2 points.
Card 4: one winning number (84) worth 1 point.
Card 5: no winning numbers worth no points.
Card 6: no winning numbers worth no points.
*/
