import * as d3 from "d3";
import { getdocuments } from "./documents";
import { getWordList } from "./wordList";
import { gettfidf } from "./tfidf";
import { wordcloud } from "./wordcloud";


var documents = getdocuments(); //alle Wörter
var wordList = getWordList(documents); //jedes wort pro Partei nur EIN mal
var tfidf = gettfidf(documents,wordList);

//console.log(documents)
//console.log(wordList)
console.log(tfidf)

wordcloud({
  svg: d3.select("#wordcloud1"),
  wordsPerGenre: tfidf,
  selection: d3.select("#party1"),
  textColor: d3.rgb(255,0,0,255),
});

wordcloud({
  svg: d3.select("#wordcloud2"),
  wordsPerGenre: tfidf,
  selection: d3.select("#party2"),
  textColor: d3.rgb(0,255,0,255),
});


