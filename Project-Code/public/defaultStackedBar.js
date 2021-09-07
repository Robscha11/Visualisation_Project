import * as d3 from "d3";
import { rgb } from "d3";
import cloud from "d3-cloud";

export function stackedBar(svg) {
    const width = 400;
    const height = 400;
    svg.attr("viewBox", [0, 0, width, height]);

    const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .enter().append("g")
      .attr("transform", 20);
      g.append("text")
      .attr("x", 100)
      .attr("y", 100)
      .attr("dy", ".35em")
      .text("Search for Keyword");
}