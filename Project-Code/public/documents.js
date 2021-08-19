import { stopwords } from "./stopwords";

export function getdocuments() {

//lesen der TXT
var Words = []; 
var WordFile = new XMLHttpRequest(); 
WordFile.open("GET", "data/SSW.txt", false); 
WordFile.onreadystatechange = function () { if(WordFile.readyState === 4) { 
  if(WordFile.status === 200 || WordFile.status == 0) { Words.push(WordFile.responseText.split(" ")); } } }; 
WordFile.send(null);

//paar sachen rausfiltern --- reihenfolge ist wichtig glaube ich
// hab bis jetzt kein anderen Weg gefunden---- .filter geht hier nicht 
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
h.forEach(d => k.push(d.toLowerCase()))
k = k.flat()

//ab hier werden ganze Array Elemente gelöscht

k = k.filter(n => n >= 0 ? "" : n);

for(var i = 0; i <= stopwords.length; i++){
  if(k.includes(stopwords[i])){
    k = k.filter(n => n != stopwords[i]);
  }
}

return k
}