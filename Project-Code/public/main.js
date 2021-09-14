import * as d3 from "d3";
import { getdocuments } from "./documents";
import { getWordList } from "./wordList";
import { gettfidf } from "./tfidf";
import { compcloud } from "./compcloud";
import { stackedBar } from "./stackedBar";
import { tagCloud } from "./tagcloud";
import { defaultStackedBar } from "./defaultStackedBar";

//update handler
var useIDF = false;
var useStemm = false;
var useAllPartys = false;

document.querySelector("#checkIDF").addEventListener("click", function (event) {
  useStemm = event.target.checked;
  update();
});
document
  .querySelector("#checkStemm")
  .addEventListener("click", function (event) {
    useIDF = event.target.checked;
    update();
  });
document
  .querySelector("#checkPartys")
  .addEventListener("click", function (event) {
    useAllPartys = event.target.checked;
    update();
  });
document.getElementById("button").onclick = function () {
  searchNode();
};



//initalize Data
var documents;
var wordList;
var tfidf;

update();

function update() {
  console.log("UPDATING: PLEASE WAIT");
  //updating words
  documents = getdocuments(useStemm, useAllPartys); //all words
  wordList = getWordList(documents); //each word only ONE time per party
  tfidf = gettfidf(documents, wordList, useIDF);

  //create comparison cloud
  d3.select("#compcloud").selectAll("*").remove();
  compcloud({
    svg: d3.select("#compcloud"),
    wordsPerGenre: tfidf,
  });

  //create tagcloud
  tagCloud(tfidf);

  console.log("UPDATING: FINISHED");
}

//show text to search for keywords
defaultStackedBar(d3.select("#barchart"));

//create bar chart
function searchNode() {
  var selectedVal = document.getElementById("search").value.toLowerCase();
  
  d3.select("#barchart").selectAll("*").remove();
  const sortedPartys = Array.from(tfidf.keys());
  stackedBar(d3.select("#barchart"), tfidf, selectedVal, sortedPartys);
  //}
  d3.select("#byValue").on("click", function() {
    sortedPartys.sort(function(a,b,i) {
        
        return d3.descending(tfidf.get(a)[a][1], tfidf.get(b)[b][1]) 
      })
      console.log(sortedPartys)
      d3.select("#barchart").selectAll("*").remove();
      stackedBar(d3.select("#barchart"), tfidf, selectedVal, sortedPartys);
    })
  
    d3.select("#byName").on("click", function() {
      sortedPartys.sort(function(a, b) {
          return d3.ascending(a, b)
        })
        d3.select("#barchart").selectAll("*").remove();
        stackedBar(d3.select("#barchart"), tfidf, selectedVal, sortedPartys);
      })
}
