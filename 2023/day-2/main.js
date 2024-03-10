import fs from 'fs';
// https://www.youtube.com/watch?v=Bq0w58wn4oQ

const parsedData = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);

const maxCount = {
  red: 12,
  green: 13,
  blue: 14,
};

const x = () => {
  return parsedData
    .map((line) => {
      return line
        .split(': ')[1]
        .split('; ')
        .map((set) => {
          const game = set.split(', ');
          return game.every((block) => {
            const [count, color] = block.split(' ');
            return maxCount[color] >= Number(count);
          });
        })
        .every((play) => play);
    })
    .reduce((sum, result, index) => {
      return result ? sum + (index + 1) : sum;
    }, 0);
};

console.log(x());
