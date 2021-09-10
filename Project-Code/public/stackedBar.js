import * as d3 from "d3";

export function stackedBar(svg, wordsPerGenre, search) {
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

var x = d3.scaleLinear()
    .domain([0, 1]) //höchster tdidf wert in datenset search in text for "search"
    .range([0, width]);

var y = d3.scaleBand()
.domain(d3.range(Array.from(wordsPerGenre.keys()))) //für jede Partei eine Leiste
.padding(0.1);

var barHeight = 25;

var color = d3.scaleOrdinal()
     //.domain(d3.range(genre))
     .range(d3.schemeRdBu[genre.length]) // bars sollen unterschiedliche Farben haben, man könnte auch Parteifarben nehmen

    svg.append("g")
    .selectAll("rect")
    .data(genre)
    .join("rect")
    .attr("x", 0)    //x(0) der kann so bleiben
    .attr("y", (d,i) => (i * barHeight))  //müsste je nach key runtergeschoben werden
    .attr("width", function(d) {
        var array = wordsPerGenre.get(d)
        for(var i = 0; i <= array.length -1; i++){
            if(array[i][0] == search){
                //console.log(array[i][1])
                return x(array[i][1])
            }
        }
        return 0
    })
    .attr("height", barHeight)       //height of bar y.bandwidth()
    .attr("fill", color);


                                              //Text in jedem Bar (Wert)
   svg.append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", 6)
    .selectAll("text")
    .data(genre)
    .join("text")
    .attr("x", 0)    //x(0) der kann so bleiben
    .attr("y", (d,i) => (i * barHeight + barHeight/2))  //müsste je nach key runtergeschoben werden
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text(d => d)
    //.call(text) // short bars
    .attr("dx", +4)
    .attr("fill", "black")
    .attr("text-anchor", "start");

  

  // Y axis

var yRange = d3.scaleLinear()
  .range([0, genre.length * 25]);  
  
var formatPercent = d3.format(".0%");

var yAxis = d3.axisLeft()
        .scale(yRange)
        
var y_xis = svg.append('g')
        //.attr('id','yaxis')
        .call(yAxis);


// X axis
 var scale = d3.scaleLinear()
        .domain([0, 1])  // von 0 - 1
        .range([0, width]);

var x_axis = d3.axisBottom()
        .scale(scale)
        .tickSize([3]).tickPadding(10).tickFormat(formatPercent);

svg.append("g")
        .attr("transform", "translate(0," + barHeight*genre.length + ")")
        .call(x_axis);


//CDU CSU SPD AFD FDP DIE-LINKE DIE-GRUENEN BGE FREIE-WÄHLER ÖDP Piratenpartei SSW Tierschutzpartei VOLT
        // für Parteifarben
        //.attr("fill", function(d, i){
        //    if(d.name == 'Walnuts') {return 'red'} else {return 'green'}
        //                              });


                                      /* Blau: CSU, AFD, BGE, SSW
                                        Schwarz-Weiß-Rot: Die Partei
                                        Gelb: FDP
                                        Grün: Die Grünen
                                        Orange: Piratenpartei, ÖDP, Freie Wähler
                                        Rot: Die Linke, SPD, CDU
                                        Violett: Volt
                                        Schwarz: CSU+CDU
                                        Bunt: Tierschutzpartei
                                        
//https://www.tutorialsteacher.com/d3js/animated-bar-chart-d3

//animation bar chart
//https://www.d3-graph-gallery.com/graph/barplot_animation_start.html


// Werte auf bar chart
//https://bl.ocks.org/bytesbysophie/952a1003dd188410e9c6262b68a65f9a
*/
    



    




}
