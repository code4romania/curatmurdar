import * as d3 from 'd3';
import data from '../assets/Grafic_SEN_small.csv';

console.log(data);

var n = Object.keys(data[0]).length, // number of energy types
    m = data.length, // number of entries
    stack = d3.stack()
      .keys(["Ape[MW]", "Biomasa[MW]", "Carbune[MW]", "Consum[MW]", "Eolian[MW]", "Foto[MW]", "Hidrocarburi[MW]", "Medie Consum[MW]", "Nuclear[MW]", "Productie[MW]", "Sold[MW]"])
      .order(d3.stackOrderInsideOut)
      .offset(d3.stackOffsetWiggle),
    // layers0 = stack(d3.range(n).map(function() { return bumpLayer(m); })),
    layers0 = stack(data);
    // layers1 = stack(d3.range(n).map(function() { return bumpLayer(m); }));

console.log(layers0);

var width = 960,
    height = 480;

var x = d3.scaleLinear()
    .domain([0, m - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, d3.max(layers0, function(layer) { return d3.max(layer, function(d) { return d[1]; }); })])
    .range([0, height]);

var color = d3.scaleLinear()
    .range(["#aad", "#556"]);

var area = d3.area()
    .x(function(d) {
      return x(d[0]);
    })
    .y1(function(d) {
      return y(d[1]);
    })
    .y0(y(0));

var svg = d3.select(".cm-dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(layers0)
    .enter()
    .append("path")
    .attr("d", area)
    .attr("stroke-width", 2)
    .attr("stroke", "black")
    .style("fill", function() { return color(Math.random()); });
