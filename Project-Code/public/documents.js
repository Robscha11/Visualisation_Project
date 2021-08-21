import { stopwords } from "./stopwords";

export function getdocuments() {
//einlesen der Dateinamen
var Parteien = []; 
var WordFile = new XMLHttpRequest(); 
WordFile.open("GET", "data/Parteinamen.txt", false); 
WordFile.onreadystatechange = function () { if(WordFile.readyState === 4) { 
  if(WordFile.status === 200 || WordFile.status == 0) { Parteien.push(WordFile.responseText.split(" ")); } } }; 
WordFile.send(null);
Parteien = Parteien.flat()

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
  // hab bis jetzt kein anderen Weg gefunden----
  //.map geht nicht aber ich weiß nicht warum
  //.filter geht hier nicht!

  var a = []
  Words.forEach(d => d.forEach(d => a.push(d.split("\n"))))
  a = a.flat()

  var b = []
  a.forEach(d => b.push(d.split("\t")))
  b = b.flat()

  var c = []
  b.forEach(d => c.push(d.split("\b")))
  c = c.flat()

  var e = []
  c.forEach(d => e.push(d.split("\f")))
  e = e.flat()

  var f = []
  e.forEach(d => f.push(d.split(".")))
  f = f.flat()

  var g = []
  f.forEach(d => g.push(d.split("\u0007")))
  g = g.flat()

  var h = []
  g.forEach(d => h.push(d.split(",")))
  h = h.flat()

  var k = []
  h.forEach(d => k.push(d.split(":")))
  k = k.flat()
  //alles klein geschrieben
  var l = []
  k.forEach(d => l.push(d.toLowerCase()))
  l = l.flat()
  //entferne - wenn es am ende steht
  var m = []
  l.forEach(d => m.push(d.slice(-1) === "-" ? d.substr(0, d.length - 1) : d))
  m = m.flat()

  var n = []
  m.forEach(d => n.push(d.split("!")))
  n = n.flat()

  //ab hier werden ganze Array Elemente gelöscht
  //zahlen werden entfernt (10-50 beispielsweise nicht)
  n = n.filter(d => d >= 0 ? "" : d);
  //leere elemente mit länge 1 (?) werden auf 0 gesetzt
  n = n.filter(d => d.length == 1 ? "" : d)
  //stopwörter werden entfernt
  for(var i = 0; i <= stopwords.length; i++){
    if(n.includes(stopwords[i])){
      n = n.filter(d => d != stopwords[i]);
    }
  }
  return n
}

return allWords
}