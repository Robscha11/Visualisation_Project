import * as d3 from "d3";


d3.csv("../data/AFD.csv", d3.autoType).then((data) => {
  console.log(data);
});
