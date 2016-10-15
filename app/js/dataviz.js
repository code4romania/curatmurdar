import * as d3 from 'd3';
import data from '../assets/Grafic_SEN.csv';

console.log('data: ', data);

let newData = [],
    displayEl = document.querySelector('.cm-dataviz__display'),
    timeParse = d3.timeParse('%d-%m-%Y %H:%M:%S'); // 31-12-2015 10:31:32

// // recreate data
// for(let i = 0; i < data.length; i++) {
//   let obj = {
//     date: timeParse(data[i]['Data']),
//     values: {
//       'ape': data[i]['Ape[MW]'],
//       'biomasa': data[i]['Biomasa[MW]'],
//       'carbune': data[i]['Carbune[MW]'],
//       'consum': data[i]['Consum[MW]'],
//       'eolian': data[i]['Eolian[MW]'],
//       'foto': data[i]['Foto[MW]'],
//       'hidrocarburi': data[i]['Hidrocarburi[MW]'],
//       'media_consum': data[i]['Medie Consum[MW]'],
//       'nuclear': data[i]['Nuclear[MW]'],
//       'productie': data[i]['Productie[MW]'],
//       'sold': data[i]['Sold[MW]']
//     }
//   };
//   newData.push(obj);
// }

let lminim = '';
data.map(function(el) {
  let luna = el['Data'].split('').slice(0, 2).join('');

  if (lminim !== luna) {
    newData.push(el);
  }

  lminim = luna;
});

newData.map(function(el) {
  el['Ape[MW]'] = parseInt(+el['Ape[MW]']);
  el['Biomasa[MW]'] = parseInt(+el['Biomasa[MW]']);
  el['Carbune[MW]'] = parseInt(+el['Carbune[MW]']);
  el['Consum[MW]'] = parseInt(+el['Consum[MW]']);
  el['Eolian[MW]'] = parseInt(+el['Eolian[MW]']);
  el['Foto[MW]'] = parseInt(+el['Foto[MW]']);
  el['Hidrocarburi[MW]'] = parseInt(+el['Hidrocarburi[MW]']);
  el['Medie Consum[MW]'] = parseInt(+el['Medie Consum[MW]']);
  el['Nuclear[MW]'] = parseInt(+el['Nuclear[MW]']);
  el['Productie[MW]'] = parseInt(+el['Productie[MW]']);
  el['Sold[MW]'] = parseInt(+el['Sold[MW]']);
});

let maxApe = d3.max(newData, (d) => d['Ape[MW]']);
console.log('maxApe: ', maxApe);
let maxBiomasa = d3.max(newData, (d) => d['Biomasa[MW]']);
console.log('maxBiomasa: ', maxBiomasa);
let maxCarbune = d3.max(newData, (d) => d['Carbune[MW]']);
console.log('maxCarbune: ', maxCarbune);
let maxConsum = d3.max(newData, (d) => d['Consum[MW]']);
console.log('maxConsum: ', maxConsum);
let maxEolian = d3.max(newData, (d) => d['Eolian[MW]']);
console.log('maxEolian: ', maxEolian);
let maxFoto = d3.max(newData, (d) => d['Foto[MW]']);
console.log('maxFoto: ', maxFoto);
let maxHidrocarburi = d3.max(newData, (d) => d['Hidrocarburi[MW]']);
console.log('maxHidrocarburi: ', maxHidrocarburi);
let maxMedieConsum = d3.max(newData, (d) => d['Medie Consum[MW]']);
console.log('maxMedieConsum: ', maxMedieConsum);
let maxNuclear = d3.max(newData, (d) => d['Nuclear[MW]']);
console.log('maxNuclear: ', maxNuclear);
let maxProductie = d3.max(newData, (d) => d['Productie[MW]']);
console.log('maxProductie: ', maxProductie);
let maxSold = d3.max(newData, (d) => d['Sold[MW]']);
console.log('maxSold: ', maxSold);

let maxValue = maxApe + maxBiomasa + maxCarbune + maxConsum + maxEolian + maxFoto + maxHidrocarburi + maxMedieConsum + maxNuclear + maxProductie + maxSold;

let minApe = d3.min(newData, (d) => d['Ape[MW]']);
let minBiomasa = d3.min(newData, (d) => d['Biomasa[MW]']);
let minCarbune = d3.min(newData, (d) => d['Carbune[MW]']);
let minConsum = d3.min(newData, (d) => d['Consum[MW]']);
let minEolian = d3.min(newData, (d) => d['Eolian[MW]']);
let minFoto = d3.min(newData, (d) => d['Foto[MW]']);
let minHidrocarburi = d3.min(newData, (d) => d['Hidrocarburi[MW]']);
let minMedieConsum = d3.min(newData, (d) => d['Medie Consum[MW]']);
let minNuclear = d3.min(newData, (d) => d['Nuclear[MW]']);
let minProductie = d3.min(newData, (d) => d['Productie[MW]']);
let minSold = d3.min(newData, (d) => d['Sold[MW]']);

let minValue = d3.min([minApe, minBiomasa, minCarbune, minConsum, minEolian, minFoto, minHidrocarburi, minMedieConsum, minNuclear, minProductie, minSold]);

// console.log('usable data: ', newData);

let stack = d3.stack()
  .keys(['Ape[MW]', 'Biomasa[MW]', 'Carbune[MW]', 'Consum[MW]', 'Eolian[MW]', 'Foto[MW]', 'Hidrocarburi[MW]', 'Medie Consum[MW]', 'Nuclear[MW]', 'Productie[MW]', 'Sold[MW]'])
  .order(d3.stackOrderInsideOut)
  .offset(d3.stackOffsetWiggle);

let layers = stack(newData);

// console.log('layers: ', layers);
console.log('minValue: ', minValue);
console.log('maxValue: ', parseInt(maxValue));
console.log('layers: ', layers);

var width = 960,
    height = 480;

var x = d3.scaleTime()
    .domain([d3.min(newData, function(d) { return timeParse(d['Data']); }), d3.max(newData, function(d) { return timeParse(d['Data']); })])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([parseInt(minValue) - 1000, parseInt(maxValue)])
    .range([height, 0]);

var yAxis = d3.axisLeft(y)
  .ticks(20)
  .tickFormat(d3.format(',.0f'));

// var color = d3.scaleLinear()
//     .range(['#aad', '#556']);

var area = d3.area()
    .x(function(d) {
      // console.log('from area: ', x(timeParse(d.data['Data'])));
      return x(timeParse(d.data['Data']));
    })
    .y0(function(d) {
      // console.log('from area y0: ', y(d[0]));
      if (!isNaN(y(d[0]))) {
        return y(d[0]);
      }
      return 0;
    })
    .y1(function(d) {
      // console.log('from area y1: ', y(d[1]));
      if (!isNaN(y(d[1]))) {
        return y(d[0]) + y(d[1]);
      }
      return 0;
    });

var svg = d3.select('.cm-dataviz')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

svg.selectAll('path')
    .data(layers)
    .enter()
    .append('path')
    .attr('d', area)
    .attr('stroke-width', '2')
    .style('stroke', (d) => {
      var color = d3.color('rgb(255, 255, 255)');

      switch (d.key) {
        case 'Ape[MW]':
          color = d3.color('rgb(0, 255, 0)');
          break;
        case 'Biomasa[MW]':
          color = d3.color('rgb(255, 0, 255)');
          break;
        case 'Carbune[MW]':
          color = d3.color('rgb(255, 255, 0)');
          break;
        case 'Consum[MW]':
          color = d3.color('rgb(0, 255, 255)');
          break;
        case 'Eolian[MW]':
          color = d3.color('rgb(0, 0, 255)');
          break;
        case 'Foto[MW]':
          color = d3.color('rgb(255, 0, 0)');
          break;
        case 'Hidrocarburi[MW]':
          color = d3.color('rgb(255, 100, 0)');
          break;
        case 'Medie Consum[MW]':
          color = d3.color('rgb(100, 255, 0)');
          break;
        case 'Nuclear[MW]':
          color = d3.color('rgb(255, 0, 150)');
          break;
        case 'Productie[MW]':
          color = d3.color('rgb(0, 150, 255)');
          break;
        case 'Sold[MW]':
          color = d3.color('rgb(150, 0, 255)');
          break;
      }
      return color;
    })
    .style('fill', function() {
      var rand = Math.random();
      return 'none';
      //return d3.color('rgba(' + parseInt(rand * 100) + ',' + parseInt(rand * 255) + ',' + parseInt(rand * 255) + ',0)');
    });

svg.append('g')
  .attr('transform', 'translate(40, 0)')
  .call(yAxis);

// value displayer bottom left
svg.selectAll('path')
  .on('mousemove', function(d) {
    let mouseX = d3.mouse(this);
    mouseX = mouseX[0];

    let invertedX = x.invert(mouseX);
    // console.log(invertedX);

    newData.map(function(el) {
      // console.log('newData: ', timeParse(el['Data']).getDate());
      if(timeParse(el['Data']).getDate() === invertedX.getDate()) {
        displayEl.innerHTML = '';
        if(d.key) {
            displayEl.innerHTML = 'Key: ' + d.key + '</br>Value: ' + el[d.key];
        }
      }
    });
  });

// vertical indicator
var verticalLine = d3.select('.cm-dataviz')
  .append('div')
  .attr('class', 'dataviz_vl');

d3.select('.cm-dataviz')
  .on('mousemove', function() {
    let mouseX = d3.mouse(this);
    mouseX = mouseX[0];
    verticalLine.style('left', mouseX + 'px');
  })
  .on('mouseover', function() {
    let mouseX = d3.mouse(this);
    mouseX = mouseX[0];
    verticalLine.style('left', mouseX + 'px');
  });
