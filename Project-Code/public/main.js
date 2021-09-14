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

defaultStackedBar(d3.select("#barchart"));

function searchNode() {
  var selectedVal = document.getElementById("search").value.toLowerCase();

  /*if (selectedVal == "none" || "") {
    console.log(selectedVal);
    alert("Fill me!");
  }*/
  //else {
  
  d3.select("#barchart").selectAll("*").remove();
  const genre = Array.from(tfidf.keys());
  stackedBar(d3.select("#barchart"), tfidf, selectedVal, genre);
  //}
  d3.select("#byValue").on("click", function() {
    genre.sort(function(a,b) {
        var array = tfidf.get(a)
            for(var i = 0; i <= array.length -1; i++){
            if(array[i][0] == search){
        return d3.descending(tfidf.get(a)[i][1], tfidf.get(b)[i][1]) }}
      })
      d3.select("#barchart").selectAll("*").remove();
      stackedBar(d3.select("#barchart"), tfidf, selectedVal, genre);
    })
  
    d3.select("#byName").on("click", function() {
      genre.sort(function(a, b) {
          return d3.ascending(a, b)
        })
        d3.select("#barchart").selectAll("*").remove();
        stackedBar(d3.select("#barchart"), tfidf, selectedVal, genre);
      })
}
