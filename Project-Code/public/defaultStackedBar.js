import * as d3 from "d3";

export function defaultStackedBar(svg) {
  const width = 400;
  const height = 30;
  svg.attr("viewBox", [0, 0, width, height]);

  //default text until first search started
  const g = svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("font-family", "Impact")
    .attr("font-size", 10)
    .attr("x", 70)
    .attr("y", 10)
    .attr("dy", "+.35em")
    .attr("dx", "+.35em")
    .attr("fill", "white")
    .text("Insert a Keyword");
}
