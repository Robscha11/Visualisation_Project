import * as d3 from "d3";
import { getdocuments } from "./documents";
import { getWordList } from "./wordList";
import { gettfidf } from "./tfidf";
import { wordcloud } from "./wordcloud";
import { stackedBar } from "./stackedBar";
import { tagCloud } from "./tagcloud";
import { defaultStackedBar } from "./defaultStackedBar";

//update handler 
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
document.getElementById("button").onclick = function() {
  searchNode()
};

var documents
var wordList
var tfidf

update();

function update(){
  d3.select("#loading").style("visibility","visible")
  console.log("UPDATING: PLEASE WAIT")
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

  d3.select("#dots1").selectAll("*").remove();
  d3.select("#dots2").selectAll("*").remove();
  d3.select("#dots3").selectAll("*").remove();
  d3.select("#dots4").selectAll("*").remove();
  d3.select("#dots5").selectAll("*").remove();
  tagCloud(tfidf);
  console.log("UPDATING: FINISHED")
  d3.select("#loading").style("visibility","hidden")
}


defaultStackedBar(d3.select("#barchart"));

function searchNode() {
  var selectedVal = document.getElementById("search").value.toLowerCase();
  if (selectedVal === "none" || "") {
    alert("Fill me!");
  }
  else {
    d3.select("#barchart").selectAll("*").remove();
    stackedBar(
      d3.select("#barchart"),
      tfidf,
      selectedVal,
    );
  }
}




