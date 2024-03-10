import fs from 'fs';

const checkTrees = ({ data, right, down = 1, width }) => {
  let colIndex = 0;
  let rowIndex = 0;
  let treeCount = 0;

  for (let rowIndex = 0; rowIndex < data.length; rowIndex += down) {
    const currentElement = data[rowIndex][colIndex % width];
    if (currentElement === '#') {
      treeCount++;
    }
    colIndex += right;
  }

  console.log({ treeCount });
  return treeCount;
};

const traverseSlopes = (filePath) => {
  const parsedData = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((line) => line.split(''));

  const width = parsedData[0].length;

  const route1 = checkTrees({ data: parsedData, right: 1, down: 1, width });
  const route2 = checkTrees({ data: parsedData, right: 5, down: 1, width });
  const route3 = checkTrees({ data: parsedData, right: 3, down: 1, width });
  const route4 = checkTrees({ data: parsedData, right: 7, down: 1, width });
  const route5 = checkTrees({ data: parsedData, right: 1, down: 2, width });

  const result = route1 * route2 * route3 * route4 * route5;
  console.log({ result });
};

traverseSlopes('./data.txt');
