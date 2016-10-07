import * as d3 from 'd3';
import data from '../assets/Grafic_SEN.csv';

//console.log("data: ", data);

let newData = [],
    timeParse = d3.timeParse("%d-%m-%Y %H:%M:%S"); //31-12-2015 10:31:32

// // recreate data
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

data.map(function(el) {
  el["Ape[MW]"] = parseInt(el["Ape[MW]"]);
  el["Biomasa[MW]"] = parseInt(el["Biomasa[MW]"]);
  el["Carbune[MW]"] = parseInt(el["Carbune[MW]"]);
  el["Consum[MW]"] = parseInt(el["Consum[MW]"]);
  el["Eolian[MW]"] = parseInt(el["Eolian[MW]"]);
  el["Foto[MW]"] = parseInt(el["Foto[MW]"]);
  el["Hidrocarburi[MW]"] = parseInt(el["Hidrocarburi[MW]"]);
  el["Medie Consum[MW]"] = parseInt(el["Medie Consum[MW]"]);
  el["Nuclear[MW]"] = parseInt(el["Nuclear[MW]"]);
  el["Productie[MW]"] = parseInt(el["Productie[MW]"]);
  el["Sold[MW]"] = parseInt(el["Sold[MW]"]);
});
newData = data;

let maxApe = d3.max(newData, (d) => d["Ape[MW]"]);
let maxBiomasa = d3.max(newData, (d) => d["Biomasa[MW]"]);
let maxCarbune = d3.max(newData, (d) => d["Carbune[MW]"]);
let maxConsum = d3.max(newData, (d) => d["Consum[MW]"]);
let maxEolian = d3.max(newData, (d) => d["Eolian[MW]"]);
let maxFoto = d3.max(newData, (d) => d["Foto[MW]"]);
let maxHidrocarburi = d3.max(newData, (d) => d["Hidrocarburi[MW]"]);
let maxMedieConsum = d3.max(newData, (d) => d["Medie Consum[MW]"]);
let maxNuclear = d3.max(newData, (d) => d["Nuclear[MW]"]);
let maxProductie = d3.max(newData, (d) => d["Productie[MW]"]);
let maxSold = d3.max(newData, (d) => d["Sold[MW]"]);

let maxValue = d3.max([maxApe, maxBiomasa, maxCarbune, maxConsum, maxEolian, maxFoto, maxHidrocarburi, maxMedieConsum, maxNuclear, maxProductie, maxSold]);

let minApe = d3.min(newData, (d) => d["Ape[MW]"]);
let minBiomasa = d3.min(newData, (d) => d["Biomasa[MW]"]);
let minCarbune = d3.min(newData, (d) => d["Carbune[MW]"]);
let minConsum = d3.min(newData, (d) => d["Consum[MW]"]);
let minEolian = d3.min(newData, (d) => d["Eolian[MW]"]);
let minFoto = d3.min(newData, (d) => d["Foto[MW]"]);
let minHidrocarburi = d3.min(newData, (d) => d["Hidrocarburi[MW]"]);
let minMedieConsum = d3.min(newData, (d) => d["Medie Consum[MW]"]);
let minNuclear = d3.min(newData, (d) => d["Nuclear[MW]"]);
let minProductie = d3.min(newData, (d) => d["Productie[MW]"]);
let minSold = d3.min(newData, (d) => d["Sold[MW]"]);

let minValue = d3.min([minApe, minBiomasa, minCarbune, minConsum, minEolian, minFoto, minHidrocarburi, minMedieConsum, minNuclear, minProductie, minSold]);

//console.log("usable data: ", newData);


let stack = d3.stack()
  .keys(["Ape[MW]", "Biomasa[MW]", "Carbune[MW]", "Consum[MW]", "Eolian[MW]", "Foto[MW]", "Hidrocarburi[MW]", "Medie Consum[MW]", "Nuclear[MW]", "Productie[MW]", "Sold[MW]"])
  .order(d3.stackOrderInsideOut)
  .offset(d3.stackOffsetWiggle);

let layers = stack(newData);

//console.log("layers: ", layers);
console.log("minValue: ", minValue);
console.log("maxValue: ", maxValue);

var width = 960,
    height = 480;

var x = d3.scaleTime()
    .domain([d3.min(newData, function(d) {return timeParse(d["Data"]);}), d3.max(newData, function(d) {return timeParse(d["Data"]);})])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([parseInt(minValue), parseInt(maxValue)])
    .range([150, height - 100]);

var color = d3.scaleLinear()
    .range(["#aad", "#556"]);

var area = d3.area()
    .x(function(d) {
      //console.log("from area: ", x(timeParse(d.data['Data'])));
      return x(timeParse(d.data['Data']));
    })
    .y0(function(d) {
      //console.log("from area y0: ", y(d[0]));
      if(!isNaN(y(d[0]))) {
          return y(d[0]);
      }
      return 0;
    })
    .y1(function(d) {
      //console.log("from area y1: ", y(d[1]));
      if(!isNaN(y(d[1]))) {
          return y(d[0]) + y(d[1]);
      }
      return 0;
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
    .style("fill", function() { return color(Math.random()); });
