import * as d3 from "d3";
import { getdocuments } from "./documents";
import { getWordList } from "./wordList";
import { gettfidf } from "./tfidf";
import { wordcloud } from "./wordcloud";
import { stackedBar } from "./stackedBar";

//update handler for IDF
var useIDF = false;
var useStemm = false;
document.querySelector("#checkIDF").addEventListener("click", function(event) {
  useStemm = event.target.checked
  update()
});
document.querySelector("#checkStemm").addEventListener("click", function(event) {
  useIDF = event.target.checked
  update()
});

update();
function update(){
  var documents = getdocuments(); //alle Wörter
  var wordList = getWordList(documents); //jedes wort pro Partei nur EIN mal  
  var tfidf = gettfidf(documents,wordList,useIDF,useStemm);

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
  if (selectedVal == "none") {
    defaultStackedBar({
      svg: d3.select("#barchart")
    });
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

tagCloud(d3.select("#dots"), tfidf.slice(0, 3));


