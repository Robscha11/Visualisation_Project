import * as d3 from "d3";
import cloud from "d3-cloud";
/* Function to draw a word cloud
 * svg: d3 selection of an svg element
 * wordsPerGenre: array of form [{genre: XX, words: [{text: XXX, size: XXX}, {text: XXX, size: XXX}, ...]}, ...]
 * selection: d3 selection of select element
 */
export function wordcloud(svg, wordsPerGenre) {
  const width = 600;
  const height = 400;
  svg.attr("viewBox", [0, 0, width, height]);

  const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const size = d3.scaleLinear().range([10, 50]);

  
  const layout = cloud()
    .size([width, height])
    .padding(1)
    .font("Impact")
    .rotate(0) //rotationsfunktion
    .spiral(function(size) {
      // t indicates the current step along the spiral; it may monotonically
      // increase or decrease indicating clockwise or counterclockwise motion.
      return function(t) { 
        //var x = t/10
        //var y = 10* Math.sin(10*t)
        console.log(t)
        return [t, t]; };
    })
    .fontSize(function (d) {
      return d.size;
    })
    .on("end", draw);

  const words = [["PLEASE CHOOSE A POLITICAL PARTY",1]];
  size.domain(d3.extent(words, (d) => d[1]));
  layout.words(words.map((d) => ({ text: d[0], size: size(d[1]) })));
  layout.start();

  //update handler
  var selection = []
  var data = Array.from(wordsPerGenre.keys())
  document.querySelector("#party").addEventListener("click", function(event) {
    if(data.includes(event.target.id)){
      selection.includes(event.target.id) ? selection.splice(selection.indexOf(event.target.id),1) : selection.push(event.target.id)
      if(selection.length >= 1){
        update();
      }
    }
  });

  function update() {
    const genre = selection[0];
    const words = wordsPerGenre.get(genre).slice(0, 2);
    
    size.domain(d3.extent(words, (d) => d[1]));
    layout.words(words.map((d) => ({ text: d[0], size: size(d[1]) })));
    layout.start();
  }

  function draw(words) {
    g.selectAll("text")
      .data(words)
      .join("text")
      .style("font-size", function (d) {
        return d.size + "px";
      })
      .style("fill","red") //farbe der wörter
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function (d) {
        console.log(d)
        return d.text;
      });
  }
}
