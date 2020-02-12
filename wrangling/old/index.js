let d3 = require('d3');
let fs = require('fs');

let f = fs.readFileSync('films.csv', 'utf8');
let data = d3.csvParse(f);

let nested = d3.nest()
    .key(d => d['Lead Studio'])
    .key(d => d['Genre'])
    .key(d => d['Film'])
    .rollup(v => d3.sum(v, d => +d['Worldwide Gross ($m)']))
    .entries(data);

nested = {
    id: 'root',
    values: nested
};

fs.writeFileSync('data.json', JSON.stringify(nested, null, 2));
