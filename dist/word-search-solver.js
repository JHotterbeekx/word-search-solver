'use strict';

module.exports = function(letterMatrix, wordList) {
  var result = [];
  for(var i = 0; i < wordList.length; i++) {
    var location = FindWordInMatrix(wordList[i], letterMatrix);
    var wordResult = {
      word: wordList[i],
      found: false
    }

    if( location[0][0] + location[0][1] + location[1][0] + location[1][1] > 0 ) {
      wordResult.found = true;
      wordResult.firstLetter = location[0];
      wordResult.lastLetter = location[1];
    }
    result.push(wordResult);
  }
  return result;
};

function FindWordInMatrix(word, matrix) {
  // Start by looking for the starting letter
  var startLetter = word[0];
  var wl = word.length -1;
  var height = matrix.length;
  // console.log('Searching word', word);
  // console.log('Searching width', width);
  // console.log('Searching matrix', matrix);
  // console.log('startLetter', startLetter);

  for(var x = 0; x < matrix.length; x++) {
    for(var y = 0; y < matrix.length; y++) {
      if(matrix[y][x] === startLetter) {
        var width = matrix[y].length;
        // console.log(`Found on [${y},${x}]`);
        var possibleDirections = ['l','lu','u','ru','r','rd','d','ld'];
        // exclude possible directions
        for(var d = 0; d < possibleDirections.length; d++) {
          var direction = possibleDirections[d];
          switch(direction) {
            case 'l':
              if (x - wl >= 0) {
                var match = true;
                for(var c = 1; c <= wl; c++) {
                  if(matrix[y][x -c] !== word[c]) {
                    match = false;
                  }
                }
                if(match) { return [[y,x], [y, x - wl]]; }
              } else {
                // console.log('Does not fit to left');
              }
              break;
            case 'lu':
             if (x - wl >= 0 && y - wl >= 0) {
                var match$1 = true;
                for(var c$1 = 1; c$1 <= wl; c$1++) {
                  if(matrix[y - c$1][x - c$1] !== word[c$1]) {
                    match$1 = false;
                  }
                }
                if(match$1) { return [[y,x], [y - wl, x - wl]]; }
              } else {
                // console.log('Does not fit to left up');
              }
              break;
            case 'u':
              if (y - wl >= 0) {
                var match$2 = true;
                for(var c$2 = 1; c$2 <= wl; c$2++) {
                  if(matrix[y - c$2][x] !== word[c$2]) {
                    match$2 = false;
                  }
                }
                if(match$2) { return [[y,x], [y - wl, x]]; }
              } else {
                // console.log('Does not fit to up');
              }
              break;
            case 'ru':
              if (x + wl < width && y - wl >= 0) {
                var match$3 = true;
                for(var c$3 = 1; c$3 <= wl; c$3++) {
                  if(matrix[y - c$3][x + c$3] !== word[c$3]) {
                    match$3 = false;
                  }
                }
                if(match$3) { return [[y,x], [y - wl, x + wl]]; }
              } else {
                // console.log('Does not fit to right up');
              }
              break;
            case 'r':
              if (x + wl < width) {
                var match$4 = true;
                for(var c$4 = 1; c$4 <= wl; c$4++) {
                  if(matrix[y][x + c$4] !== word[c$4]) {
                    match$4 = false;
                  }
                }
                if(match$4) { return [[y,x], [y, x + wl]]; }
              } else {
                // console.log('Does not fit to right');
              }
              break;
            case 'rd':
              if (x + wl < width && y + wl < height) {
                var match$5 = true;
                for(var c$5 = 1; c$5 <= wl; c$5++) {
                  if(matrix[y + c$5][x + c$5] !== word[c$5]) {
                    match$5 = false;
                  }
                }
                if(match$5) { return [[y,x], [y + wl, x + wl]]; }
              } else {
                // console.log('Does not fit to right down');
              }
              break;
            case 'd':
              if (y + wl < height) {
                var match$6 = true;
                for(var c$6 = 1; c$6 <= wl; c$6++) {
                  if(matrix[y + c$6][x] !== word[c$6]) {
                    match$6 = false;
                  }
                }
                if(match$6) { return [[y,x], [y + wl, x]]; }
              } else {
                // console.log('Does not fit to down');
              }
              break;
            case 'ld':
            if (x - wl >= 0 && y + wl < height) {
                var match$7 = true;
                for(var c$7 = 1; c$7 <= wl; c$7++) {
                  if(matrix[y + c$7][x - c$7] !== word[c$7]) {
                    match$7 = false;
                  }
                }
                if(match$7) { return [[y,x], [y + wl, x - wl]]; }
              } else {
                // console.log('Does not fit to left down');
              }
              break;
          }
        }
      }
    }
  }

  return [[0, 0], [0, 0]];
}