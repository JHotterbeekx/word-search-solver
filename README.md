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


## License

word-search-solver is freely distributable under the terms of the [MIT license](https://github.com/moment/moment/blob/develop/LICENSE).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://www.npmjs.com/package/word-search-solver
[npm-version-image]: https://img.shields.io/npm/v/word-search-solver.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/word-search-solver.svg?style=flat

[travis-url]: https://travis-ci.org/JHotterbeekx/word-search-solver
[travis-image]: http://img.shields.io/travis/moment/moment/develop.svg?style=flat