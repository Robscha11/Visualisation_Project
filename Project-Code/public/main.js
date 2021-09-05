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
//console.log(tfidf)
//create checkboxes
var data = Array.from(documents.keys())
d3.select("#party")
.selectAll("input")
  .data(data)
  .enter().append("label")
  .attr("class","container")
  .text(function(d) { return d; })
  .append("input")
  .attr("type", "checkbox")
  .attr("id", function(d,i) { return d; })
  //.attr("onChange",)
  .attr("for", function(d,i) { return d; });
//store selected partys and Update on change
//var selection = [];
  //document.querySelector("#party").addEventListener("click", function(event) {
    //if(data.includes(event.target.id)){
     // selection.includes(event.target.id) ? selection.splice(selection.indexOf(event.target.id),1) : selection.push(event.target.id)

      wordcloud(d3.select("#wordcloud"),tfidf);
    //}
//});


