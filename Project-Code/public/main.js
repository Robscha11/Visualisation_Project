import * as d3 from "d3";

//lesen der TXT
var Words = []; 
var WordFile = new XMLHttpRequest(); 
WordFile.open("GET", "data/CDU.txt", false); 
WordFile.onreadystatechange = function () { if(WordFile.readyState === 4) { 
  if(WordFile.status === 200 || WordFile.status == 0) { Words.push(WordFile.responseText.split(" ")); } } }; 
WordFile.send(null);

//paar sachen rausfiltern --- reihenfolge ist wichtig glaube ich
var a = []
Words.forEach(d => d.forEach(d => a.push(d.split("\n"))))
a = a.flat()

var b = []
a.forEach(d => b.push(d.split("\t")))
b = b.flat()

var c = []
b.forEach(d => c.push(d.split("\b")))
c = c.flat()

//Punkte filtern
c = c.filter(function(n){ return n.includes(".") ? "" : n });
//leere Elemente aus Array raus schmeißen
c = c.filter(function(n){ return n != "" });


console.log(c)