import * as d3 from "d3";

export function tagCloud(tfidf) {
var svg
var partys = Array.from(tfidf.keys())

if(partys.length == 7){
  svg = d3.select("#dots1")
  var wordvectors = []
  var p = partys.slice(0,4)
  for(var i = 0; i <= p.length -1; i++){
    wordvectors.push({title: p[i], wordvector: tfidf.get(p[i])})
  }
  create(svg)
  svg = d3.select("#dots2")
  wordvectors = []
  p = partys.slice(4,8)
  for(var i = 0; i <= p.length -1; i++){
    wordvectors.push({title: p[i], wordvector: tfidf.get(p[i])})
  }
  create(svg)
}else{
  svg = d3.select("#dots1")
  var wordvectors = []
  var p = partys.slice(0,4)
  for(var i = 0; i <= p.length -1; i++){
    wordvectors.push({title: p[i], wordvector: tfidf.get(p[i])})
  }
  create(svg)
  svg = d3.select("#dots2")
  wordvectors = []
  p = partys.slice(4,8)
  for(var i = 0; i <= p.length -1; i++){
    wordvectors.push({title: p[i], wordvector: tfidf.get(p[i])})
  }
  create(svg)
  svg = d3.select("#dots3")
  wordvectors = []
  p = partys.slice(8,12)
  for(var i = 0; i <= p.length -1; i++){
    wordvectors.push({title: p[i], wordvector: tfidf.get(p[i])})
  }
  create(svg)
  svg = d3.select("#dots4")
  wordvectors = []
  p = partys.slice(12,16)
  for(var i = 0; i <= p.length -1; i++){
    wordvectors.push({title: p[i], wordvector: tfidf.get(p[i])})
  }
  create(svg)
  svg = d3.select("#dots5")
  wordvectors = []
  p = partys.slice(16,20)
  for(var i = 0; i <= p.length -1; i++){
    wordvectors.push({title: p[i], wordvector: tfidf.get(p[i])})
  }
  create(svg)
}

function create(svg){
    const width = 400;
    const height = 80;
    const margin = { top: 30, right: 80, bottom: 0, left: 50 };
    const numWords = 3;
  
    svg.attr("viewBox", [0, 0, width, height]);
  
    const x = d3
      .scalePoint()
      .domain(wordvectors.map((d) => d.title))
      .range([margin.left, width - margin.right]);
  
    const y = d3
      .scalePoint()
      .domain(
        Array(numWords)
          .fill(0)
          .map((d, i) => i)
      )
      .range([30, height - margin.bottom]);
  
    svg
      .append("g")
      .attr("transform", `translate(0, ${margin.top})`)
      .call(d3.axisTop(x))
      .call((g) =>
        g
          .selectAll("text")
          .style("text-anchor", "middle")
          .style("fill", "yellow")
      );
  
    svg
      .append("g")
      .selectAll("g")
      .data(wordvectors)
      .join("g")
      .attr("transform", (d,i) => `translate(${x(d.title)},0)`)
      .selectAll("text")
      .data((d) => d.wordvector.slice(0, numWords))
      .join("text")
      .attr("x", 0)
      .attr("y", (d, i) => (i * 15)+ margin.top + 5)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .style("fill", "white")
      .text((d) => d[0]);
}
  }