import * as d3 from "d3";
import { rgb } from "d3";
import cloud from "d3-cloud";

export function stackedBar(svg, wordsPerGenre, search, textColor) {
    const width = 400;
    const height = 400;
    svg.attr("viewBox", [0, 0, width, height]);

    const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

     const size = d3.scaleLinear().range([10, 50]).domain([0,1]);
     //const scaleOpacity = d3.scaleLinear().range([0.1, 1]).domain([10,50]);

     // fill the select
     /*
     selection
      .selectAll("option")
      .data(Array.from(wordsPerGenre.keys()))
      .join("option")
      .text((d) => d);

      const genre = selection.property("value");
      const words = wordsPerGenre.get(genre).slice(0, 50);
*/
const data = wordsPerGenre.get(genre).slice(0, 50);

    svg.append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(search)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d, i) => y(i))
    .attr("width", d => x(d.text) - x(0))
    .attr("height", y.bandwidth());

    svg.append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("x", d => x(d.size))
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text(d => format(d.size))
    .call(text => text.filter(d => x(d.text) - x(0) < 20) // short bars
    .attr("dx", +4)
    .attr("fill", "black")
    .attr("text-anchor", "start"));

    svg.append("g")
    .call(xAxis);

    svg.append("g")
    .call(yAxis);

    x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.text)]) //search in text for "search"
    .range([margin.left, width - margin.right])

    y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)

      color = d3.scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(d3.schemeSpectral[series.length])
      .unknown("#ccc")

     xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80, data.format))
      .call(g => g.select(".domain").remove())

      yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))

  return svg.node();
}
