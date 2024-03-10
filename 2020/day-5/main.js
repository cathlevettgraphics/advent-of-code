import fs from 'fs';

const findSeat = (filepath) => {
  const parsedData = fs.readFileSync(filepath, 'utf-8').split('\n');

  const seatIds = [];

  // Binary search for rows
  for (const row of parsedData) {
    let rowMin = 0;
    let rowMax = 127;

    let colMin = 0;
    let colMax = 7;

    for (const char of row.slice(0, 7)) {
      const rowMid = Math.floor((rowMin + rowMax) / 2);

      if (char === 'F') {
        rowMax = rowMid;
      }

      if (char === 'B') {
        rowMin = rowMid + 1;
      }
    }

    // Binary search for column
    for (const char of row.slice(7)) {
      const colMid = Math.floor((colMin + colMax) / 2);

      if (char === 'L') {
        colMax = colMid;
      }

      if (char === 'R') {
        colMin = colMid + 1;
      }
    }

    seatIds.push(rowMin * 8 + colMin);
  }

  // Get the highest seatId
  const result = Math.max(...seatIds);
  console.log({ result });
};

console.log(findSeat('./data.txt'));

/**
Binary search 

Initialization:
Define the search range using two pointers: low and high.
Initially, low points to the start of the array, and high points to the end.

Midpoint Calculation:
Find the middle index: mid = Math.floor((low + high) / 2).

Comparison:
Compare the middle element with the target value.
If they match, you've found the target; return its index.
If the middle element is less than the target, adjust low to mid + 1.
If the middle element is greater, adjust high to mid - 1.

Repeat:
Repeat steps 2-3 until low is greater than high.
Conclusion:

If the loop exits without finding the target, it's not in the array.
Binary search is efficient because it halves the search space with each iteration. It has a time complexity of O(log n).
 */
