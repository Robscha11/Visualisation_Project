import * as d3 from "d3";

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
const genre = Array.from(wordsPerGenre.keys());
const data = wordsPerGenre.get(genre[0]).slice(0, 50);
console.log(data);

    svg.append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", 30)    //x(0)
    .attr("y", (d, i) => y(i))
    .attr("width", d => d.text.some(item => item === search) ? d.size[d.text.indexOf(search)] : 0) //length of bar .attr("width", d => x(d.text) - x(0))
    .attr("height", 23);       //height of bar y.bandwidth()


                                              //Text in jedem Bar (Wert)
   /* svg.append("g")
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
    .attr("text-anchor", "start"));*/

    svg.append("g")
    .call(xAxis);

    svg.append("g")
    .call(yAxis);

    x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.size)]) //höchster tdidf wert in datenset search in text for "search"
    .range([0, width]);

    y = d3.scaleBand()
    .domain(d3.range(Array.from(wordsPerGenre.keys())) //für jede Partei eine Leiste
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1));

    color = d3.scaleOrdinal()
     .domain(d3.range(Array.from(wordsPerGenre.keys()))
     .range(d3.schemeSpectral[Array.from(wordsPerGenre.keys().length)]) // bars sollen unterschiedliche Farben haben, man könnte auch Parteifarben nehmen
     .unknown("#ccc"));

     xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80, "s"))  // mal schauen was hier passiert

      yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => genre[i]).tickSizeOuter(0)); //Parteien als Legende vertikal


}
