const SearchMap = require('./search-map');

module.exports = function(letterMatrix, wordList) {
  const searchMap = new SearchMap(letterMatrix);
  return wordList.map(word => searchMap.FindWord(word));
};