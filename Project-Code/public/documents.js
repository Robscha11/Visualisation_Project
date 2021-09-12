import { stopwords } from "./stopwords";
import stem from "snowball-german";

export function getdocuments(useStemm, useAllPartys) {
  //read in the file names (Parties)
  var Parteien = [];
  var WordFile = new XMLHttpRequest();
  WordFile.open("GET", "data/Parteinamen.txt", false);
  WordFile.onreadystatechange = function () {
    if (WordFile.readyState === 4) {
      if (WordFile.status === 200 || WordFile.status == 0) {
        Parteien.push(WordFile.responseText.split(" "));
      }
    }
  };
  WordFile.send(null);
  Parteien = Parteien.flat();

  //unless otherwise selected, only the first 7 parties are used
  if (!useAllPartys) {
    Parteien = Parteien.slice(0, 2); //(0,7) für Final
  }

  //read all files and store to a Map
  var allWords = new Map();
  for (var i = 0; i <= Parteien.length - 1; i++) {
    allWords.set(Parteien[i], getWords(Parteien[i]));
  }

  function getWords(name) {
    //read txt
    var Words = [];
    var WordFile = new XMLHttpRequest();
    WordFile.open("GET", `data/${name}.txt`, false);
    WordFile.onreadystatechange = function () {
      if (WordFile.readyState === 4) {
        if (WordFile.status === 200 || WordFile.status == 0) {
          Words.push(WordFile.responseText.split(" "));
        }
      }
    };
    WordFile.send(null);

    //split data by char
    var splitChar = [
      "\n",
      "\t",
      "\b",
      "\f",
      ".",
      "\u0007",
      ",",
      ":",
      "!",
      "˵",
      "˝",
      "»",
      "(",
      ")",
      "?",
      "//",
    ];
    for (var i = 0; i <= splitChar.length - 1; i++) {
      var buffer = [];
      Words.forEach((d) =>
        d.forEach((d) => buffer.push(d.split(`${splitChar[i]}`)))
      );
      Words = buffer;
    }
    Words = Words.flat();
    //all words to lower case
    buffer = [];
    Words.forEach((d) => buffer.push(d.toLowerCase()));
    Words = buffer.flat();
    //remove "-" if its at the end
    buffer = [];
    Words.forEach((d) =>
      buffer.push(d.slice(-1) === "-" ? d.substr(0, d.length - 1) : d)
    );
    Words = buffer.flat();

    //numbers are removed (10-50 for example not)
    Words = Words.filter((d) => (d >= 0 ? "" : d));
    //empty elements with length 1 are set to 0
    Words = Words.filter((d) => (d.length == 1 ? "" : d));
    //remove stopwords
    for (var i = 0; i <= stopwords.length; i++) {
      if (Words.includes(stopwords[i])) {
        Words = Words.filter((d) => d != stopwords[i]);
      }
    }
    //if its checked use stemming
    if (useStemm) {
      buffer = [];
      Words.forEach((d) => buffer.push(stem(d)));
      Words = buffer.flat();
    }

    return Words;
  }

  return allWords;
}
