import * as d3 from "d3";
import { getdocuments } from "./documents";
import { getWordList } from "./wordList";
import { gettfidf } from "./tfidf";


var documents = getdocuments(); //alle Wörter
var wordList = getWordList(documents); //jedes wort pro Partei nur EIN mal
var tfidf = gettfidf(documents,wordList);

console.log(documents)
console.log(wordList)
console.log(tfidf)
