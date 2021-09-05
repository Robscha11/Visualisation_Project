import * as d3 from "d3";
import { rgb } from "d3";
import cloud from "d3-cloud";
/* Function to draw a word cloud
 * svg: d3 selection of an svg element
 * wordsPerGenre: array of form [{genre: XX, words: [{text: XXX, size: XXX}, {text: XXX, size: XXX}, ...]}, ...]
 * selection: d3 selection of select element
 */
export function wordcloud({ svg, wordsPerGenre, selection, textColor }) {
  console.log(selection)
  const width = 400;
  const height = 400;
  svg.attr("viewBox", [0, 0, width, height]);

  const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const size = d3.scaleLinear().range([10, 50]).domain([0,1]);
  const scaleOpacity = d3.scaleLinear().range([0.1, 1]).domain([10,50]);

  // fill the select
  selection
    .selectAll("option")
    .data(Array.from(wordsPerGenre.keys()))
    .join("option")
    .text((d) => d);

  const layout = cloud()
    .size([width, height])
    .padding(5)
    .font("Impact")
    .rotate(0)
    .fontSize(function (d) {
      return d.size;
    })
    .on("end", draw);

  update();
  selection.on("change", update);
  function update() {
    const genre = selection.property("value");
    const words = wordsPerGenre.get(genre).slice(0, 1000);
    
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
      .style("font-family", "Impact")
      .style("fill", function (d) {
        textColor.opacity = scaleOpacity(d.size)
        return textColor;
      })
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function (d) {
        return d.text;
      });
  }
}
