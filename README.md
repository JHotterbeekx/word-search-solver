## word-search-solver
NodeJS module to solver word search puzzles

(https://travis-ci.org/JHotterbeekx/word-search-solver.svg?branch=master)

=========

Allows you to solve word search puzzles by feeding it a matrix with the letters and the words to find

## Installation

  `npm install word-search-solver`

## Usage

```js
  const wordSearchSolver = require('word-search-solver');
  const matrix = [
    [ 'c', 'i', 'o', 't' ], 
    [ 'a', 'o', 'a', 'h' ], 
    [ 'u', 'b', 'w', 'z' ], 
    [ 'q', 'x', 'a', 'm' ], 
  ];
  const wordsToFind = [
    'bat',
    'cow',
    'max'
  ];

  const solution = wordSearchSolver(matrix, wordsToFind);
```

  The output will be:

```js
[
  {
    word: 'bat',
    found: true,
    firstLetter: [2, 1]
    lastLetter: [0, 3]
  },
  {
    word: 'cow',
    found: true,
    firstLetter: [0, 0]
    lastLetter: [2, 2]
  },
  {
    word: 'max',
    found: true,
    firstLetter: [3, 3]
    lastLetter: [3, 1]
  },
]
```

  When one of the words is not found, it is returned like this:

```js
  {
    word: 'love',
    found: false
  }
```


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.