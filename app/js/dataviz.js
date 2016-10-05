import * as d3 from 'd3';
import data from '../assets/Grafic_SEN_small.csv';

console.log("data: ", data);

let newData = [],
    timeParse = d3.timeParse("%d-%m-%Y %H:%M:%S"); //31-12-2015 10:31:32

// recreate data
// for(let i = 0; i < data.length; i++) {
//   let obj = {
//     date: timeParse(data[i]["Data"]),
//     values: {
//       "ape": data[i]["Ape[MW]"],
//       "biomasa": data[i]["Biomasa[MW]"],
//       "carbune": data[i]["Carbune[MW]"],
//       "consum": data[i]["Consum[MW]"],
//       "eolian": data[i]["Eolian[MW]"],
//       "foto": data[i]["Foto[MW]"],
//       "hidrocarburi": data[i]["Hidrocarburi[MW]"],
//       "media_consum": data[i]["Medie Consum[MW]"],
//       "nuclear": data[i]["Nuclear[MW]"],
//       "productie": data[i]["Productie[MW]"],
//       "sold": data[i]["Sold[MW]"]
//     }
//   };
//   newData.push(obj);
// }

data.forEach((d) => {
  d.Data = timeParse(d.Data);
});

var dataByDate = d3.nest()
  .key((d) => d.Data)
  .entries(data);

console.log("usable data: ", dataByDate);

let stack = d3.stack()
  .keys(["Ape[MW]", "Biomasa[MW]", "Carbune[MW]", "Consum[MW]", "Eolian[MW]", "Foto[MW]", "Hidrocarburi[MW]", "Medie Consum[MW]", "Nuclear[MW]", "Productie[MW]", "Sold[MW]"])
  .value((d) => {console.log(d.values); return d.values;})
  .order(d3.stackOrderInsideOut)
  .offset(d3.stackOffsetWiggle);

let layers = stack(dataByDate);

console.log("layers: ", layers);

var width = 960,
    height = 480;

var x = d3.scaleTime()
    .domain([0, d3.max(newData, function(d) {return d.date;})])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, d3.max(newData, function(d) { return d.y0 + d.y; })])
    .range([0, height]);

var color = d3.scaleLinear()
    .range(["#aad", "#556"]);

var area = d3.area()
    .x(function(d) {
      console.log("from area: ", d);
      return x(d.date);
    })
    .y0(function(d) {
      return y(d.y0);
    })
    .y1(function(d) {
      return y(d.y0 + d.y);
    });

var svg = d3.select(".cm-dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(layers)
    .enter()
    .append("path")
    .attr("d", area)
    .attr("stroke-width", 2)
    .attr("stroke", "black")
    .style("fill", function() { return color(Math.random()); });
