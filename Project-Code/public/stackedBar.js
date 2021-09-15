import * as d3 from "d3";

export function stackedBar(svg, partys, search, sortedPartys) {

    //define bar height
    const barHeight = 25;

    //fixed width of section
    const width = 400;

    //height changes dynamically with number of chosen parties
    const height = (sortedPartys.length+2)*barHeight;
    svg.attr("viewBox", [0, 0, width, height]);

var x = d3.scaleLinear()
    .domain([0, 1]) //höchster tdidf wert in datenset search in text for "search"
    .range([50, width-50]);

    //every party gets a bar
var y = d3.scaleBand()
.domain(d3.range(Array.from(partys.keys())))
.range([0, height])
.padding(0.1);

//bars get color encoding
var color = d3.scaleOrdinal()
     .range(d3.schemeRdYlGn[9])

    svg.append("g")
    .selectAll("rect")
    .data(sortedPartys)
    .join("rect")
    .on("mouseover",function(){
        d3.select(this)
    .attr("fill","red")
    .attr("font-family", "Impact")
    .attr("font-size", 6)
    .attr("text-anchor", "end")
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text( function(d)  {  
        var array = partys.get(d)
        for(var i = 0; i <= array.length -1; i++){
        if(array[i][0] == search){
            return formatPercent(array[i]); }}})
      }) 				
      .on("mouseout",function(){
        d3.select(this)
    .transition("colorfade")
                  .duration(250)
              .attr("fill",color)
      }) 
    .attr("x", 50)
    .attr("y", function(d,i) { return (i * barHeight) +10; })
    .attr("width", 0)
    .attr("height", barHeight)
    .attr("fill", color);

var container = [];

//animation of bar values
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("width", function(d) {
            var array = partys.get(d)
            for(var i = 0; i <= array.length -1; i++){
                if(array[i][0] == search){
                    container.push(x(array[i][1]));
                    return x(array[i][1])
                }
            }
            return 0
        })
        .delay(function(d,i){return(i*100)});
        
        //check if keywords exist in election programs
        if(container.every(item => item === 0)) { 
                alert(search + " does not exist in any election program, try another word!");
            }
        
    //text field with name of parties in respective bar
   svg.append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("font-family", "Impact")
    .attr("font-size", 6)
    .selectAll("text")
    .data(sortedPartys)
    .join("text")
    .attr("x", 50)   
    .attr("y", (d,i) => (i * barHeight + barHeight/2) + 10)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text(d => d)
    .attr("dx", +4)
    .attr("fill", "black")
    .attr("text-anchor", "start");

  

  // Y axis
var yRange = d3.scaleLinear()
  .range([0, sortedPartys.length * 25]);  
  
var formatPercent = d3.format(".0%");

var yAxis = d3.axisLeft()
        .scale(yRange)
        .tickValues([])
        .tickSize([3])
        .tickFormat("");
        
var y_xis = svg.append('g')
        .style("font", "8px Impact")
        .attr("transform", "translate(50," + 10 + ")")
        .call(yAxis);


// X axis
 var scale = d3.scaleLinear()
        .domain([0, 1])
        .range([50, width-50]);

var x_axis = d3.axisBottom()
        .scale(scale)
        .tickSize([3]).tickPadding(10).tickFormat(formatPercent);

svg.append("g")
        .style("font", "8px Impact")
        .attr("transform", "translate(0," + (barHeight*sortedPartys.length+10) + ")")
        .call(x_axis);

}
