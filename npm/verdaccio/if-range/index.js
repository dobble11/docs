module.exports = function() {
  let result = [],
    start = 0,
    end = 0;

  if (arguments.length === 1) {
    end = arguments[0];
  } else if (arguments.length === 2) {
    [start, end] = arguments;
  }

  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
};
