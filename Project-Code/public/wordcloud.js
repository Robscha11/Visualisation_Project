import * as d3 from "d3";
import { rgb } from "d3";
import cloud from "d3-cloud";
/* Function to draw a word cloud
 * svg: d3 selection of an svg element
 * wordsPerGenre: array of form [{genre: XX, words: [{text: XXX, size: XXX}, {text: XXX, size: XXX}, ...]}, ...]
 * selection: d3 selection of select element
 */
export function wordcloud({ svg, wordsPerGenre}) {
  const selectP1 = d3.select("#party1")
  const selectP2 = d3.select("#party2")
  var genre1
  var genre2
  const width = 600;
  const height = 400;
  svg.attr("viewBox", [0, 0, width, height]);

  const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const size = d3.scaleLinear().range([10, 50]).domain([0,1]);
  const scaleOpacity = d3.scaleLinear().range([0.1, 1]).domain([10,50]);

  // fill the select
  selectP1
    .selectAll("option")
    .data(Array.from(wordsPerGenre.keys()))
    .join("option")
    .text((d) => d);

  selectP2
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
  selectP1.on("change", update);
  selectP2.on("change", update);
  function update() {
    genre1 = selectP1.property("value");
    const words1 = wordsPerGenre.get(genre1).slice(0, 50);

    genre2 = selectP2.property("value");
    const words2 = wordsPerGenre.get(genre2).slice(0, 50);

    var words = [];
    for(var i = 0; i <= words1.length-1; i++){
      words.push(({ text: words1[i][0], size: size(words1[i][1]), key: genre1  }))
      words.push(({ text: words2[i][0], size: size(words2[i][1]), key: genre2  }))
    }
    
    layout.words(words);
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
        var textColor
        if(d.key == genre1){
          textColor = d3.rgb(225,190,106)
        }else{
          textColor = d3.rgb(64,176,166)
        }
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
