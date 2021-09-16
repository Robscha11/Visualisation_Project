import * as d3 from "d3";
import cloud from "d3-cloud";

export function compcloud({ svg, wordsPerGenre }) {
  const selectP1 = d3.select("#party1");
  const selectP2 = d3.select("#party2");
  var genre1;
  var genre2;
  const width = 600;
  const height = 400;
  svg.attr("viewBox", [0, 0, width, height]);

  const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const size1 = d3.scaleLinear().range([10, 50]);
  const size2 = d3.scaleLinear().range([10, 50]);
  const scaleOpacity = d3.scaleLinear().range([0.1, 1]).domain([10, 50]);

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
    .random(function (d) {
      return 0.5;
    })
    .spiral("archimedean")
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
    size1.domain(d3.extent(words1, (d) => d[1]));

    genre2 = selectP2.property("value");
    const words2 = wordsPerGenre.get(genre2).slice(0, 50);
    size2.domain(d3.extent(words2, (d) => d[1]));

    var words = [];
    for (var i = 0; i <= words1.length - 1; i++) {
      words.push({
        text: words1[i][0],
        size: size1(words1[i][1]),
        key: genre1,
      });
      words.push({
        text: words2[i][0],
        size: size2(words2[i][1]),
        key: genre2,
      });
    }
    //console.log(words)

    layout.words(words);
    layout.start();
  }

  function draw(words) {
    g.selectAll("text")
      .data(words)
      .join("text")
      .transition()
      .duration(600)
      .style("font-size", function (d) {
        return d.size + "px";
      })
      .style("font-family", "Impact")
      .style("fill", function (d) {
        var textColor;
        if (d.key == genre1) {
          textColor = d3.rgb(225, 190, 106);
        } else {
          textColor = d3.rgb(64, 176, 166);
        }
        textColor.opacity = scaleOpacity(d.size);
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
