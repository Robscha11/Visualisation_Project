import * as d3 from "d3";

export function defaultStackedBar(svg) {
    const width = 400;
    const height = 400;
    svg.attr("viewBox", [0, 0, width, height]);

    const g = svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", 15)
    .attr("x", 150)
    .attr("y", 10)
    .attr("dy", "+.35em")
    .attr("dx", "+.35em")
    .attr("fill", "white")
    .text("Search for Keyword");
}
