import * as d3 from "d3";
import { getdocuments } from "./documents";
import { getWordList } from "./wordList";
import { gettfidf } from "./tfidf";
import { wordcloud } from "./wordcloud";
import { stackedBar } from "./stackedBar";

//update handler for IDF
var useIDF = false;
var useStemm = false;
var useAllPartys = false;
document.querySelector("#checkIDF").addEventListener("click", function(event) {
  useStemm = event.target.checked
  update()
});
document.querySelector("#checkStemm").addEventListener("click", function(event) {
  useIDF = event.target.checked
  update()
});
document.querySelector("#checkPartys").addEventListener("click", function(event) {
  useAllPartys = event.target.checked
  update() //für Final version documents Zeile 15 anzahl anpassen
});

var documents
var wordList
var tfidf

update();
function update(){
  documents = getdocuments(useStemm,useAllPartys); //alle Wörter
  wordList = getWordList(documents); //jedes wort pro Partei nur EIN mal  
  tfidf = gettfidf(documents,wordList,useIDF);

  //console.log(documents)
  //console.log(wordList)
  //console.log(tfidf)
  d3.select("#wordcloud").selectAll("*").remove();
  wordcloud({
    svg: d3.select("#wordcloud"),
    wordsPerGenre: tfidf,
  });
}

document.getElementById("button").onclick = function() {searchNode()};

function searchNode() {
  var selectedVal = document.getElementById("search").value
  console.log(selectedVal);
  if (selectedVal == "none" || "") {
    defaultStackedBar(
      d3.select("#barchart")
    );
  } else {
    stackedBar(
      d3.select("#barchart"),
      tfidf,
      selectedVal,
      d3.rgb(0,255,0,255)
    );
  }
}

//tagCloud(d3.select("#dots"), tfidf.slice(0, 3));


