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
  d3.select("#loading").style("visibility", "visible");
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
  d3.select("#loading").style("visibility", "hidden");
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
  stackedBar(d3.select("#barchart"), tfidf, selectedVal);
  //}
}
