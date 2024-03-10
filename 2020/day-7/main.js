import fs from 'fs';

const parseLine = (line) => {
  const [outerColor, innerBagString] = line.split(' bags contain ');

  if (innerBagString === 'no other bags.') {
    return { color: outerColor, contains: [] };
  }

  const innerBags = innerBagString.split(', ');
  const contains = innerBags.map((bag) => {
    /*
      (\d+) matches any digits
      (.+?) matches any character
      bag/ matches, well, bag
      so we match the pattern, for example, 2 red bags
    */
    const match = bag.match(/(\d+) (.+?) bag/);
    return { count: Number(match[1]), color: match[2] };
  });

  return { color: outerColor, contains };
};

const formatBags = fs
  .readFileSync('./example.txt', 'utf-8')
  .split('\n')
  .map(parseLine);

/**

Shape we create our graph from = [
 {
  color: 'light salmon',
  contains: [
    { count: 5, color: 'dark brown' },
    { count: 2, color: 'dotted coral' },
    { count: 5, color: 'mirrored turquoise' }
  ]
}, // etc
]

––––––––––––––––––––––––––––––––––––––––––––––––

shape of our graph = {
    // destination : // sources
    'bright white': [ 'light red', 'dark orange' ],
    'muted yellow': [ 'light red', 'dark orange' ],
    'shiny gold': [ 'bright white', 'muted yellow' ],
    'faded blue': [ 'muted yellow', 'dark olive', 'vibrant plum' ],
    'dark olive': [ 'shiny gold' ],
    'vibrant plum': [ 'shiny gold' ],
    'dotted black': [ 'dark olive', 'vibrant plum' ],
    'dark brown': [ 'light salmon' ],
    'dotted coral': [ 'light salmon' ],
    'mirrored turquoise': [ 'light salmon' ]
  }

  bright white is connected to light red and dark orange etc
  every bag in the array is a node which is connected to the bag in the key
 */

const countBags = (targetBag) => {
  const graph = {};

  formatBags.forEach((bag) => {
    // console.log({ bag });
    bag.contains.forEach((innerBag) => {
      if (!graph[innerBag.color]) {
        graph[innerBag.color] = [];
      }
      graph[innerBag.color].push(bag.color);
    });
  });

  console.log({ graph });
  // Depth first search
  let stack = [targetBag]; // create stack with entry point
  const visited = {};
  let bagCount = 0;

  while (stack.length > 0) {
    const currentBagColor = stack.pop();
    // console.log({ stack });

    if (currentBagColor && !visited[currentBagColor]) {
      visited[currentBagColor] = true;
      bagCount++;

      const innerBags = graph[currentBagColor] || [];
      stack.push(...innerBags);
    }
  }
  // console.log({ visited });

  // console.log({ graph });
  // console.log({ bagCount });
  return bagCount - 1;
};

countBags('shiny gold');
