import { stopwords } from "./stopwords";
import stem from 'snowball-german'; //stemmer ab Zeile 59 ist nicht wirklich sinnvoll denke ich

export function getdocuments(useStemm,useAllPartys) {
//einlesen der Dateinamen
var Parteien = []; 
var WordFile = new XMLHttpRequest(); 
WordFile.open("GET", "data/Parteinamen.txt", false); 
WordFile.onreadystatechange = function () { if(WordFile.readyState === 4) { 
  if(WordFile.status === 200 || WordFile.status == 0) { Parteien.push(WordFile.responseText.split(" ")); } } }; 
WordFile.send(null);
Parteien = Parteien.flat()

if(!useAllPartys){
  Parteien = Parteien.slice(0,2)
}

//alle Dateien auslesen 
var allWords = new Map()
for(var i = 0; i <= Parteien.length - 1; i++){
  allWords.set(Parteien[i],getWords(Parteien[i]))
}

function getWords (name){
  //lesen der TXT
  var Words = []; 
  var WordFile = new XMLHttpRequest(); 
  WordFile.open("GET", `data/${name}.txt`, false); 
  WordFile.onreadystatechange = function () { if(WordFile.readyState === 4) { 
  if(WordFile.status === 200 || WordFile.status == 0) { Words.push(WordFile.responseText.split(" ")); } } }; 
  WordFile.send(null);

  //paar sachen rausfiltern --- reihenfolge ist wichtig glaube ich
  var splitChar = ["\n","\t","\b","\f",".","\u0007",",",":","!","˵","˝","»","(",")","?","//"]; //Anführungszeichen entfernen (hat das funktioniert?)
  for(var i = 0; i <= splitChar.length-1; i++){
    var buffer = [];
    Words.forEach(d => d.forEach(d => buffer.push(d.split(`${splitChar[i]}`))))
    Words = buffer;
  }
  Words = Words.flat()
  //alles klein geschrieben
  buffer = []
  Words.forEach(d => buffer.push(d.toLowerCase()))
  Words = buffer.flat()
  //entferne - wenn es am ende steht
  buffer = []
  Words.forEach(d => buffer.push(d.slice(-1) === "-" ? d.substr(0, d.length - 1) : d))
  Words = buffer.flat()


  //ab hier werden ganze Array Elemente gelöscht
  //zahlen werden entfernt (10-50 beispielsweise nicht)
  Words = Words.filter(d => d >= 0 ? "" : d);
  //leere elemente mit länge 1 (?) werden auf 0 gesetzt
  Words = Words.filter(d => d.length == 1 ? "" : d)
  //stopwörter werden entfernt
  for(var i = 0; i <= stopwords.length; i++){
    if(Words.includes(stopwords[i])){
      Words = Words.filter(d => d != stopwords[i]);
    }
  }

  if(useStemm){
    buffer = []
    Words.forEach(d => buffer.push(stem(d)))
    Words = buffer.flat()
  }
  
  return Words
}

return allWords
}