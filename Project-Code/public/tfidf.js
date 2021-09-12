export function gettfidf(documents, wordList, useIDF) {
  var parteien = documents.keys();
  var tfidfList = new Map();

  for (var i = 0; i <= documents.size - 1; i++) {
    //iterator for all keys
    var actualParty = parteien.next().value;
    //calculate tf score
    var buffer = new Map();
    wordList
      .get(actualParty)
      .forEach((d) => buffer.set(d, score(d, actualParty)));
    buffer = new Map([...buffer.entries()].sort((a, b) => b[1] - a[1]));
    //normalize values
    var maxCount = buffer.values().next().value;
    var buffer2 = new Map();
    [...buffer.entries()].forEach((d) => buffer2.set(d[0], d[1] / maxCount));
    //calculate idf score and multiplie with tf => tf-idf
    if (useIDF) {
      var buffer3 = new Map();
      [...buffer2.entries()].forEach((d) =>
        buffer3.set(d[0], count(d[0], d[1]))
      );
      buffer3 = new Map([...buffer3.entries()].sort((a, b) => b[1] - a[1]));
      tfidfList.set(actualParty, Array.from(buffer3));
    } else {
      //store map of [word,score] to map of [party,[word,score]]
      tfidfList.set(actualParty, Array.from(buffer2));
    }
  }
  //function to count word in document
  function score(word, actualParty) {
    var counter = 0;
    documents.get(actualParty).forEach((d) => (d == word ? counter++ : ""));
    return counter;
  }
  //function to count word in all documents (idf) and multiplie with tf
  function count(word, tf) {
    var counter = 0;
    var keyIterator = documents.keys();
    for (var i = 0; i <= documents.size - 1; i++) {
      var actualKey = keyIterator.next().value;
      documents.get(actualKey).includes(word) ? counter++ : "";
    }
    var idf = Math.log(documents.size / counter);
    var TFIDF = tf * idf;
    return TFIDF;
  }

  return tfidfList;
}
