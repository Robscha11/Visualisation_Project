import * as d3 from "d3";
import { getdocuments } from "./documents";
import { getWordList } from "./wordList";
import { gettfidf } from "./tfidf";
import { wordcloud } from "./wordcloud";
import { stackedBar } from "./stackedBar";

var documents = getdocuments(); //alle Wörter
var wordList = getWordList(documents); //jedes wort pro Partei nur EIN mal
var tfidf = gettfidf(documents,wordList);

//console.log(documents)
//console.log(wordList)
//console.log(tfidf)

 //update handler
 if (document.getElementById('checkIDF').checked) 
  {
    console.log("idf on");
  } else {
      console.log("idf off");
  }

wordcloud({
  svg: d3.select("#wordcloud"),
  wordsPerGenre: tfidf,
});

/*wordcloud({
  svg: d3.select("#wordcloud2"),
  wordsPerGenre: tfidf,
  selection: d3.select("#party2"),
  textColor: d3.rgb(0,255,0,255),
});*/

document.getElementById("button").onclick = function() {searchNode()};

function searchNode() {
  var selectedVal = document.getElementById("search").value
  if (selectedVal == "none") {
    console.log("nothing")
  } else {
    stackedBar({
      svg: d3.select("#barchart"),
      wordsPerGenre: tfidf,
      search: selectedVal,
      textColor: d3.rgb(0,255,0,255),
    });
  }
}
searchNode();



