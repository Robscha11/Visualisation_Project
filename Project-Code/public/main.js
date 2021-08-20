import * as d3 from "d3";
import { getdocuments } from "./documents";
import { getWordList } from "./wordList";

var documents = getdocuments(); //alle Wörter
var wordList = getWordList(documents); //jedes wort pro Partei nur EIN mal

console.log(wordList)
