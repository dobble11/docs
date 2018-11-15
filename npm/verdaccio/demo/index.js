const range = require('if-range');

let sum = range(1, 11)
  .map(v => v * v)
  .reduce((acc, v) => acc + v, 0);

console.log(sum);
